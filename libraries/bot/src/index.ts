/**
 * Cord.js is a Discord bot framework.
 * @packageDocumentation
 */

export { Context } from './context'
export { CordBotWithPlugins, Cord as default, Cord, CordBot } from './bot'
export {
  ICordPlugin,
  ICordPluginOptions,
  CordPlugin,
  ICordPluginHelpers,
} from './plugin'
export {
  MiddlewareCallback,
  Middleware,
  MiddlewareGroup,
  IMiddlewareObject,
  IMiddlewareOptions,
  NextFn,
} from './middleware'
