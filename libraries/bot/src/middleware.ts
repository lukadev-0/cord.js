import { Context } from './context'

/**
 * A middleware callback
 *
 * @param context - The context
 * @param next - The `next`
 *
 * @public
 */
export type MiddlewareCallback<TContext> = (
  context: TContext,
  next: NextFn,
  err: unknown
) => void

/**
 * A middleware
 *
 * @param callback - The callback or options object
 *
 * @remarks
 * This is a function that can be used to add middleware to the bot.
 * See {@link https://cord.js.org/docs/middleware | the middleware documentation}.
 *
 * @example
 * ```ts
 * bot.gateway.messageCreate(context => {
 *   // do something
 * })
 * ```
 *
 * @public
 */
export type Middleware<
  TContext,
  TOptions extends IMiddlewareOptions<TContext> = never
> = (
  callback:
    | MiddlewareCallback<TContext>
    | (IMiddlewareOptions<TContext> & TOptions)
) => void

/**
 * A group of {@link Middleware | middleware}
 *
 * @public
 *
 * @remarks
 * Middleware is able to be added to a MiddlewareGroup.
 *
 * Middleware added to a MiddlewareGroup will be run whenever any child of the
 * MiddlewareGroup is run.
 *
 * For example, if you add a middleware to `bot.gateway`, assuming that `catchAll`
 * is enabled, the middleware will be run for every gateway event.
 *
 */
export type MiddlewareGroup<T extends Record<string, Middleware<Context>>> = (<
  K extends keyof T
>(
  name: K,
  ...args: Parameters<T[K]>
) => void) &
  (<K extends keyof T>(...args: Parameters<T[K]>) => void) &
  T

/**
 * A middleware object
 *
 * @public
 */
export type MiddlewareObject<
  TContext extends Context,
  TOptions extends IMiddlewareOptions<TContext> = never
> = {
  path: string[]
  callback: MiddlewareCallback<TContext>
} & (TContext extends IMiddlewareOptions<TContext>
  ? Omit<TOptions, 'callback'>
  : {})

/**
 * Middleware options
 *
 * @public
 */
export interface IMiddlewareOptions<TContext> {
  /**
   * The callback
   */
  callback: MiddlewareCallback<TContext>
}

/**
 * The `next` function passed into {@link MiddlewareCallback}
 *
 * @public
 */
export type NextFn = (err?: unknown) => void

function createMiddlewareHandler(
  currentPath: string[],
  addMiddleware: (
    path: string[],
    callback: MiddlewareCallback<Context> | IMiddlewareOptions<Context>
  ) => void
): () => void {
  const noop = (): void => {}

  const handler: ProxyHandler<typeof noop> = {
    get: (target: typeof noop, name: string): unknown => {
      return createMiddlewareHandler([...currentPath, name], addMiddleware)
    },

    apply: (
      target: typeof noop,
      thisArg: unknown,
      args:
        | [MiddlewareCallback<Context> | IMiddlewareOptions<Context>]
        | [string, MiddlewareCallback<Context> | IMiddlewareOptions<Context>]
    ) => {
      const [pathOrCallbackOrOptions, callbackOrOptions] = args

      if (callbackOrOptions) {
        const path = pathOrCallbackOrOptions as string
        addMiddleware([...currentPath, path], callbackOrOptions)
      } else {
        const callbackOrOptions = pathOrCallbackOrOptions as
          | MiddlewareCallback<Context>
          | IMiddlewareOptions<Context>
        addMiddleware(currentPath, callbackOrOptions)
      }
    },
  }

  return new Proxy(noop, handler)
}

/**
 * Creates a middleware builder
 *
 * @internal
 */
export function createMiddlewareBuilder(
  name: string,
  addMiddleware: (
    path: string[],
    callback: MiddlewareCallback<Context> | IMiddlewareOptions<Context>
  ) => void
): () => void {
  const path = [name]

  return createMiddlewareHandler(path, addMiddleware)
}
