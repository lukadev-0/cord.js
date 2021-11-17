import { Context } from './context'
import { NextFn, MiddlewareHandler, MiddlewareInterface } from './middleware'
import { PluginFactory, PluginInstance } from './plugin'

/**
 * {@link Client} options
 * @public
 */
export interface ClientOptions {
  plugins: PluginFactory[]
}

/**
 * The main class for any Cord.js bot
 * @public
 */
export class Client {
  /**
   * The middleware
   */
  public readonly middleware: MiddlewareInterface<Context>[] = []

  /**
   * The plugins
   */
  public readonly plugins: Readonly<Record<string, PluginInstance>>

  private middlewareRoots: Record<string, string> = {}
  private started: boolean = false

  constructor(options: ClientOptions) {
    const { plugins } = options

    let pluginInstances: Record<string, PluginInstance> = {}

    const collisions: [string, string, string][] = []
    for (const factory of plugins) {
      const pluginCollisions: [string, string][] = []
      const middlewareRoots: string[] = []
      const plugin = factory(this, {
        defineMiddlewareRoot: name => {
          if (name in this.middlewareRoots) {
            pluginCollisions.push([this.middlewareRoots[name], name])
            return
          }

          middlewareRoots.push(name)
          this._defineMiddlewareRoot(name)
        },
      })

      middlewareRoots.forEach(v => {
        this.middlewareRoots[v] = plugin.id
      })

      pluginCollisions.forEach(v => {
        collisions.push([plugin.id, ...v])
      })

      if (plugin.id in pluginInstances) {
        throw new Error(`2 plugins with id '${plugin.id}'`)
      }

      pluginInstances[plugin.id] = plugin.instance
        ? typeof plugin.instance === 'function'
          ? plugin.instance(plugin)
          : plugin.instance
        : new PluginInstance(plugin)
    }

    if (collisions.length) {
      throw new Error(
        'Middleware Collisions:\n' +
          collisions
            .map(([a, b, name]) => `  '${name}' ('${a}', '${b}')`)
            .join('\n')
      )
    }

    this.plugins = pluginInstances
  }

  private async runAsyncFunctionInAllPlugins(name: keyof PluginInstance) {
    await Promise.all(
      Object.values(this.plugins).map(v => {
        return (v[name] as () => unknown)()
      })
    )
  }

  /**
   * Start the client
   */
  async start() {
    if (this.started) throw new Error("Can only run 'start()' once")

    await this.runAsyncFunctionInAllPlugins('preStart')
    this.started = true
    await this.runAsyncFunctionInAllPlugins('start')
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

  plugin(id: string): PluginInstance | null {
    return this.plugins[id] ?? null
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
   * {@inheritDoc Client._execMiddleware}
   */
  executeMiddleware(context: Context) {
    this._execMiddleware(context)
  }

  /**
   * Executes the middleware
   *
   * @param middleware - the middleware
   *
   * @internal
   */
  private execMiddleware<T extends Context>(
    context: T,
    middleware: MiddlewareInterface<T>,
    index: number,
    err: unknown
  ) {
    const next: NextFn = err => {
      this._execMiddleware(context, index + 1, err)
    }

    middleware.cb(context, next, err)
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
