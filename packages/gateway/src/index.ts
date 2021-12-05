/**
 * Connect to the gateway with Cord.js
 * @packageDocumentation
 *
 * @remarks
 * This plugin uses {@link https://discord.js.org/ | Discord.js} under the hood.
 */

import {
  ClientPlugin,
  Middleware,
  MiddlewareGroup,
  Context,
  PluginOptions,
} from '@cordjs/client'
import { Client, ClientEvents, ClientOptions } from 'discord.js'

/**
 * {@link Gateway} options
 * @public
 */
export interface GatewayOptions extends PluginOptions<GatewayMiddleware> {
  /**
   * The token to login with
   */
  token: string

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
 * {@link Gateway} middleware
 */
export type GatewayMiddleware = {
  gateway: MiddlewareGroup<{
    [K in keyof ClientEvents]: Middleware<GatewayContext<K>>
  }>
}

/**
 * Gateway plugin
 *
 * @public
 */
export class Gateway extends ClientPlugin<GatewayMiddleware, GatewayOptions> {
  id = '@cordjs/gateway'

  public discordClient?: Client

  constructor(options: GatewayOptions) {
    super(options, ['gateway'])
  }

  async start() {
    const client = new Client(this.options.client)

    if (this.options.catchAll) {
      const emit = client.emit

      client.emit = <K extends keyof ClientEvents>(
        eventName: string,
        ...args: ClientEvents[K]
      ) => {
        this.pluginRunMiddleware(
          new GatewayContext([this.middleware.gateway, eventName], args)
        )

        return emit.apply(client, [eventName, args])
      }
    } else {
      const added: Record<string, true> = {}
      for (const middleware of this.client!.middleware) {
        if (
          middleware.path.length === 2 &&
          middleware.path[0] === this.middleware.gateway
        ) {
          if (!(middleware.path[1] in added)) {
            const eventName = middleware.path[1] as keyof ClientEvents

            added[eventName] = true
            client.on(eventName, (...args) => {
              this.pluginRunMiddleware(
                new GatewayContext([this.middleware.gateway, eventName], args)
              )
            })
          }
        }
      }
    }

    this.discordClient = client
    await client.login(this.options.token)
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

export default Gateway
