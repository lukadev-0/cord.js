import Cord from '@cordjs/bot'
import Gateway from '../index'
import { Client, IntentsBitField } from 'discord.js'

const TOKEN = 'test token'

Client.prototype.login = jest.fn().mockResolvedValue(TOKEN)

describe('Gateway', () => {
  it('adds the correct events', async () => {
    const bot = Cord([
      Gateway({
        token: TOKEN,
      }),
    ])

    const spy = jest.spyOn(Client.prototype, 'on')

    bot.gateway.messageCreate(() => undefined)
    bot.gateway.interactionCreate(() => undefined)

    await bot.start()

    expect(spy).toHaveBeenCalledWith('messageCreate', expect.any(Function))
    expect(spy).toHaveBeenCalledWith('interactionCreate', expect.any(Function))
  })

  it('catches all events with catchAll enabled', async () => {
    const bot = Cord([
      Gateway({
        token: 'test',
        catchAll: true,
        intents: [],
      }),
    ])

    const mock = jest.fn()
    bot.gateway(mock)

    await bot.start()
    if (!bot.client) throw new Error('No client')
    bot.client.emit('ready', bot.client)

    expect(mock).toBeCalledTimes(1)
    expect(mock).toBeCalledWith(
      {
        path: ['gateway', 'ready'],
        data: {
          client: bot.client,
        },
      },
      expect.any(Function),
      undefined
    )
  })

  it('passes correct intents (auto)', async () => {
    const bot = Cord([
      Gateway({
        token: 'test',
      }),
    ])

    bot.gateway.messageCreate(() => undefined)
    bot.gateway.guildMemberAdd(() => undefined)

    await bot.start()
    if (!bot.client) throw new Error('No client')

    expect(
      new IntentsBitField(bot.client.options.intents).equals([
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
      ])
    ).toBe(true)
  })

  it.each([
    ['threadMembersUpdate', 'member', IntentsBitField.Flags.GuildMembers],
    [
      'threadMembersUpdate',
      'both',
      [IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds],
    ],
    ['threadMembersUpdate', 'guild', IntentsBitField.Flags.Guilds],
    ['typingStart', 'dm', IntentsBitField.Flags.DirectMessageTyping],
    [
      'typingStart',
      'both',
      [
        IntentsBitField.Flags.DirectMessageTyping,
        IntentsBitField.Flags.GuildMessageTyping,
      ],
    ],
    ['typingStart', 'guild', IntentsBitField.Flags.GuildMessageTyping],
  ])(
    'passes correct intents (threadMembersUpdate: )',
    async (key, value, intents) => {
      const bot = Cord([
        Gateway({
          token: 'test',
          intents: {
            [key]: value,
          },
        }),
      ])

      await bot.start()
      if (!bot.client) throw new Error('No client')

      expect(
        new IntentsBitField(bot.client.options.intents).equals(intents)
      ).toBe(true)
    }
  )

  it('passes correct intents (IntentsResolvable)', async () => {
    const intents = new IntentsBitField([
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.DirectMessageTyping,
      IntentsBitField.Flags.GuildMessageTyping,
    ])

    const bot = Cord([
      Gateway({
        token: 'test',
        intents,
      }),
    ])

    await bot.start()
    if (!bot.client) throw new Error('No client')

    expect(intents.equals(bot.client.options.intents)).toBe(true)
  })

  it.each(['typingStart', 'threadMembersUpdate'])(
    `throws when '%s' is used with auto`,
    async e => {
      const bot = Cord([
        Gateway({
          token: 'test',
        }),
      ])

      bot.gateway[e as 'typingStart' | 'threadMembersUpdate'](() => undefined)

      return expect(bot.start()).rejects.toBeInstanceOf(Error)
    }
  )

  it('throws when invalid event is used', () => {
    const bot = Cord([
      Gateway({
        token: 'test',
      }),
    ])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(bot.gateway as any).hi()

    return expect(bot.start()).rejects.toEqual(new Error('Unknown event: hi'))
  })
})
