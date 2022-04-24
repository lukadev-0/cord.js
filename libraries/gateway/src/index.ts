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
  CordPlugin,
  ICordPlugin,
  CordBot,
} from '@cordjs/bot'
import {
  BitFieldResolvable,
  ClientOptions,
  GatewayIntentsString,
  IntentsBitField,
} from 'discord.js'

import { IDiscordClientEventData, DiscordClientEventIntents } from './events'
import { DiscordClientEventProperties } from './events'

/**
 * {@link Gateway} middleware
 *
 * @public
 */
export interface IGatewayMiddleware {
  gateway: MiddlewareGroup<{
    [K in keyof IDiscordClientEventData]: Middleware<GatewayContext<K>>
  }>
}

/**
 * Gateway options
 *
 * @public
 */
export interface IGatewayOptions<MiddlewareT extends string = 'gateway'> {
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
 * The {@link IGatewayOptions.intents} option
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
 * The gateway context
 *
 * @public
 */
export class GatewayContext<
  K extends keyof IDiscordClientEventData
> extends Context {
  public data: IDiscordClientEventData[K]

  public constructor(path: string[], data: IDiscordClientEventData[K]) {
    super(path)
    this.data = data
  }
}

/**
 * Gateway plugin
 *
 * @public
 */
export const Gateway = <TMiddleware extends string = 'gateway'>(
  options: IGatewayOptions<TMiddleware>
): ICordPlugin<CordBot & IGatewayMiddleware> =>
  CordPlugin<TMiddleware, IGatewayMiddleware>(({ bot, client, path }) => {
    const {
      middleware = 'gateway',
      catchAll = false,
      token,
      intents: intentsOption = 'auto',
    } = options

    function getEvents(): string[] {
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

    function eventArgsToObject<K extends keyof IDiscordClientEventData>(
      event: K,
      args: unknown[]
    ): IDiscordClientEventData[K] {
      const eventProperties = DiscordClientEventProperties[event]

      const obj: Record<string, unknown> = {}
      for (let i = 0; i < eventProperties.length; i++) {
        obj[eventProperties[i]] = args[i]
      }
      return obj as IDiscordClientEventData[K]
    }

    function getIntents(
      events: string[]
    ): BitFieldResolvable<GatewayIntentsString, number> {
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
      callback: (event: keyof IDiscordClientEventData, args: unknown[]) => void
    ): void {
      const { emit: originalEmit } = client()

      client().emit = (event: string, ...args: unknown[]) => {
        if (event in DiscordClientEventProperties) {
          callback(event as keyof IDiscordClientEventData, args)
        }

        return originalEmit.call(client(), event, ...args)
      }
    }

    function execEventMiddleware(
      event: keyof IDiscordClientEventData,
      args: unknown[]
    ): Promise<void> {
      return bot().execMiddleware(
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
      middleware: middleware as TMiddleware,

      async start() {
        if (catchAll) {
          onAnyEvent(execEventMiddleware)
        } else {
          const events = getEvents()
          for (const event of events) {
            client().on(event, (...args) =>
              execEventMiddleware(event as keyof IDiscordClientEventData, args)
            )
          }
        }

        await client().login(token)
      },

      modifyClientOptions(clientOptions: ClientOptions) {
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

export default Gateway
