import { Context } from '..'

/**
 * Context is an abstract class so we can't
 * construct it normally.
 */
class ExtendedContext extends Context {}

test('Context', () => {
  const path = ['some', 'really', 'cool', 'path']
  const context = new ExtendedContext(path)

  expect(context.path).toBe(path)
})
