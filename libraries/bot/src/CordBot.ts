import { ClientOptions } from 'discord.js'
import { Client } from 'discord.js'
import Context from './Context'
import {
  createMiddlewareBuilder,
  MiddlewareCallback,
  MiddlewareObject,
  IMiddlewareOptions,
  NextFn,
} from './middleware'
import pathMatches from './pathMatches'
import { ICordPlugin } from './plugin'
import { UnionToIntersection } from './util'

/**
 * The main class for any Cord.js bot
 *
 * @public
 */
export default class CordBot {
  /**
   * The middleware added to the bot
   */
  public readonly middleware: MiddlewareObject<Context>[] = []

  /**
   * The plugins
   */
  public readonly plugins: Map<string, ICordPlugin>

  /**
   * The Discord.js {@link https://discord.js.org/#/docs/discord.js/stable/class/Client | Client} instance.
   */
  public client?: Client

  /**
   * Whether the client has been started
   */
  private _started: boolean = false

  private constructor(plugins: ICordPlugin[]) {
    const pluginsMap = new Map<string, ICordPlugin>()

    for (const plugin of plugins) {
      pluginsMap.set(plugin.id, plugin)
    }

    this.plugins = pluginsMap
  }

  /**
   * @internal
   */
  public static _create(plugins: ICordPlugin[]): CordBot {
    return new CordBot(plugins)
  }

  private _runPluginLifecycle<
    K extends keyof {
      [K in keyof ICordPlugin as NonNullable<ICordPlugin[K]> extends (
        ...args: never[]
      ) => unknown
        ? K
        : never]: ICordPlugin[K]
    }
  >(
    name: K,
    ...args: Parameters<NonNullable<ICordPlugin[K]>>
  ): ReturnType<NonNullable<ICordPlugin[K]>>[] {
    const returnValues: ReturnType<NonNullable<ICordPlugin[K]>>[] = []

    this.plugins.forEach(v => {
      const fn = v[name] as (
        ...args: Parameters<NonNullable<ICordPlugin[K]>>
      ) => ReturnType<NonNullable<ICordPlugin[K]>>

      if (fn) {
        const returnValue = fn(...args)
        returnValues.push(returnValue)
      }
    })

    return returnValues
  }

  /**
   * Start the client
   */
  public async start(): Promise<void> {
    if (this._started) throw new Error("Can only run 'start()' once")

    await Promise.all(this._runPluginLifecycle('preStart'))
    this._started = true

    let clientOptions: ClientOptions = {
      intents: [],
    }

    this.plugins.forEach(plugin => {
      clientOptions =
        plugin.modifyClientOptions?.(clientOptions) ?? clientOptions
    })

    this.client = new Client(clientOptions)

    await Promise.all(this._runPluginLifecycle('start'))
  }

  private _runNextMiddleware(
    context: Context,
    after: number,
    error?: unknown
  ): void {
    for (let i = after + 1; i < this.middleware.length; i++) {
      const middleware = this.middleware[i]
      const isErrorHandling = middleware.callback.length >= 3
      const matches = pathMatches(middleware.path, context.path)
      const shouldRun = error === undefined ? !isErrorHandling : isErrorHandling

      if (matches && shouldRun) {
        const next: NextFn = err => {
          this._runNextMiddleware(context, i, err ?? error)
        }

        try {
          const result = middleware.callback(context, next, error)
          if (result instanceof Promise) {
            result.catch(next)
          }
        } catch (err) {
          next(err)
        }

        break
      }
    }
  }

  /**
   * Runs middleware
   *
   * @param context - the context
   */
  public runMiddleware(context: Context): void {
    this._runNextMiddleware(context, -1)
  }

  /**
   * Adds a middleware
   *
   * @param path - the path
   * @param cb - the callback
   *
   * @internal
   */
  private _addMiddleware<T extends Context>(
    path: string[],
    callback: MiddlewareCallback<T> | IMiddlewareOptions<T>
  ): void {
    if (this._started)
      throw new Error("Cannot add middleware after 'start()' has been called")

    this.middleware.push({
      path,
      callback: callback as MiddlewareCallback<Context>,
    })
  }

  /**
   * Defines a middleware
   */
  public defineMiddleware(name: string): void {
    const middlewareBuilder = createMiddlewareBuilder(
      name,
      this._addMiddleware.bind(this)
    )

    Object.defineProperty(this, name, {
      value: middlewareBuilder,
    })
  }
}

/**
 * {@link CordBot} with plugins
 *
 * @public
 */
export type CordBotWithPlugins<TPlugins extends ICordPlugin[]> = CordBot &
  UnionToIntersection<
    TPlugins[number] extends ICordPlugin<infer R> ? R : unknown
  >

/**
 * Creates a Cord.js bot
 *
 * @param plugins - the plugins
 *
 * @returns the bot
 *
 * @public
 */
export function Cord<TPlugins extends ICordPlugin[]>(
  plugins: TPlugins
): CordBotWithPlugins<TPlugins> {
  let bot = CordBot._create(plugins)

  for (const plugin of plugins) {
    if (plugin.decorateBot) {
      bot = plugin.decorateBot(bot)
    }
  }

  return bot as CordBotWithPlugins<TPlugins>
}
