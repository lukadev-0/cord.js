/**
 * Cord.js Client, the main class for any Cord.js bot
 * @packageDocumentation
 */

import { createClient } from './client'

export {
  createClient,
  BaseClient,
  ClientOptions,
  CreateClientPlugins,
} from './client'
export { Context } from './context'
export {
  Middleware,
  MiddlewareGroup,
  MiddlewareHandler,
  MiddlewareInterface,
  NextFn,
} from './middleware'
export {
  ClientPlugin,
  PluginConstructor,
  PluginExtendedClient,
  PluginMiddlewareMap,
  PluginOptions,
  AnyPlugin,
  ExtendedClient,
  ClientWithPlugins,
} from './plugin'

export default createClient
