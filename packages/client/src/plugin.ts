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
   * Run whenever {@link Client.start} is called.
   *
   * @remarks
   * All plugin start functions are called at the same time
   * whenever {@link Client.start} is caled.
   *
   * This is where you would do stuff such as connecting to the
   * gateway.
   */
  start?(): void | Promise<void>
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
 * A function that returns a {@link PluginInstance}
 *
 * @remarks
 * The {@link Client | client} and options are passed into the function.
 */
export type PluginFactory = (
  client: Client,
  actions: PluginActions
) => PluginInterface & {
  instance?: PluginInstance
}

/**
 * An instance of a plugin
 */
export class PluginInstance implements PluginInterface {
  public id: string

  private _start: PluginInterface['start']

  constructor(options: PluginInterface) {
    this.id = options.id

    this._start = options.start
  }

  async start() {
    await this._start?.()
  }
}
