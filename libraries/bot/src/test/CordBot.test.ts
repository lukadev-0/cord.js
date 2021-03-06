import {
  Cord,
  CordBot,
  Context,
  CordBotWithPlugins,
  CordPlugin,
  ICordPlugin,
  Middleware,
  MiddlewareGroup,
} from '..'

const TestPlugin = (): ICordPlugin<
  CordBot & {
    test: MiddlewareGroup<{
      yes: Middleware<Context>
      maybe: MiddlewareGroup<{
        hm: Middleware<Context>
      }>
    }>
  }
> => ({
  id: 'test',

  decorateBot(bot: CordBot) {
    bot.defineMiddleware('test')
    return bot as CordBot & {
      test: MiddlewareGroup<{
        yes: Middleware<Context>
        maybe: MiddlewareGroup<{
          hm: Middleware<Context>
        }>
      }>
    }
  },
})

describe('Bot', () => {
  describe('middleware', () => {
    let bot: CordBotWithPlugins<[ReturnType<typeof TestPlugin>]>

    beforeEach(() => {
      bot = Cord([TestPlugin()])
    })

    test.each<[(fn: jest.Mock) => void, unknown]>([
      [fn => bot.test(fn), { path: ['test', 'yes'] }],
      [fn => bot.test('maybe', fn), { path: ['test', 'maybe', 'hm'] }],
      [fn => bot.test.maybe.hm(fn), { path: ['test', 'maybe', 'hm'] }],
      [fn => bot.test.maybe(fn), { path: ['test', 'maybe', 'hm'] }],
    ])('%# (single middleware)', (fn, ctx) => {
      const f = jest.fn()
      fn(f)
      bot.runMiddleware(ctx as Context)
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
        bot.runMiddleware({ path: ['test'] })

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)

        a.mock.calls[0][1]()

        expect(b).toBeCalledTimes(1)
      })

      it('handles errors', () => {
        const a = jest.fn()
        const b = jest.fn()
        const c = jest.fn((ctx, next, err) => {})

        bot.test(a)
        bot.test(b)
        bot.test(c)
        bot.runMiddleware({ path: ['test'] })

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
        const c = jest.fn((ctx, next, err) => {})

        bot.test(a)
        bot.test(b)
        bot.test(c)
        bot.runMiddleware({ path: ['test'] })

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)
        expect(c).toBeCalledTimes(1)
        expect(c.mock.calls[0][2]).toEqual(new Error('oops!'))
      })

      it('catches promises', async () => {
        const a = jest.fn(() => {
          return Promise.reject(new Error('oops!'))
        })
        const b = jest.fn()
        const c = jest.fn((ctx, next, err) => {})

        bot.test(a)
        bot.test(b)
        bot.test(c)
        bot.runMiddleware({ path: ['test'] })

        // allow the catch to run due to it being a microtask
        await Promise.resolve()

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)
        expect(c).toBeCalledTimes(1)
        expect(c.mock.calls[0][2]).toEqual(new Error('oops!'))
      })
    })

    it('throws an error if middleware is added after start is called', async () => {
      await bot.start()
      await expect(() => bot.test(() => {})).toThrow(
        new Error("Cannot add middleware after 'start()' has been called")
      )
    })
  })

  test('plugins', async () => {
    const start = jest.fn()
    const preStart = jest.fn()
    const init = jest.fn(() => ({ decoration: 123 } as const))
    const middleware = jest.fn()

    const OtherPlugin = (): ICordPlugin<
      CordBot & {
        decoration: 123
        other: Middleware<Context>
      }
    > =>
      CordPlugin<'other', { decoration: 123; other: Middleware<Context> }>(
        () => ({
          id: 'other',
          middleware: 'other',

          start,
          preStart,
          init,
        })
      )

    const bot = Cord([TestPlugin(), OtherPlugin()])

    expect(bot).toHaveProperty('test')
    expect(bot).toHaveProperty('other')
    expect(bot).toHaveProperty('decoration')
    expect(bot.decoration).toBe(123)

    bot.other(middleware)

    expect(init).toBeCalledTimes(1)
    expect(start).not.toBeCalled()
    expect(preStart).not.toBeCalled()

    bot.runMiddleware({ path: ['other'] })

    await bot.start()

    expect(middleware).toBeCalledTimes(1)
    expect(start).toBeCalledTimes(1)
    expect(preStart).toBeCalledTimes(1)
  })

  it('throws an error if start is called twice', async () => {
    const bot = Cord([])

    await bot.start()
    await expect(bot.start()).rejects.toThrow(
      new Error("Can only run 'start()' once")
    )
  })
})
