import { Middleware } from './middleware'
import { Context } from './context'
import { CordBot } from './bot'

/**
 * A plugin
 *
 * @public
 */
export interface CordPlugin {
  /**
   * Unique ID for this plugin
   */
  id: string

  /**
   * Allows the plugin to add properties to the bot
   *
   * @remarks
   * :::info Lifecycle Method
   *
   * This method is a lifecycle method and gets run
   * during the bot's lifecycle.
   *
   * :::
   *
   *
   * :::note Create Plugin Utility
   * The {@link createPlugin} utility will automatically
   * create a `decorateBot` function for you.
   * :::
   *
   * This can be used to add middleware onto the bot.
   *
   * @param client - the client
   */
  decorateBot?(bot: CordBot): CordBot

  /**
   * Called after the client has started
   *
   * @remarks
   * :::info Lifecycle Method
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
   * :::info Lifecycle Method
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
}

/**
 * Returns an object but with fields renamed
 *
 * @public
 */
export type RenameFields<
  A extends Record<string, unknown>,
  B extends Record<string, string | undefined>
> = {
  [K in keyof A as B extends { [L in K]: string } ? B[K] : K]: A[K]
}

const _createPlugin = <T extends CordPlugin>(plugin: T) => plugin

/**
 * Options for {@link createPlugin}
 *
 * @public
 */
export interface CordPluginOptions {
  /**
   * {@inheritdoc CordPlugin.id}
   */
  id: string

  /**
   * The plugin's middleware
   *
   * @remarks
   * This is used to by the plugin's
   * {@link CordPlugin.decorateBot} method.
   */
  middleware: string[]

  /**
   * {@inheritdoc CordPlugin.start}
   */
  start?(): Promise<void>

  /**
   * {@inheritdoc CordPlugin.preStart}
   */
  preStart?(): Promise<void>

  /**
   * Runs during the plugin's decorateBot method.
   * If an object is returned, all properties will
   * be added to the bot.
   *
   * @remarks
   * :::info Lifecycle Method
   *
   * This method is a lifecycle method and gets run
   * during the bot's lifecycle.
   *
   * :::
   *
   * Runs after all middleware has been added to the bot.
   */
  init?(bot: CordBot): void | Record<string, unknown>
}

/**
 * Helpers passed to the factory to {@link createPlugin}
 *
 * @public
 */
export interface CordPluginHelpers {
  path(root: string, path: string[]): string[]

  root(root: string): string

  bot(): CordBot
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
export function createPlugin<O, M extends Record<string, unknown>>(
  factory: (options: O, helpers: CordPluginHelpers) => CordPluginOptions
) {
  return <
    N extends {
      readonly [K in keyof M]?: string
    } = {}
  >(
    options: O & { middleware?: N }
  ) => {
    let pluginBot: CordBot

    const helpers: CordPluginHelpers = {
      root(root) {
        const middlewareOption =
          options?.middleware ??
          ({} as {
            [K in keyof M]?: string
          })

        return middlewareOption[root as keyof M] ?? root
      },

      path(root, path) {
        return [this.root(root), ...path]
      },

      bot() {
        if (!pluginBot) throw new Error('Bot not initialized')

        return pluginBot
      },
    }

    const pluginOptions = factory(options, helpers)

    const plugin = _createPlugin({
      id: pluginOptions.id,

      helpers,

      decorateBot(bot): CordBot & RenameFields<M, N> {
        pluginBot = bot

        const middlewareOption =
          options?.middleware ??
          ({} as {
            [K in keyof M]?: string
          })

        for (const middleware of pluginOptions.middleware) {
          const middlewareName =
            middlewareOption[middleware as keyof M] ?? middleware

          bot.defineMiddleware(middlewareName)
        }

        const decorations = pluginOptions.init?.(bot)
        if (decorations) {
          for (const property in decorations) {
            Object.defineProperty(bot, property, {
              value: decorations[property],
            })
          }
        }

        return bot as CordBot & RenameFields<M, N>
      },

      start: pluginOptions.start,

      preStart: pluginOptions.preStart,
    })

    return plugin
  }
}
