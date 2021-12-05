import { BaseClient, createClient } from '../client'
import {
  ClientWithPlugins,
  ClientPlugin,
  PluginMiddlewareMap,
  PluginOptions,
} from '../plugin'
import { Context } from '../context'
import { MiddlewareGroup, Middleware } from '../middleware'

type TestMiddleware = {
  test: MiddlewareGroup<{
    yes: Middleware<{ path: string[]; d: 'y' }>
    no: Middleware<{ path: string[]; d: 'n' }>
    maybe: MiddlewareGroup<{
      hm: Middleware<{ path: string[]; d: 'h' }>
    }>
  }>
}

class TestPlugin extends ClientPlugin<TestMiddleware> {
  public id = 'test-plugin'

  constructor(options: PluginOptions<TestMiddleware>) {
    super(options, ['test'])
  }
}

describe('Client', () => {
  describe('middleware', () => {
    let client: ClientWithPlugins<TestPlugin>

    beforeEach(() => {
      client = createClient([TestPlugin])
    })

    test.each<[(fn: jest.Mock) => void, unknown]>([
      [fn => client.test(fn), { path: ['test', 'yes'], d: 'y' }],
      [
        fn => client.test('maybe', fn),
        { path: ['test', 'maybe', 'hm'], d: 'h' },
      ],
      [
        fn => client.test('maybe').hm(fn),
        { path: ['test', 'maybe', 'hm'], d: 'h' },
      ],
      [fn => client.test.maybe(fn), { path: ['test', 'maybe', 'hm'], d: 'h' }],
    ])('%# (single middleware)', (fn, ctx) => {
      const f = jest.fn()
      fn(f)
      client._execMiddleware(ctx as Context)
      expect(f).toBeCalledTimes(1)
      expect(f.mock.calls[0][0]).toBe(ctx)
      expect(f.mock.calls[0][1]).toBeInstanceOf(Function)
    })

    describe('next()', () => {
      it('runs the next middleware', () => {
        const a = jest.fn()
        const b = jest.fn()

        client.test(a)
        client.test(b)
        client._execMiddleware({ path: ['test'] })

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(0)

        a.mock.calls[0][1]()

        expect(b).toBeCalledTimes(1)
      })

      it('handles errors', () => {
        const a = jest.fn()
        const b = jest.fn()
        const c = jest.fn((_ctx, _next, _err) => {})

        client.test(a)
        client.test(b)
        client.test(c)
        client._execMiddleware({ path: ['test'] })

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

        client.test(a)
        client.test(b)
        client.test(c)
        client._execMiddleware({ path: ['test'] })

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

    class OtherPlugin extends ClientPlugin<{ other: Middleware<Context> }> {
      public id = 'other-plugin'

      constructor(options: PluginOptions<{ other: Middleware<Context> }>) {
        super(options, ['other'])
      }

      start() {
        this.pluginRunMiddleware({ path: ['other'] })
        start()
      }

      init(client: BaseClient) {
        super.init(client)
        init()
      }

      preStart = preStart
    }

    const client = createClient([TestPlugin, OtherPlugin])

    expect(client).toHaveProperty('test')
    expect(client).toHaveProperty('other')

    client.other(middleware)

    expect(init).toBeCalledTimes(1)
    expect(start).not.toBeCalled()
    expect(preStart).not.toBeCalled()

    await client.start()

    expect(middleware).toBeCalledTimes(1)
    expect(start).toBeCalledTimes(1)
    expect(preStart).toBeCalledTimes(1)
  })
})
