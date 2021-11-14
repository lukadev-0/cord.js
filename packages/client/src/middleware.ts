import { Context } from './context'

/**
 * A middleware
 * @public
 */
export type Middleware<T extends Context> = (
  handler: MiddlewareHandler<T>
) => void

/**
 * A group of middleware
 * @public
 */
export type MiddlewareGroup<T extends Record<string, Middleware<Context>>> = (<
  K extends keyof T
>(
  name: K,
  ...args: Parameters<T[K]> | []
) => T[K]) & {
  [K in keyof T]: T[K]
} & (<K extends keyof T>(...args: Parameters<T[K]>) => void)

/**
 * A middleware handler
 * @public
 */
export interface MiddlewareHandler<T extends Context> {
  (context: T, next: NextFn, err: unknown): void
}

/**
 * A middleware object
 * @public
 */
export interface MiddlewareInterface<T extends Context> {
  path: string[]
  cb: MiddlewareHandler<T>
}

/**
 * The `next` function passed into {@link MiddlewareHandler}
 */
export type NextFn = (err?: unknown) => void
