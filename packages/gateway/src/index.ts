/**
 * Connect to the gateway with Cord.js
 * @packageDocumentation
 *
 * @remarks
 * This plugin uses {@link https://discord.js.org/ | Discord.js} under the hood.
 */

import {
  Middleware,
  MiddlewareGroup,
  Context,
  createPlugin,
  CordBot,
} from '@cordjs/bot'
import { Client, ClientEvents, ClientOptions } from 'discord.js'

/**
 * {@link Gateway} middleware
 *
 * @public
 */
export type GatewayMiddleware = {
  gateway: MiddlewareGroup<{
    [K in keyof ClientEvents]: Middleware<GatewayContext<K>>
  }>
}

/**
 * Gateway options
 *
 * @public
 */
export interface GatewayOptions {
  catchAll?: boolean

  token: string

  client: ClientOptions | Client
}

/**
 * Gateway plugin
 *
 * @public
 */
export const Gateway = createPlugin<GatewayOptions, GatewayMiddleware>(
  (options, helpers) => {
    const client =
      options.client instanceof Client
        ? options.client
        : new Client(options.client)

    return {
      id: '@cordjs/gateway',
      middleware: ['gateway'],

      async start() {
        if (options.catchAll) {
          const emit = client.emit

          client.emit = <K extends keyof ClientEvents>(
            eventName: string,
            ...args: ClientEvents[K]
          ) => {
            helpers
              .bot()
              .execMiddleware(
                new GatewayContext(helpers.path('gateway', [eventName]), args)
              )

            return emit.apply(client, [eventName, args])
          }
        } else {
          const added: Record<string, true> = {}
          for (const middleware of helpers.bot().middleware) {
            if (
              middleware.path.length === 2 &&
              middleware.path[0] === helpers.root('gateway')
            ) {
              if (!(middleware.path[1] in added)) {
                const eventName = middleware.path[1] as keyof ClientEvents

                added[eventName] = true

                client.on(eventName, (...args) => {
                  helpers
                    .bot()
                    .execMiddleware(
                      new GatewayContext(
                        helpers.path('gateway', [eventName]),
                        args
                      )
                    )
                })
              }
            }
          }
        }

        await client.login(options.token)
      },
    }
  }
)

/**
 * The context
 *
 * @public
 */
export class GatewayContext<K extends keyof ClientEvents> extends Context {
  public data: ClientEvents[K]

  constructor(path: string[], data: ClientEvents[K]) {
    super(path)
    this.data = data
  }
}

export default Gateway
