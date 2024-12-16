export type TypedlyObject<T = any> = {
	[P in keyof T]: T[P]
}
export namespace TypedlyObject {
	export type Optional<T, Keys extends keyof T> = Omit<T, Keys> &
		{
			[Key in Keys]?: T[Key]
		}
	export type Writeable<T> = {
		-readonly [P in keyof T]: T[P]
	}
	export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
	export type DistributiveExclude<T, K extends keyof T, E> = {
		[key in keyof T]: key extends K ? Exclude<T[key], E> : T[key]
	}
	// inspiration from: https://stackoverflow.com/questions/47057649/typescript-string-dot-notation-of-nested-object
	type Mapping<TObject> = {
		[TKey in keyof TObject as string]: TKey extends string | number
			? TObject[TKey] extends Record<any, any>
				? DotNotation<TObject[TKey]> extends string | number
					? `${TKey}` | `${TKey}.${DotNotation<TObject[TKey]>}`
					: never
				: `${TKey}`
			: never
	}
	export type DotNotation<TObject> = TObject extends string | number
		? `${TObject}`
		: Mapping<TObject>[keyof Mapping<TObject>]
	export type KeyOf<T> = T extends Record<infer R, any> ? R : never
	export type ValueOf<T> = T extends Record<keyof any, infer R> ? R : never
	export type RemoveMethods<T> = {
		[K in keyof T as T[K] extends (...parameters: any[]) => any ? never : K]: T[K]
	}
	export const entries: <T>(object: T | undefined) => [keyof T, T[keyof T]][] = object =>
		object === undefined ? [] : (globalThis.Object.entries as typeof entries)(object)
	export const keys: <T>(object: T) => (keyof T)[] = globalThis.Object.keys
	export const values: <T>(object: T | undefined) => T[keyof T][] = object =>
		object === undefined ? [] : (globalThis.Object.values as typeof values)(object)
	export const from: <T>(properties: [keyof T, T[keyof T]][]) => T = globalThis.Object.fromEntries
	export function map<T, R>(object: T, mapping: ([key, value]: [keyof T, T[keyof T]]) => [keyof R, R[keyof R]]): R {
		return from(entries(object).map(mapping))
	}
	export function reduce<R, T = unknown>(
		object: T,
		reducer: (previous: R, [key, value]: [keyof T, T[keyof T]]) => R,
		initial: R
	): R {
		return entries(object).reduce((result, [key, value]) => reducer(result, [key, value]), initial)
	}
	export function mapValues<T, R>(
		object: T,
		mapping: (value: T[keyof T], key: keyof T) => keyof T extends keyof R ? R[keyof T] : never
	): {
		[K in keyof T]: K extends keyof R ? R[K] : never
	} {
		return map<
			T,
			{
				[K in keyof T]: K extends keyof R ? R[K] : never
			}
		>(object, ([key, value]) => [key, mapping(value, key)])
	}
	export function filter<T>(object: T, predicate: <K extends keyof T>(value: T[K], key: K) => boolean): Partial<T> {
		return from(entries(object).filter(([key, value]) => predicate(value, key)))
	}
}
