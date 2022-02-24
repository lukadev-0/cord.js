import {
  Context,
  CordBotWithPlugins,
  createPlugin,
  Middleware,
  MiddlewareGroup,
} from '..'
import { Cord } from '../bot'

const TestPlugin = createPlugin<
  {},
  {
    test: MiddlewareGroup<{
      yes: Middleware<{ path: string[]; d: 'y' }>
      no: Middleware<{ path: string[]; d: 'n' }>
      maybe: MiddlewareGroup<{
        hm: Middleware<{ path: string[]; d: 'h' }>
      }>
    }>
  }
>(() => ({
  id: 'test',

  middleware: ['test'],
}))

describe('Bot', () => {
  describe('middleware', () => {
    let bot: CordBotWithPlugins<[ReturnType<typeof TestPlugin>]>

    beforeEach(() => {
      bot = Cord([TestPlugin({})])
    })

    test.each<[(fn: jest.Mock) => void, unknown]>([
      [fn => bot.test(fn), { path: ['test', 'yes'] }],
      [fn => bot.test('maybe', fn), { path: ['test', 'maybe', 'hm'] }],
      [fn => bot.test.maybe.hm(fn), { path: ['test', 'maybe', 'hm'] }],
      [fn => bot.test.maybe(fn), { path: ['test', 'maybe', 'hm'] }],
    ])('%# (single middleware)', (fn, ctx) => {
      const f = jest.fn()
      fn(f)
      bot.execMiddleware(ctx as Context)
      expect(f).toBeCalledTimes(1)
      expect(f.mock.calls[0][0]).toBe(ctx)
      expect(f.mock.calls[0][1]).toBeInstanceOf(Function)
    })

    describe('next()', () => {
      it('runs the next middleware', () => {
        const a = jest.fn()
        const b = jest.fn()

        bot.test(a)
        bot.test(b)
        bot.execMiddleware({ path: ['test'] })

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)

        a.mock.calls[0][1]()

        expect(b).toBeCalledTimes(1)
      })

      it('handles errors', () => {
        const a = jest.fn()
        const b = jest.fn()
        const c = jest.fn((_ctx, _next, _err) => {})

        bot.test(a)
        bot.test(b)
        bot.test(c)
        bot.execMiddleware({ path: ['test'] })

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)
        expect(c).toBeCalledTimes(0)

        a.mock.calls[0][1](new Error('oops!'))

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)
        expect(c).toBeCalledTimes(1)
        expect(c.mock.calls[0][2]).toEqual(new Error('oops!'))
      })

      it('catches errors', () => {
        const a = jest.fn(() => {
          throw new Error('oops!')
        })
        const b = jest.fn()
        const c = jest.fn((_ctx, _next, _err) => {})

        bot.test(a)
        bot.test(b)
        bot.test(c)
        bot.execMiddleware({ path: ['test'] })

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)
        expect(c).toBeCalledTimes(1)
        expect(c.mock.calls[0][2]).toEqual(new Error('oops!'))
      })
    })
  })

  test('plugins', async () => {
    const start = jest.fn()
    const preStart = jest.fn()
    const init = jest.fn()
    const middleware = jest.fn()

    const OtherPlugin = createPlugin<
      {},
      {
        other: Middleware<Context>
        decoration: number
      }
    >(() => {
      return {
        id: 'other',
        middleware: ['other'],

        start,
        preStart,
        init(bot) {
          init(bot)

          return { decoration: 123 }
        },
      }
    })

    const bot = Cord([TestPlugin({}), OtherPlugin({})])

    expect(bot).toHaveProperty('test')
    expect(bot).toHaveProperty('other')
    expect(bot).toHaveProperty('decoration')
    expect(bot.decoration).toBe(123)

    bot.other(middleware)

    expect(init).toBeCalledTimes(1)
    expect(init).toBeCalledWith(bot)
    expect(start).not.toBeCalled()
    expect(preStart).not.toBeCalled()

    bot.execMiddleware({ path: ['other'] })

    await bot.start()

    expect(middleware).toBeCalledTimes(1)
    expect(start).toBeCalledTimes(1)
    expect(preStart).toBeCalledTimes(1)
  })
})
