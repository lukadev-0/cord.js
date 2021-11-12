/**
 * Information about a middleware call,
 * passed in as first argument to a middleware handler
 *
 * @public
 */
export abstract class Context {
  /**
   * The middleware path
   */
  public path: string[]

  constructor(path: string[]) {
    this.path = path
  }
}
