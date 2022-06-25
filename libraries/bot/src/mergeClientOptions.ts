import { ClientOptions } from 'discord.js'

function joinArrays<T>(a?: T[], b?: T[]): T[] | undefined {
  if (!a && !b) return undefined
  if (!a) return b
  if (!b) return a

  return [...a, ...b]
}

function joinObjects<T>(a?: T, b?: T): T | undefined {
  if (!a && !b) return undefined

  return { ...a, ...b } as T
}

/**
 * Merges 2 {@link https://discord.js.org/#/docs/discord.js/main/typedef/ClientOptions | ClientOptions}
 * into a single ClientOptions object.
 *
 * @param options0 - the options that will get merged to
 * @param options1 - the options to merge into options0
 * @returns the merged options
 *
 * @public
 */
export default function mergeClientOptions(
  options0: ClientOptions,
  options1: Partial<ClientOptions>
): ClientOptions {
  return {
    ...options0,
    ...options1,

    allowedMentions: joinObjects(
      options0.allowedMentions,
      options1.allowedMentions
    ),
    partials: joinArrays(options0.partials, options1.partials),
    presence: joinObjects(options0.presence, options1.presence),
    sweepers: joinObjects(options0.sweepers, options1.sweepers),
    ws: joinObjects(options0.ws, options1.ws),
    intents: options1.intents
      ? [options0.intents, options1.intents]
      : options0.intents,
  }
}
