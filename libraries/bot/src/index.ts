/**
 * The main package for Cord.js.
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
  MiddlewareObject,
  IMiddlewareOptions,
  NextFn,
} from './middleware'
export { ClientOptions } from './clientoptions'
