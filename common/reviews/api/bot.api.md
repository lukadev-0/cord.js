## API Report File for "@cordjs/bot"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Client } from 'discord.js';
import { ClientOptions } from 'discord.js';

// @public
export abstract class Context {
    constructor(path: string[]);
    path: string[];
}

// @public
function Cord<TPlugins extends ICordPlugin[]>(plugins: TPlugins): CordBotWithPlugins<TPlugins>;
export { Cord }
export default Cord;

// @public
export class CordBot {
    constructor(plugins: ICordPlugin[]);
    client?: Client;
    defineMiddleware(name: string): void;
    // (undocumented)
    execMiddleware(context: Context): Promise<void>;
    readonly middleware: IMiddlewareObject<Context>[];
    readonly plugins: Record<string, ICordPlugin>;
    start(): Promise<void>;
}

// Warning: (ae-forgotten-export) The symbol "UnionToIntersection" needs to be exported by the entry point index.d.ts
//
// @public
export type CordBotWithPlugins<TPlugins extends ICordPlugin[]> = CordBot & UnionToIntersection<TPlugins[number] extends ICordPlugin<infer R> ? R : unknown>;

// @public
export function CordPlugin<MiddlewareT extends string, BotDecorationsT>(factory: (helpers: ICordPluginHelpers) => ICordPluginOptions<MiddlewareT, BotDecorationsT>): ICordPlugin<CordBot & BotDecorationsT>;

// @public
export interface ICordPlugin<DecoratedBotT extends CordBot = CordBot> {
    decorateBot?(bot: CordBot): DecoratedBotT;
    id: string;
    modifyClientOptions?(options: ClientOptions): ClientOptions;
    preStart?(): Promise<void>;
    start?(): Promise<void>;
}

// @public
export interface ICordPluginHelpers {
    bot(): CordBot;
    client(): Client;
    path(path: string[]): string[];
}

// @public
export interface ICordPluginOptions<MiddlewareT extends string, BotDecorationsT> {
    // Warning: (ae-unresolved-inheritdoc-reference) The @inheritDoc reference could not be resolved: No member was found with name "id"
    //
    // (undocumented)
    id: string;
    init?(): Omit<BotDecorationsT, MiddlewareT>;
    middleware: MiddlewareT;
    // Warning: (ae-unresolved-inheritdoc-reference) The @inheritDoc reference could not be resolved: No member was found with name "modifyClientOptions"
    //
    // (undocumented)
    modifyClientOptions?(options: ClientOptions): ClientOptions;
    // Warning: (ae-unresolved-inheritdoc-reference) The @inheritDoc reference could not be resolved: No member was found with name "preStart"
    //
    // (undocumented)
    preStart?(): Promise<void>;
    // Warning: (ae-unresolved-inheritdoc-reference) The @inheritDoc reference could not be resolved: No member was found with name "start"
    //
    // (undocumented)
    start?(): Promise<void>;
}

// @public
export interface IMiddlewareObject<T extends Context> {
    // (undocumented)
    callback: MiddlewareCallback<T>;
    // (undocumented)
    path: string[];
}

// @public
export interface IMiddlewareOptions<T> {
    callback: MiddlewareCallback<T>;
}

// @public
export type Middleware<T, O extends Record<string, unknown> = Record<string, never>> = (callback: MiddlewareCallback<T> | (IMiddlewareOptions<T> & O)) => void;

// @public
export type MiddlewareCallback<T> = (context: T, next: NextFn, err: unknown) => void;

// @public
export type MiddlewareGroup<T extends Record<string, Middleware<Context>>> = (<K extends keyof T>(name: K, ...args: Parameters<T[K]>) => void) & (<K extends keyof T>(...args: Parameters<T[K]>) => void) & T;

// @public
export type NextFn = (err?: unknown) => void;

```