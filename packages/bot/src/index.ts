/**
 * Cord.js is a Discord bot framework.
 * @packageDocumentation
 */

export { Cord as default, Cord, CordBot } from './bot'
export { Context } from './context'
export { createMiddlewareBuilder } from './middleware'
export { CordPluginHelper } from './plugin'

export type {
  MiddlewareCallback,
  Middleware,
  MiddlewareGroup,
  MiddlewareObject,
  MiddlewareOptions,
  NextFn,
} from './middleware'

export type { CordPlugin, CordPluginOptions, CordPluginHelpers } from './plugin'

export type { CordBotWithPlugins } from './bot'
