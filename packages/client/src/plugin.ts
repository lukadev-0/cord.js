import { BaseClient, ClientOptions } from './client'
import { Middleware } from './middleware'
import { Context } from './context'
import { UnionToIntersection } from './util'

/**
 * Type that represents an extended client
 *
 * @typeParam T - the extended members
 *
 * @public
 */
export type ExtendedClient<T> = new () => T & BaseClient

/**
 * {@link ClientPlugin} with default type parameters
 *
 * @public
 */
export type AnyPlugin = ClientPlugin<Record<string, Middleware<Context>>>

/**
 * Middleware Map
 *
 * @typeParam TMiddleware - the middleware
 *
 * @public
 */
export type PluginMiddlewareMap<
  TMiddleware extends Record<string, Middleware<Context>>
> = {
  [K in keyof TMiddleware]: string
}

/**
 * Base plugin options
 *
 * @typeParam TMiddleware - the middleware
 *
 * @public
 */
export interface PluginOptions<
  TMiddleware extends { [x: string]: Middleware<Context> }
> {
  middleware?: PluginMiddlewareMap<TMiddleware>
}

/**
 * A plugin
 *
 * @typeParam TMiddleware - the middleware
 * @typeParam TOptions - The options
 *
 * @public
 */
export abstract class ClientPlugin<
  TMiddleware extends { [x: string]: Middleware<Context> },
  TOptions extends PluginOptions<TMiddleware> = PluginOptions<TMiddleware>
> {
  /**
   * The unique identifier of the plugin.
   */
  public abstract readonly id: string

  /**
   * The client
   */
  public client?: BaseClient

  /**
   * The middleware this plugin defines
   */
  public readonly middleware: PluginMiddlewareMap<TMiddleware>

  /**
   * The options
   */
  public readonly options: TOptions

  constructor(
    options: TOptions,
    defaultMiddleware: ReadonlyArray<
      { [K in keyof TMiddleware]: K }[keyof TMiddleware]
    >
  ) {
    const middlewareMap: Record<string, string> = {}
    for (const name of defaultMiddleware) {
      middlewareMap[name as string] =
        options?.middleware?.[name] ?? (name as string)
    }

    this.middleware = middlewareMap as PluginMiddlewareMap<TMiddleware>
    this.options = options ?? null
  }

  /**
   * Runs during {@link createClient} after the client has been constructed
   * @param client - the client
   */
  init(client: BaseClient) {
    this.client = client
  }

  /**
   * Extends the client class,
   * based on {@link https://www.typescriptlang.org/docs/handbook/mixins.html}.
   *
   * @param base - base class
   *
   * @returns
   * Modified client which extends `base`.
   */
  extendClient(base: typeof BaseClient): ExtendedClient<TMiddleware> {
    const middleware = this.middleware

    const extended = class extends base {
      constructor(options: ClientOptions) {
        super(options)
        for (const name of Object.keys(middleware)) {
          this._defineMiddlewareRoot(name)
        }
      }
    }

    return extended as ExtendedClient<TMiddleware>
  }

  /**
   * Runs before `start`
   *
   * @virtual
   */
  preStart() {}

  /**
   * Runs after `preStart`
   *
   * @virtual
   */
  start() {}

  protected pluginRunMiddleware(context: Context) {
    this.client?._execMiddleware(context)
  }
}

/**
 * Gets the instance type of {@link ClientPlugin.extendClient}
 *
 * @public
 */
export type PluginExtendedClient<T extends AnyPlugin> = InstanceType<
  ReturnType<T['extendClient']>
>

/**
 * A client with the specified plugins
 *
 * @public
 */
export type ClientWithPlugins<T extends AnyPlugin> = BaseClient &
  UnionToIntersection<PluginExtendedClient<T>>

/**
 * Plugin constructor
 *
 * @public
 */
export type PluginConstructor<T extends AnyPlugin> =
  | (new () => T)
  | (new (options: any) => T)
