import { ClientOptions as DiscordClientOptions } from 'discord.js'
import CordBot from './CordBot'
import mergeClientOptions from './mergeClientOptions'
import { CordPlugin, ICordPlugin } from './plugin'

/**
 * Plugin that changes the ClientOptions of the {@link https://discord.js.org/#/docs/discord.js/main/class/Client | Client}
 *
 * @public
 */
export default function ClientOptions(
  options: Partial<DiscordClientOptions>
): ICordPlugin<CordBot> {
  return CordPlugin(() => {
    return {
      id: '@cordjs/bot#ClientOptions',

      modifyClientOptions(currentOptions: DiscordClientOptions) {
        return mergeClientOptions(currentOptions, options)
      },
    }
  })
}
