import { CordBot } from './bot'
import { Client, ClientOptions } from 'discord.js'

/**
 * A {@link https://cord.js.org/docs/plugins | plugin}
 *
 * @public
 */
export interface CordPlugin<DecoratedBotT extends CordBot = CordBot> {
  /**
   * Unique ID for this plugin
   *
   * @remarks
   * If the plugin will be published as an NPM package,
   * it is recommended that the NPM package name is used.
   */
  id: string

  /**
   * Add extra properties to the bot.
   *
   * @remarks
   * :::info[Lifecycle Method]
   *
   * This method is a lifecycle method and gets run
   * during the bot's lifecycle.
   *
   * :::
   *
   * This can be used to add middleware onto the bot.
   *
   * @param client - the client
   */
  decorateBot?(bot: CordBot): DecoratedBotT

  /**
   * Called after the client has started
   *
   * @remarks
   * :::info[Lifecycle Method]
   *
   * This method is a lifecycle method and gets run
   * during the bot's lifecycle.
   *
   * :::
   *
   * This is called after the client has started,
   * after {@link CordPlugin.preStart}.
   */
  start?(): Promise<void>

  /**
   * Called before the client is started
   *
   * @remarks
   * :::info[Lifecycle Method]
   *
   * This method is a lifecycle method and gets run
   * during the bot's lifecycle.
   *
   * :::
   *
   * This is called before the client is started,
   * before {@link CordPlugin.start}.
   */
  preStart?(): Promise<void>

  /**
   * Modify the {@link https://discord.js.org/#/docs/discord.js/stable/class/Client | Discord.js client} options.
   *
   * @remarks
   * :::info[Lifecycle Method]
   *
   * This method is a lifecycle method and gets run
   * during the bot's lifecycle.
   *
   * :::
   *
   * This is called before the client is started,
   * before {@link CordPlugin.start}, after {@link CordPlugin.preStart}.
   *
   * @returns
   * A new client options object, mutating the original is allowed,
   * in that case just return the original.
   */
  modifyClientOptions?(options: ClientOptions): ClientOptions
}

/**
 * Options for {@link CordPluginHelper}
 *
 * @public
 */
export interface CordPluginOptions<
  MiddlewareT extends string,
  BotDecorationsT
> {
  /**
   * {@inheritdoc CordPlugin.id}
   */
  id: string

  /**
   * The name of the plugin's middleware.
   */
  middleware: MiddlewareT

  /**
   * {@inheritdoc CordPlugin.start}
   */
  start?(): Promise<void>

  /**
   * {@inheritdoc CordPlugin.preStart}
   */
  preStart?(): Promise<void>

  /**
   * {@inheritdoc CordPlugin.modifyClientOptions}
   */
  modifyClientOptions?(options: ClientOptions): ClientOptions

  /**
   * Runs during the initialization of the bot.
   *
   * @remarks
   * :::info Lifecycle Method
   *
   * This method is a lifecycle method and gets run
   * during the bot's lifecycle.
   *
   * :::
   *
   * This is a wrapper around {@link CordPlugin.decorateBot}, it will
   * add the properties of the returned object (if any) to the bot.
   */
  init?(): Omit<BotDecorationsT, MiddlewareT>
}

/**
 * Helpers passed to the factory to {@link CordPluginHelper}
 *
 * @public
 */
export interface CordPluginHelpers {
  /**
   * Returns a path by combining the name of the middleware and the path
   *
   * @param path - the path
   */
  path(path: string[]): string[]

  /**
   * Returns the bot the plugin instances is added to.
   *
   * @remarks
   * This function will error when the {@link CordBot | bot} is not available yet.
   *
   * It's available when {@link CordPluginOptions.init} is called.
   */
  bot(): CordBot

  /**
   * Returns the client of the bot.
   *
   * @remarks
   * This function will error when the client or the bot is not available yet.
   *
   * It is available during {@link CordPluginOptions.start}
   */
  client(): Client
}

/**
 * Creates a plugin
 *
 * @remarks
 * This is a utility function that creates a plugin factory
 * function.
 *
 * The factory function accepts options and returns a plugin.
 *
 * A `middleware` option is also added to allow users to change
 * the name of middleware in order to avoid collisions.
 *
 * @param options - the options
 * @returns a plugin factory
 *
 * @public
 */
export function CordPluginHelper<MiddlewareT extends string, BotDecorationsT>(
  factory: (
    helpers: CordPluginHelpers
  ) => CordPluginOptions<MiddlewareT, BotDecorationsT>
) {
  let pluginBot: null | CordBot = null
  let middleware: null | string = null

  const helpers: CordPluginHelpers = {
    bot() {
      if (!pluginBot)
        throw new Error("Cannot get bot before 'init' has been called")
      return pluginBot
    },

    client() {
      const client = helpers.bot().client
      if (!client)
        throw new Error("Cannot get client before 'start' has been called")
      return client
    },

    path(path) {
      if (!middleware)
        throw new Error('Cannot get path before plugin has been initialized')
      return [middleware, ...path]
    },
  }

  const options = factory(helpers)
  middleware = options.middleware

  const plugin: CordPlugin<CordBot & BotDecorationsT> = {
    id: options.id,

    start: options.start,
    preStart: options.preStart,
    modifyClientOptions: options.modifyClientOptions,

    decorateBot(bot) {
      pluginBot = bot

      bot.defineMiddleware(options.middleware)

      const decorations = options.init?.()
      if (decorations) {
        Object.assign(bot, decorations)
      }

      return bot as CordBot & BotDecorationsT
    },
  }

  return plugin
}
