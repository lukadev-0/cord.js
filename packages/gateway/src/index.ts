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

import type { DiscordClientEventData } from './events'
import { DiscordClientEventProperties } from './events'

/**
 * {@link Gateway} middleware
 *
 * @public
 */
export type GatewayMiddleware = {
  gateway: MiddlewareGroup<{
    [K in keyof DiscordClientEventData]: Middleware<GatewayContext<K>>
  }>
}

/**
 * Gateway options
 *
 * @public
 */
export interface GatewayOptions {
  /**
   * Catch all events
   *
   * @remarks
   * If `true` all events will be catched, this is done by monkey-patching the `EventEmitter.emit` method.
   *
   * If `false` it will detect the events by the `middleware`.
   */
  catchAll?: boolean

  /**
   * The Discord bot token.
   */
  token: string
}

/**
 * Gateway plugin
 *
 * @public
 */
export const Gateway = createPlugin<GatewayOptions, GatewayMiddleware>(
  (options, helpers) => {
    return {
      id: '@cordjs/gateway',
      middleware: ['gateway'],

      async start() {
        const client = helpers.client()

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
export class GatewayContext<
  K extends keyof DiscordClientEventData
> extends Context {
  public data: DiscordClientEventData[K]

  constructor(path: string[], data: DiscordClientEventData[K]) {
    super(path)
    this.data = data
  }
}

export default Gateway
