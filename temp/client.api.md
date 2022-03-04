## API Report File for "@cordjs/client"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type AnyPlugin = ClientPlugin<Record<string, Middleware<Context>>>;

// @public
export class BaseClient {
    constructor(options: ClientOptions);
    // @internal
    _defineMiddlewareRoot(name: string): void;
    // @internal
    _execMiddleware(context: Context, after?: number, err?: unknown): void;
    readonly middleware: MiddlewareInterface<Context>[];
    // (undocumented)
    plugin<T extends string | typeof ClientPlugin>(id: T): (T extends string ? AnyPlugin : T) | null;
    readonly plugins: Record<string, AnyPlugin>;
    start(): Promise<void>;
}

// @public
export interface ClientOptions {
    // (undocumented)
    plugins: AnyPlugin[];
}

// @public
export abstract class ClientPlugin<TMiddleware extends {
    [x: string]: Middleware<Context>;
}, TOptions extends PluginOptions<TMiddleware> = PluginOptions<TMiddleware>> {
    constructor(options: TOptions, defaultMiddleware: ReadonlyArray<{
        [K in keyof TMiddleware]: K;
    }[keyof TMiddleware]>);
    client?: BaseClient;
    extendClient(base: typeof BaseClient): ExtendedClient<TMiddleware>;
    abstract readonly id: string;
    init(client: BaseClient): void;
    readonly middleware: PluginMiddlewareMap<TMiddleware>;
    readonly options: TOptions;
    // (undocumented)
    protected pluginRunMiddleware(context: Context): void;
    // @virtual
    preStart(): void;
    // @virtual
    start(): void;
}

// Warning: (ae-forgotten-export) The symbol "UnionToIntersection" needs to be exported by the entry point index.d.ts
//
// @public
export type ClientWithPlugins<T extends AnyPlugin> = BaseClient & UnionToIntersection<PluginExtendedClient<T>>;

// @public
export abstract class Context {
    constructor(path: string[]);
    path: string[];
}

// @public
function createClient<T extends PluginConstructor<AnyPlugin>>(plugins: CreateClientPlugins<T>[]): ClientWithPlugins<InstanceType<T>>;
export { createClient }
export default createClient;

// @public
export type CreateClientPlugins<T extends PluginConstructor<AnyPlugin>> = T | [T, ConstructorParameters<T>[0]];

// @public
export type ExtendedClient<T> = new () => T & BaseClient;

// @public
export type Middleware<T extends Context> = (handler: MiddlewareHandler<T>) => void;

// @public
export type MiddlewareGroup<T extends Record<string, Middleware<Context>>> = (<K extends keyof T>(name: K, ...args: Parameters<T[K]> | []) => T[K]) & {
    [K in keyof T]: T[K];
} & (<K extends keyof T>(...args: Parameters<T[K]>) => void);

// @public
export interface MiddlewareHandler<T extends Context> {
    // (undocumented)
    (context: T, next: NextFn, err: unknown): void;
}

// @public
export interface MiddlewareInterface<T extends Context> {
    // (undocumented)
    cb: MiddlewareHandler<T>;
    // (undocumented)
    path: string[];
}

// @public
export type NextFn = (err?: unknown) => void;

// @public
export type PluginConstructor<T extends AnyPlugin> = (new () => T) | (new (options: any) => T);

// @public
export type PluginExtendedClient<T extends AnyPlugin> = InstanceType<ReturnType<T['extendClient']>>;

// @public
export type PluginMiddlewareMap<TMiddleware extends Record<string, Middleware<Context>>> = {
    [K in keyof TMiddleware]: string;
};

// @public
export interface PluginOptions<TMiddleware extends {
    [x: string]: Middleware<Context>;
}> {
    // (undocumented)
    middleware?: PluginMiddlewareMap<TMiddleware>;
}

```