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
  CordPluginHelper,
} from '@cordjs/bot'
import {
  BitFieldResolvable,
  GatewayIntentsString,
  IntentsBitField,
} from 'discord.js'

import { DiscordClientEventData, DiscordClientEventIntents } from './events'
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
export interface GatewayOptions<MiddlewareT extends string = 'gateway'> {
  /**
   * The name of the middleware
   */
  middleware?: MiddlewareT

  /**
   * Catch all events
   *
   * @remarks
   * If `true` all events will be catched, this is done by monkey-patching the `EventEmitter.emit` method.
   *
   * If `false` it will detect the events by the `middleware`.
   *
   * @defaultValue `false`
   */
  catchAll?: boolean

  /**
   * The Discord bot token.
   */
  token: string

  /**
   * The intents to use.
   */
  intents?: GatewayIntentsOption
}

/**
 * The {@link GatewayOptions.intents} option
 *
 * @remarks
 * Determines what {@link https://discord.com/developers/docs/topics/gateway#gateway-intents | intents} to use.
 *
 * If set to a {@link https://discord.js.org/#/docs/discord.js/main/typedef/IntentsResolvable | IntentsResolvable} it
 * will be used as the intents.
 *
 * If set to `'auto'`, it will automatically detect the intents based on middleware.
 *
 * If set to an object, it will use `'auto'`, but you are able to configure the intents
 * for `threadMembersUpdate` and `typingStart` as they will not have an intent by default.
 *
 * @defaultValue 'auto'
 *
 * @public
 */
export type GatewayIntentsOption =
  | BitFieldResolvable<GatewayIntentsString, number>
  | 'auto'
  | {
      threadMembersUpdate?: 'guild' | 'member' | 'both'
      typingStart?: 'guild' | 'dm' | 'both'
    }

/**
 * Gateway plugin
 *
 * @public
 */
export const Gateway = <MiddlewareT extends string = 'gateway'>(
  options: GatewayOptions<MiddlewareT>
) =>
  CordPluginHelper<MiddlewareT, GatewayMiddleware>(({ bot, client, path }) => {
    const {
      middleware = 'gateway',
      catchAll = false,
      token,
      intents: intentsOption = 'auto',
    } = options

    function getEvents() {
      const { middleware: botMiddleware } = bot()

      const events = new Map<string, true>()
      for (const v of botMiddleware) {
        const [root, event] = v.path
        if (root === middleware) {
          if (!(event in DiscordClientEventProperties))
            throw new Error(`Unknown event: ${event}`)

          if (event === 'typingStart' && intentsOption === 'auto') {
            throw new Error(
              `Cannot use 'typingStart' with 'auto', set the 'intents' option to an object instead.\n` +
                `{ typingStart: 'guild' | 'dm' | 'both' }`
            )
          }

          if (event === 'threadMembersUpdate' && intentsOption === 'auto') {
            throw new Error(
              `Cannot use 'threadMembersUpdate' with 'auto', set the 'intents' option to an object instead.\n` +
                `{ threadMembersUpdate: 'guild' | 'members' | 'both' }`
            )
          }

          events.set(event, true)
        }
      }

      return [...events.keys()]
    }

    function eventArgsToObject<K extends keyof DiscordClientEventData>(
      event: K,
      args: unknown[]
    ) {
      const eventProperties = DiscordClientEventProperties[event]

      const obj: Record<string, unknown> = {}
      for (let i = 0; i < eventProperties.length; i++) {
        obj[eventProperties[i]] = args[i]
      }
      return obj as DiscordClientEventData[K]
    }

    function getIntents(events: string[]) {
      if (isIntentResolvable(intentsOption)) return intentsOption

      const intents = new IntentsBitField()
      if (intentsOption !== 'auto') {
        if (
          intentsOption.threadMembersUpdate === 'guild' ||
          intentsOption.threadMembersUpdate === 'both'
        ) {
          intents.add(IntentsBitField.Flags.Guilds)
        }

        if (
          intentsOption.threadMembersUpdate === 'member' ||
          intentsOption.threadMembersUpdate === 'both'
        ) {
          intents.add(IntentsBitField.Flags.GuildMembers)
        }

        if (
          intentsOption.typingStart === 'guild' ||
          intentsOption.typingStart === 'both'
        ) {
          intents.add(IntentsBitField.Flags.GuildMessageTyping)
        }

        if (
          intentsOption.typingStart === 'dm' ||
          intentsOption.typingStart === 'both'
        ) {
          intents.add(IntentsBitField.Flags.DirectMessageTyping)
        }
      }

      for (const event of events) {
        const intent =
          DiscordClientEventIntents[
            event as keyof typeof DiscordClientEventIntents
          ]
        if (intent) {
          intents.add(intent)
        }
      }
      return intents
    }

    function onAnyEvent(
      callback: (event: keyof DiscordClientEventData, args: unknown[]) => void
    ) {
      const { emit: originalEmit } = client()

      client().emit = (event: string, ...args: unknown[]) => {
        if (event in DiscordClientEventProperties) {
          callback(event as keyof DiscordClientEventData, args)
        }

        return originalEmit.call(client(), event, ...args)
      }
    }

    function execEventMiddleware(
      event: keyof DiscordClientEventData,
      args: unknown[]
    ) {
      bot().execMiddleware(
        new GatewayContext(path([event]), eventArgsToObject(event, args))
      )
    }

    function isIntentResolvable(
      bit: unknown
    ): bit is BitFieldResolvable<GatewayIntentsString, number> {
      if (typeof bit === 'number' && bit >= 0) return true
      if (bit instanceof IntentsBitField) return true
      if (Array.isArray(bit)) return bit.every(isIntentResolvable)
      if (typeof bit === 'string') {
        if (bit in IntentsBitField.Flags) return true
        if (!isNaN(Number(bit))) return true
      }

      return false
    }

    return {
      id: '@cordjs/gateway',
      middleware: middleware as MiddlewareT,

      async start() {
        if (catchAll) {
          onAnyEvent(execEventMiddleware)
        } else {
          const events = getEvents()
          for (const event of events) {
            client().on(event, (...args) =>
              execEventMiddleware(event as keyof DiscordClientEventData, args)
            )
          }
        }

        await client().login(token)
      },

      modifyClientOptions(clientOptions) {
        if (catchAll) {
          if (!isIntentResolvable(intentsOption)) {
            throw new TypeError(
              'If catchAll is enabled, options.intents must be a valid IntentsResolvable'
            )
          }

          return {
            ...clientOptions,
            intents: [clientOptions.intents, intentsOption],
          }
        }

        const events = getEvents()
        const intents = getIntents(events)

        return {
          ...clientOptions,
          intents: [clientOptions.intents, intents],
        }
      },
    }
  })

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
