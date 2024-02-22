export type Return<T extends (...parameters: any[]) => any> = Awaited<ReturnType<T>>
export type Parameter<T extends (...parameters: any[]) => any, N extends number> = Parameters<T>[N]
