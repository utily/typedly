export type Return<T extends (...parameters: any[]) => any> = Awaited<ReturnType<T>>
export type Parameter<T extends (...parameters: any[]) => any, N extends number> = Parameters<T>[N]
// source: https://github.com/microsoft/TypeScript/issues/31278#issuecomment-686070769
export type ProtectedConstructorParameters<T> = ConstructorParameters<
	(new (...parameters: any[]) => { [x: string]: any }) & T
>
