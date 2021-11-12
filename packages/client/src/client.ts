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

export type NextFn = (err?: unknown) => void

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
 * The main class for any Cord.js bot.
 * Handles middleware and plugins
 * @public
 */
export class Client {
  /**
   * The middleware
   */
  public middleware: MiddlewareInterface<Context>[] = []

  /**
   * Defines a middleware root
   */
  defineMiddlewareRoot(name: string): void {
    Object.defineProperty(this, name, {
      get: () => this.middlewareRootBuilder(name),
    })
  }

  /**
   * Executes a middleware on the specified path
   *
   * @param context - the context
   * @param path - the path
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
