import { Context } from './context'

/**
 * A middleware callback
 *
 * @param context - The context
 * @param next - The `next`
 *
 * @public
 */
export type MiddlewareCallback<T> = (
  context: T,
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
  T,
  O extends Record<string, unknown> = Record<string, never>
> = (callback: MiddlewareCallback<T> | (MiddlewareOptions<T> & O)) => void

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
export interface MiddlewareObject<T extends Context> {
  path: string[]
  callback: MiddlewareCallback<T>
}

/**
 * Middleware options
 *
 * @public
 */
export interface MiddlewareOptions<T> {
  /**
   * The callback
   */
  callback: MiddlewareCallback<T>
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
    callback: MiddlewareCallback<Context> | MiddlewareOptions<Context>
  ) => void
) {
  const noop = () => undefined

  const handler: ProxyHandler<typeof noop> = {
    get: (_target: typeof noop, name: string): unknown => {
      return createMiddlewareHandler([...currentPath, name], addMiddleware)
    },

    apply: (
      _target: typeof noop,
      _thisArg: unknown,
      args:
        | [MiddlewareCallback<Context> | MiddlewareOptions<Context>]
        | [string, MiddlewareCallback<Context> | MiddlewareOptions<Context>]
    ) => {
      const [pathOrCallbackOrOptions, callbackOrOptions] = args

      if (callbackOrOptions) {
        const path = pathOrCallbackOrOptions as string
        addMiddleware([...currentPath, path], callbackOrOptions)
      } else {
        const callbackOrOptions = pathOrCallbackOrOptions as
          | MiddlewareCallback<Context>
          | MiddlewareOptions<Context>
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
    callback: MiddlewareCallback<Context> | MiddlewareOptions<Context>
  ) => void
) {
  const path = [name]

  return createMiddlewareHandler(path, addMiddleware)
}
