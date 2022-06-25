import { Client } from 'discord.js'
import Context from '../Context'
import CordBot, { Cord } from '../CordBot'
import { Middleware } from '../middleware'
import { CordPlugin, ICordPlugin } from '../plugin'

it('defines the middleware', () => {
  const bot = Cord([
    CordPlugin(() => ({
      id: 'test',
      middleware: 'test',
    })) as ICordPlugin<CordBot & { test: Middleware<Context> }>,
  ])

  expect(bot.test).toBeDefined()
})

it('adds decorations', () => {
  const bot = Cord([
    CordPlugin(() => ({
      id: 'test',

      init() {
        return {
          test: 1,
        }
      },
    })) as ICordPlugin<CordBot & { test: number }>,
  ])

  expect(bot.test).toBe(1)
})

describe('helpers', () => {
  describe('bot', () => {
    it('returns the bot', () => {
      Cord([
        CordPlugin(helpers => ({
          id: 'test',
          init() {
            expect(helpers.bot()).toBeInstanceOf(CordBot)
            return {}
          },
        })),
      ])
    })

    it('errors if init has not yet been called', () => {
      Cord([
        CordPlugin(helpers => {
          expect(() => helpers.bot()).toThrow(
            new Error("Cannot get bot before 'init' has been called")
          )

          return {
            id: 'test',
          }
        }),
      ])
    })
  })

  describe('client', () => {
    it('returns the client', async () => {
      const bot = Cord([
        CordPlugin(helpers => ({
          id: 'test',

          async start() {
            expect(helpers.client()).toBeInstanceOf(Client)
          },
        })),
      ])

      await bot.start()
    })

    it('errors if start has not yet been called', () => {
      Cord([
        CordPlugin(helpers => {
          expect(() => helpers.client()).toThrow(
            new Error("Cannot get client before 'start' has been called")
          )

          return {
            id: 'test',
          }
        }),
      ])
    })
  })

  describe('path', () => {
    it('returns the correct path', () => {
      Cord([
        CordPlugin(helpers => ({
          id: 'test',
          middleware: 'test',

          init() {
            expect(helpers.path(['hi'])).toEqual(['test', 'hi'])

            return {}
          },
        })),
      ])
    })

    it('errors if plugin has not yet been initialized', () => {
      Cord([
        CordPlugin(helpers => {
          expect(() => helpers.path(['hi'])).toThrow(
            new Error('Cannot get path before plugin has been initialized')
          )

          return {
            id: 'test',
            middleware: 'test',
          }
        }),
      ])
    })
  })
})
