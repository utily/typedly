export type TypedlyArray<T> = T[]
export namespace TypedlyArray {
	// https://catchts.com/union-array
	type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
	type UnionToOverloads<U> = UnionToIntersection<U extends any ? (f: U) => void : never>
	type PopUnion<U> = UnionToOverloads<U> extends (a: infer A) => void ? A : never
	type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
	type BuildUnion<T, A extends unknown[] = []> = IsUnion<T> extends true
		? BuildUnion<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
		: [T, ...A]
	export type UnionValues<T> = BuildUnion<T>
	// https://stackoverflow.com/questions/65532007/how-do-i-omit-an-element-from-an-array-type-such-as-parameterst
	export type OmitFirst<T extends readonly any[]> = T extends readonly [any, ...infer R] ? R : never
}
