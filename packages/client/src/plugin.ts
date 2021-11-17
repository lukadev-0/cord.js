import { Client } from './client'

/**
 * A plugin, this is the return value of a {@link PluginFactory}
 */
export interface PluginInterface {
  /**
   * Unique ID for this plugin, such as the package name.
   */
  id: string

  /**
   * Runs whenever {@link Client.start} is called.
   * After {@link PluginInterface.preStart}
   *
   * @remarks
   * All plugin start functions are called at the same time
   * whenever {@link Client.start} is caled.
   *
   * This is where you would do stuff such as connecting to the
   * gateway.
   */
  start?(): void | Promise<void>

  /**
   * Runs before {@link PluginInterface.start}
   *
   * @remarks
   *
   * :::note
   *
   * You can still add middlewares in this function,
   * but not in {@link PluginInterface.start}
   *
   * :::
   *
   * All plugin start functions are called at the same time
   * whenever {@link Client.start} is caled.
   *
   * This is where you would do stuff such as adding middleware
   * defined by other plugins.
   */
  preStart?(): void | Promise<void>
}

/**
 * Passed to {@link PluginFactory}
 */
export interface PluginActions {
  /**
   * Defines a middleware root
   */
  defineMiddlewareRoot(name: string): void
}

/**
 * A function that returns a {@link PluginInterface}
 *
 * @remarks
 * The {@link Client | client} and options are passed into the function.
 */
export type PluginFactory = (
  client: Client,
  actions: PluginActions
) => PluginInterface & {
  instance?: PluginInstance | ((options: PluginInterface) => PluginInstance)
}

/**
 * An instance of a plugin
 */
export class PluginInstance implements PluginInterface {
  public id: string

  private _start: PluginInterface['start']
  private _preStart: PluginInterface['preStart']

  constructor(options: PluginInterface) {
    this.id = options.id

    this._start = options.start
    this._preStart = options.preStart
  }

  async start() {
    await this._start?.()
  }

  async preStart() {
    await this._preStart?.()
  }
}
