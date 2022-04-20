import Cord from '@cordjs/bot'
import Gateway from '../index'
import { Client, IntentsBitField } from 'discord.js'

Client.prototype.login = jest.fn().mockResolvedValue(undefined)

describe('Gateway', () => {
  it('adds the correct events', async () => {
    const bot = Cord([
      Gateway({
        token: 'test',
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

  it('passes correct intents (object)', async () => {
    const bot = Cord([
      Gateway({
        token: 'test',
        intents: {
          threadMembersUpdate: 'member',
          typingStart: 'both',
        },
      }),
    ])

    await bot.start()
    if (!bot.client) throw new Error('No client')

    expect(
      new IntentsBitField(bot.client.options.intents).equals([
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.DirectMessageTyping,
        IntentsBitField.Flags.GuildMessageTyping,
      ])
    ).toBe(true)
  })

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
      expect.assertions(1)

      try {
        const bot = Cord([
          Gateway({
            token: 'test',
          }),
        ])

        bot.gateway[e as 'typingStart' | 'threadMembersUpdate'](() => undefined)

        await bot.start()
      } catch (e) {
        expect(e).toBeInstanceOf(Error)
      }
    }
  )
})
