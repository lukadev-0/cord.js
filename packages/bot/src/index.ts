/**
 * Cord.js is a Discord bot framework.
 * @packageDocumentation
 */

export { Cord as default, CordBot } from './bot'
export { Context } from './context'
export { createMiddlewareBuilder } from './middleware'
export { createPlugin } from './plugin'

export type {
  MiddlewareCallback,
  Middleware,
  MiddlewareGroup,
  MiddlewareObject,
  MiddlewareOptions,
  NextFn,
} from './middleware'

export type {
  CordPlugin,
  CordPluginOptions,
  RenameFields,
  CordPluginHelpers,
} from './plugin'

export type { CordBotWithPlugins } from './bot'
