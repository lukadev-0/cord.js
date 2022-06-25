import {
  Partials,
  IntentsBitField,
  ClientOptions as DiscordClientOptions,
} from 'discord.js'
import Cord, { ClientOptions } from '..'

test('ClientOptions', async () => {
  const options: DiscordClientOptions = {
    failIfNotExists: false,
    intents: [IntentsBitField.Flags.Guilds],
    partials: [Partials.Channel],
    ws: {
      compress: true,
    },
  }

  const bot = Cord([ClientOptions(options)])
  await bot.start()

  expect(bot.client?.options.failIfNotExists).toBe(options.failIfNotExists)
  expect(bot.client?.options.intents).toBe(
    IntentsBitField.resolve(options.intents)
  )
  expect(bot.client?.options.partials).toEqual(options.partials)
})
