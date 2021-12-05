import { Context } from './context'
import { NextFn, MiddlewareHandler, MiddlewareInterface } from './middleware'
import {
  AnyPlugin,
  ClientPlugin,
  ClientWithPlugins,
  PluginConstructor,
} from './plugin'

/**
 * Options for the Client
 * @public
 */
export interface ClientOptions {
  plugins: AnyPlugin[]
}

/**
 * The main class for any Cord.js bot
 * @public
 */
export class BaseClient {
  /**
   * The middleware
   */
  public readonly middleware: MiddlewareInterface<Context>[] = []

  /**
   * The plugins
   */
  public readonly plugins: Record<string, AnyPlugin>

  private pluginByConstructor: Map<typeof ClientPlugin, AnyPlugin> = new Map()
  private started: boolean = false

  /**
   * @param options - the options
   */
  constructor(options: ClientOptions) {
    const plugins: Record<string, AnyPlugin> = {}
    for (const plugin of options.plugins) {
      plugins[plugin.id] = plugin

      this.pluginByConstructor.set(
        plugin.constructor as typeof ClientPlugin,
        plugin
      )
    }
    this.plugins = plugins
  }

  private runInAllPlugins(name: keyof AnyPlugin) {
    return Object.values(this.plugins).map(v => {
      return (v[name] as () => unknown)()
    })
  }

  /**
   * Start the client
   */
  async start() {
    if (this.started) throw new Error("Can only run 'start()' once")

    await Promise.all(this.runInAllPlugins('preStart'))
    this.started = true
    await Promise.all(this.runInAllPlugins('start'))
  }

  /**
   * Defines a middleware root
   * @internal
   */
  _defineMiddlewareRoot(name: string): void {
    Object.defineProperty(this, name, {
      get: () => this.middlewareRootBuilder(name),
    })
  }

  plugin<T extends string | typeof ClientPlugin>(
    id: T
  ): (T extends string ? AnyPlugin : T) | null {
    if (typeof id === 'string')
      return (this.plugins[id] as T extends string ? AnyPlugin : T) ?? null
    return (
      (this.pluginByConstructor.get(id) as T extends string ? AnyPlugin : T) ??
      null
    )
  }

  /**
   * Executes a middleware with the context
   *
   * @param context - the context
   *
   * @internal
   */
  _execMiddleware(context: Context, after = 0, err: unknown = undefined) {
    const { path } = context
    const middlewareIndex = this.middleware.findIndex(
      (v, i) =>
        i >= after &&
        v.path.every((v, i) => path[i] === v) &&
        (err === undefined || v.cb.length === 3)
    )

    if (middlewareIndex > -1)
      this.execMiddleware(
        context,
        this.middleware[middlewareIndex],
        middlewareIndex,
        err
      )
  }

  /**
   * Executes the middleware
   *
   * @param middleware - the middleware
   *
   * @internal
   */
  private async execMiddleware<T extends Context>(
    context: T,
    middleware: MiddlewareInterface<T>,
    index: number,
    err: unknown
  ) {
    try {
      const next: NextFn = err => {
        this._execMiddleware(context, index + 1, err)
      }

      await middleware.cb(context, next, err)
    } catch (err) {
      this._execMiddleware(context, index + 1, err)
    }
  }

  /**
   * Adds a middleware
   *
   * @param path - the path
   * @param cb - the callback
   */
  private addMiddleware<T extends Context>(
    path: string[],
    cb: MiddlewareHandler<T>
  ) {
    if (this.started)
      throw new Error("Cannot add middleware after 'start()' has been called")

    this.middleware.push({
      path,
      cb: cb as MiddlewareHandler<Context>,
    })
  }

  /**
   * Creates a middleware root builder
   *
   * @returns the middleware root
   */
  private middlewareRootBuilder(name: string): unknown {
    const path = [name]
    const handler = {
      get: (_: unknown, name: string): unknown => {
        path.push(name)
        return new Proxy(() => {}, handler)
      },

      apply: <T, M extends Context>(
        _0: unknown,
        _1: unknown,
        args: T extends Array<infer K> ? T : T[]
      ): unknown => {
        if (typeof args[0] === 'function') {
          this.addMiddleware(path, args[0] as MiddlewareHandler<M>)
          return
        }

        path.push(args[0] as string)

        if (typeof args[1] === 'function') {
          this.addMiddleware(path, args[1] as MiddlewareHandler<M>)
          return
        }

        return new Proxy(() => {}, handler)
      },
    }

    return new Proxy(() => {}, handler)
  }
}

/**
 * The plugins parameter passed into {@link createClient}
 *
 * @public
 */
export type CreateClientPlugins<T extends PluginConstructor<AnyPlugin>> =
  | T
  | [T, ConstructorParameters<T>[0]]

/**
 * Creates a client with the specified plugins
 *
 * @public
 */
export function createClient<T extends PluginConstructor<AnyPlugin>>(
  plugins: CreateClientPlugins<T>[]
): ClientWithPlugins<InstanceType<T>> {
  const pluginInstances: AnyPlugin[] = []
  const mixed = plugins.reduce((acc, plugin) => {
    const constructor = Array.isArray(plugin) ? plugin[0] : plugin
    const options = Array.isArray(plugin) ? plugin[1] : undefined
    const instance = new (constructor as new (options?: unknown) => AnyPlugin)(
      options
    )
    pluginInstances.push(instance)
    return instance.extendClient(acc)
  }, BaseClient)

  const client = new (class Client extends mixed {})({
    plugins: pluginInstances,
  }) as ClientWithPlugins<InstanceType<T>>

  pluginInstances.forEach(plugin => {
    plugin.init(client)
  })

  return client
}
