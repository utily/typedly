import { typedly } from "./index"

declare global {
	export type Optional<T, Keys extends keyof T> = typedly.Object.Optional<T, Keys>
	export type MaybePromise<T> = typedly.Promise.Maybe<T>
	export type Writeable<T> = typedly.Object.Writeable<T>
	export type DistributiveOmit<T, K extends keyof any> = typedly.Object.DistributiveOmit<T, K>
	export type DistributiveExclude<T, K extends keyof T, E> = typedly.Object.DistributiveExclude<T, K, E>
	export type DotNotation<T> = typedly.Object.DotNotation<T>
	export type KeyOf<T> = typedly.Object.KeyOf<T>
	export type ValueOf<T> = typedly.Object.ValueOf<T>
	export type RemoveMethods<T> = typedly.Object.RemoveMethods<T>
	export type Return<T extends (...parameters: any[]) => any> = typedly.Function.Return<T>
	export type Parameter<T extends (...parameters: any[]) => any, N extends number> = typedly.Function.Parameter<T, N>
	export type ProtectedConstructorParameters<T> = typedly.Function.ProtectedConstructorParameters<T>
	export type UnionValues<T> = typedly.Array.UnionValues<T>
	export type OmitFirst<T extends readonly any[]> = typedly.Array.OmitFirst<T>
}
