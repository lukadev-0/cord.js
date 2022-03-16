import { Context } from './context'

/**
 * A middleware callback
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
 * @public
 */
export type Middleware<T, O extends Record<string, unknown> = {}> = (
  callback: MiddlewareCallback<T> | (MiddlewareOptions<T> & O)
) => void

/**
 * A group of middleware
 *
 * @public
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
  const noop = () => {}

  const handler = {
    get: (_: unknown, name: string): unknown => {
      path.push(name)
      return new Proxy(() => {}, handler)
    },

    apply: <T>(
      _0: unknown,
      _1: unknown,
      args: T extends Array<infer K> ? T : T[]
    ): unknown => {
      if (typeof args[0] === 'function') {
        addMiddleware(path, args[0] as MiddlewareCallback<Context>)
        return
      }

      if (typeof args[0] === 'object') {
        addMiddleware(path, args[0] as MiddlewareOptions<Context>)
        return
      }

      path.push(args[0] as string)

      if (typeof args[1] === 'function') {
        addMiddleware(path, args[1] as MiddlewareCallback<Context>)
        return
      }

      if (typeof args[1] === 'object') {
        addMiddleware(path, args[0] as MiddlewareOptions<Context>)
        return
      }

      return new Proxy(noop, handler)
    },
  }

  return new Proxy(noop, handler)
}
