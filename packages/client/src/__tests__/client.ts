import { Client } from '../client'
import { Context } from '../context'

declare module '../client' {
  export interface Client {
    test: MiddlewareGroup<{
      yes: Middleware<{ path: string[]; d: 'y' }>
      no: Middleware<{ path: string[]; d: 'n' }>
      maybe: MiddlewareGroup<{
        hm: Middleware<{ path: string[]; d: 'h' }>
      }>
    }>
  }
}

describe('Client', () => {
  let client: Client

  beforeEach(() => {
    client = new Client()
    client.defineMiddlewareRoot('test')
  })

  test.each<[(fn: jest.Mock) => void, unknown]>([
    [fn => client.test(fn), { path: ['test', 'yes'], d: 'y' }],
    [fn => client.test('maybe', fn), { path: ['test', 'maybe', 'hm'], d: 'h' }],
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
  })
})
