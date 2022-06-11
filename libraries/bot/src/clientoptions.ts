import { ClientOptions as DiscordClientOptions } from 'discord.js'
import { CordBot } from './bot'
import { CordPlugin, ICordPlugin } from './plugin'

function joinArrays<T>(a?: T[], b?: T[]): T[] | undefined {
  if (!a && !b) {
    return undefined
  }

  return [...(a ?? []), ...(b ?? [])]
}

function joinObjects<T>(a?: T, b?: T): T | undefined {
  if (!a && !b) {
    return undefined
  }

  return { ...a, ...b } as T
}

/**
 * Plugin that changes the ClientOptions of the {@link https://discord.js.org/#/docs/discord.js/main/class/Client | Client}
 *
 * @public
 */
export const ClientOptions = (
  options: DiscordClientOptions
): ICordPlugin<CordBot> =>
  CordPlugin(() => {
    return {
      id: '@cordjs/bot#ClientOptions',

      modifyClientOptions(currentOptions: DiscordClientOptions) {
        return {
          ...currentOptions,
          ...options,

          allowedMentions: joinObjects(
            currentOptions.allowedMentions,
            options.allowedMentions
          ),
          partials: joinArrays(currentOptions.partials, options.partials),
          presence: joinObjects(currentOptions.presence, options.presence),
          sweepers: joinObjects(currentOptions.sweepers, options.sweepers),
          ws: joinObjects(currentOptions.ws, options.ws),
          intents: [currentOptions.intents, options.intents],
        }
      },
    }
  })
