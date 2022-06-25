import { IntentsBitField, Partials } from 'discord.js'
import mergeClientOptions from '../mergeClientOptions'

test('merge with empty options', () => {
  const merged = mergeClientOptions(
    { intents: [] },
    {
      failIfNotExists: false,
      intents: [IntentsBitField.Flags.Guilds],
      partials: [Partials.Channel],
      ws: {
        compress: true,
      },
    }
  )

  expect(merged).toEqual({
    failIfNotExists: false,
    intents: [[], [IntentsBitField.Flags.Guilds]],
    partials: [Partials.Channel],
    ws: {
      compress: true,
    },
  })
})

test('merge with both partial options', () => {
  const merged = mergeClientOptions(
    {
      ws: {
        compress: true,
      },
      intents: [],
      partials: [],
    },
    {
      ws: {
        compress: false,
      },
      intents: [IntentsBitField.Flags.Guilds],
      partials: [Partials.Channel],
    }
  )

  expect(merged).toEqual({
    ws: {
      compress: false,
    },
    intents: [[], [IntentsBitField.Flags.Guilds]],
    partials: [Partials.Channel],
  })
})

test('merge with no intents', () => {
  const merged = mergeClientOptions({ intents: [] }, {})

  expect(merged).toEqual({
    intents: [],
  })
})

test('merge with only first array', () => {
  const merged = mergeClientOptions(
    { intents: [], partials: [Partials.Channel] },
    {}
  )

  expect(merged).toEqual({
    intents: [],
    partials: [Partials.Channel],
  })
})
