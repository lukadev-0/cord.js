import { CordBot } from './bot'
import { Client, ClientOptions } from 'discord.js'

/**
 * A {@link https://cord.js.org/docs/plugins | plugin}
 *
 * @public
 */
export interface ICordPlugin<TDecoratedBot extends CordBot = CordBot> {
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
  decorateBot?(bot: CordBot): TDecoratedBot

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
   * after {@link ICordPlugin.preStart}.
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
   * before {@link ICordPlugin.start}.
   */
  preStart?(): Promise<void>

  /**
   * Modifies the {@link https://discord.js.org/#/docs/discord.js/stable/class/Client | Discord.js client} options.
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
   * before {@link ICordPlugin.start}, after {@link ICordPlugin.preStart}.
   *
   * @returns
   * A new client options object, mutating the original is allowed,
   * in that case just return the original.
   */
  modifyClientOptions?(options: ClientOptions): ClientOptions
}

/**
 * Options for the {@link CordPlugin} function
 *
 * @public
 */
export interface ICordPluginOptions<
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
  middleware?: MiddlewareT

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
   * This is a wrapper around {@link ICordPlugin.decorateBot}, it will
   * add the properties of the returned object (if any) to the bot.
   */
  init?(): Omit<BotDecorationsT, MiddlewareT>
}

/**
 * Helpers for {@link CordPlugin}
 *
 * @public
 */
export interface ICordPluginHelpers {
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
   * It's available when {@link ICordPluginOptions.init} is called.
   */
  bot(): CordBot

  /**
   * Returns the client of the bot.
   *
   * @remarks
   * This function will error when the client or the bot is not available yet.
   *
   * It is available during {@link ICordPluginOptions.start}
   */
  client(): Client
}

/**
 * Creates a plugin
 *
 * @remarks
 * This is a utility function that creates a plugin.
 *
 * @param factory - A function that returns an {@link ICordPluginOptions} object.
 *
 * @public
 */
export function CordPlugin<MiddlewareT extends string, BotDecorationsT>(
  factory: (
    helpers: ICordPluginHelpers
  ) => ICordPluginOptions<MiddlewareT, BotDecorationsT>
): ICordPlugin<CordBot & BotDecorationsT> {
  let pluginBot: CordBot
  let middleware: string

  const helpers: ICordPluginHelpers = {
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

    path(path: string[]) {
      if (!middleware)
        throw new Error('Cannot get path before plugin has been initialized')
      return [middleware, ...path]
    },
  }

  const options = factory(helpers)
  if (options.middleware) {
    middleware = options.middleware
  }

  const plugin: ICordPlugin<CordBot & BotDecorationsT> = {
    id: options.id,

    start: options.start,
    preStart: options.preStart,
    modifyClientOptions: options.modifyClientOptions,

    decorateBot(bot: CordBot) {
      pluginBot = bot

      if (options.middleware) {
        bot.defineMiddleware(options.middleware)
      }

      const decorations = options.init?.()
      if (decorations) {
        Object.assign(bot, decorations)
      }

      return bot as CordBot & BotDecorationsT
    },
  }

  return plugin
}
