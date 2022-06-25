/**
 * The main package for Cord.js.
 * @packageDocumentation
 */

export { default as Context } from './Context'
export {
  default as CordBot,
  CordBotWithPlugins,
  Cord,
  Cord as default,
} from './CordBot'
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
export { default as ClientOptions } from './ClientOptions'
export { default as pathMatches } from './pathMatches'
