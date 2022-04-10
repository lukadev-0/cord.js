import { ClientOptions } from 'discord.js'
import { Client } from 'discord.js'
import { Context } from './context'
import {
  createMiddlewareBuilder,
  MiddlewareCallback,
  MiddlewareObject,
  MiddlewareOptions,
  NextFn,
} from './middleware'
import { CordPlugin } from './plugin'
import { UnionToIntersection } from './util'

/**
 * The main class for any Cord.js bot
 *
 * @public
 */
export class CordBot {
  /**
   * The middleware defined in this plugin
   */
  public readonly middleware: MiddlewareObject<Context>[] = []

  /**
   * The plugins
   */
  public readonly plugins: Record<string, CordPlugin>

  /**
   * The Discord.js {@link https://discord.js.org/#/docs/discord.js/stable/class/Client | Client} instance.
   */
  public client?: Client

  /**
   * Whether the client has been started
   */
  private _started = false

  /**
   * @param options - the options
   */
  constructor(plugins: CordPlugin[]) {
    const pluginsRecord: Record<string, CordPlugin> = {}

    for (const plugin of plugins) {
      plugin.decorateBot?.(this)
      pluginsRecord[plugin.id] = plugin
    }

    this.plugins = pluginsRecord
  }

  private _runPluginLifecycle<
    K extends keyof {
      [K in keyof CordPlugin as NonNullable<CordPlugin[K]> extends (
        ...args: infer _0
      ) => // eslint-disable-next-line @typescript-eslint/no-unused-vars
      infer _1
        ? K
        : never]: CordPlugin[K]
    }
  >(
    name: K,
    ...args: Parameters<NonNullable<CordPlugin[K]>>
  ): ReturnType<NonNullable<CordPlugin[K]>>[] {
    return Object.values(this.plugins).map(v => {
      return (v[name] as (...args: unknown[]) => unknown)?.apply(v, args)
    }) as ReturnType<NonNullable<CordPlugin[K]>>[]
  }

  /**
   * Start the client
   */
  async start() {
    if (this._started) throw new Error("Can only run 'start()' once")

    await Promise.all(this._runPluginLifecycle('preStart'))
    this._started = true

    const initialClientOptions: ClientOptions = {
      intents: [],
    }

    const clientOptions = Object.values(this.plugins).reduce(
      (previousValue, plugin) => {
        return plugin.modifyClientOptions?.(previousValue) ?? previousValue
      },
      initialClientOptions
    )

    this.client = new Client(clientOptions)

    await Promise.all(this._runPluginLifecycle('start'))
  }

  /**
   * Executes a middleware with the context
   *
   * @param context - the context
   */
  private async _execMiddleware(
    context: Context,
    after = 0,
    err: unknown = undefined
  ) {
    const { path } = context
    const middlewareIndex = this.middleware.findIndex(
      (v, i) =>
        i >= after &&
        v.path.every((v, i) => path[i] === v) &&
        (err === undefined || v.callback.length === 3)
    )

    if (middlewareIndex > -1)
      try {
        const next: NextFn = err => {
          this._execMiddleware(context, middlewareIndex + 1, err)
        }

        await this.middleware[middlewareIndex].callback(context, next, err)
      } catch (err) {
        this._execMiddleware(context, middlewareIndex + 1, err)
      }
  }

  async execMiddleware(context: Context) {
    return this._execMiddleware(context)
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
    callback: MiddlewareCallback<T> | MiddlewareOptions<T>
  ) {
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
  defineMiddleware(name: string) {
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
 * @public
 */
export type CordBotWithPlugins<T extends CordPlugin[]> = CordBot &
  UnionToIntersection<
    T[number] extends CordPlugin<infer R> ? R : unknown
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
export function Cord<T extends CordPlugin[]>(plugins: T) {
  const bot = new CordBot(plugins)
  return bot as CordBotWithPlugins<T>
}
