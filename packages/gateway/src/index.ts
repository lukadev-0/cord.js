/**
 * Connect to the gateway with Cord.js
 * @packageDocumentation
 *
 * @remarks
 * This plugin uses {@link https://discord.js.org/ | Discord.js} under the hood.
 */

import {
  Context,
  Middleware,
  MiddlewareGroup,
  PluginFactory,
  PluginInstance,
  PluginInterface,
} from '@cordjs/client'
import { Client, ClientEvents, ClientOptions } from 'discord.js'

/**
 * {@link Gateway} options
 * @public
 */
export interface GatewayOptions {
  /**
   * The token to login with
   */
  token: string

  /**
   * The middleware name
   *
   * @defaultValue 'gateway'
   */
  middlewareName?: string

  /**
   * The {@link https://discord.js.org/#/docs/main/stable/typedef/ClientOptions | Discord.js client options}
   */
  client: ClientOptions

  /**
   * Whether or not to catch all events
   *
   * @remarks
   * This will monkey patch the `emit` function
   *
   * @defaultValue false
   */
  catchAll?: boolean
}

/**
 * A plugin instance
 * @public
 */
export class GatewayInstance extends PluginInstance {
  /**
   * The middleware name
   */
  public middlewareName: string

  constructor(options: PluginInterface, middlewareName: string) {
    super(options)
    this.middlewareName = middlewareName
  }
}

/**
 * The context
 */
export class GatewayContext<K extends keyof ClientEvents> extends Context {
  public data: ClientEvents[K]

  constructor(path: string[], data: ClientEvents[K]) {
    super(path)
    this.data = data
  }
}

/**
 * The gateway plugin
 * @public
 *
 * @param options
 */
export const Gateway =
  (options: GatewayOptions): PluginFactory =>
  (client, actions) => {
    const { defineMiddlewareRoot } = actions
    const {
      middlewareName = 'gateway',
      client: clientOptions,
      token,
      catchAll,
    } = options
    const djsClient = new Client(clientOptions)

    defineMiddlewareRoot(middlewareName ?? 'gateway')

    function addEventListeners() {
      if (catchAll) {
        const emit = djsClient.emit

        djsClient.emit = <K extends keyof ClientEvents>(
          eventName: string,
          ...args: ClientEvents[K]
        ) => {
          client.executeMiddleware(
            new GatewayContext([middlewareName, eventName], args)
          )

          return emit.apply(djsClient, [eventName, args])
        }
        return
      }

      const added: Record<string, true> = {}
      for (const middleware of client.middleware) {
        if (
          middleware.path.length === 2 &&
          middleware.path[0] === middlewareName
        ) {
          if (!(middleware.path[1] in added)) {
            const eventName = middleware.path[1] as keyof ClientEvents

            added[eventName] = true
            djsClient.on(eventName, (...args) => {
              client.executeMiddleware(
                new GatewayContext([middlewareName, eventName], args)
              )
            })
          }
        }
      }
    }

    return {
      id: '@cordjs/gateway',
      instance: options => new GatewayInstance(options, middlewareName),

      async start() {
        addEventListeners()

        await djsClient.login(token)
      },
    }
  }

declare module '@cordjs/client' {
  export interface Client {
    gateway: MiddlewareGroup<{
      [K in keyof ClientEvents]: Middleware<GatewayContext<K>>
    }>
  }
}

export default Gateway
