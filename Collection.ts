export abstract class Collection<T> {
	toString(): string {
		return this.toArray().toString()
	}
	toLocaleString(): string {
		return this.toArray().toLocaleString()
	}
	concat(...items: ConcatArray<T>[] | (T | ConcatArray<T>)[]): T[] {
		return this.toArray().concat(...items)
	}
	join(separator?: string): string {
		return this.toArray().join(separator)
	}
	slice(start?: number, end?: number): T[] {
		return this.toArray().slice(start, end)
	}
	indexOf(needle: T, start?: number): number {
		return this.toArray().indexOf(needle, start)
	}
	lastIndexOf(needle: T, start?: number): number {
		return this.toArray().lastIndexOf(needle, start)
	}
	includes(needle: T, start?: number): boolean {
		return this.toArray().includes(needle, start)
	}
	every<S extends T>(
		predicate: (value: T, index: number, array: readonly T[]) => value is S,
		thisArgument?: any
	): this is readonly S[]
	every(predicate: (value: T, index: number, array: readonly T[]) => boolean, thisArgument?: any): boolean
	every(predicate: (value: T, index: number, array: readonly T[]) => boolean, thisArgument?: any): boolean {
		return this.toArray().every(predicate, thisArgument)
	}
	some(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArgument?: any): boolean {
		return this.toArray().some(predicate, thisArgument)
	}
	forEach(callback: (value: T, index: number, array: readonly T[]) => void, thisArgument?: any): void {
		this.toArray().forEach(callback, thisArgument)
	}
	map<U>(mapping: (value: T, index: number, array: readonly T[]) => U, thisArgument?: any): U[] {
		return this.toArray().map(mapping, thisArgument)
	}
	filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArgument?: any): S[]
	filter(predicate: (value: T, index: number, array: readonly T[]) => boolean, thisArgument?: any): T[]
	filter(predicate: (value: T, index: number, array: readonly T[]) => boolean, thisArgument?: any): T[] {
		return this.toArray().filter(predicate, thisArgument)
	}
	reduce(reducer: (last: T, current: T, index: number, array: readonly T[]) => T): T
	reduce(reducer: (last: T, current: T, index: number, array: readonly T[]) => T, initial: T): T
	reduce<U>(reducer: (last: U, current: T, index: number, array: readonly T[]) => U, initial: U): U
	reduce<U>(
		...argument:
			| [(last: U, current: T, index: number, array: readonly T[]) => U, U]
			| [(last: T, current: T, index: number, array: readonly T[]) => T]
	): U | T {
		return argument.length == 1 ? this.toArray().reduce(...argument) : this.toArray().reduce(...argument)
	}
	reduceRight(reducer: (last: T, current: T, index: number, array: readonly T[]) => T): T
	reduceRight(reducer: (last: T, current: T, index: number, array: readonly T[]) => T, initial: T): T
	reduceRight<U>(reducer: (last: U, current: T, index: number, array: readonly T[]) => U, initial: U): U
	reduceRight<U>(
		...argument:
			| [(last: U, current: T, index: number, array: readonly T[]) => U, U]
			| [(last: T, current: T, index: number, array: readonly T[]) => T]
	): U | T {
		return argument.length == 1 ? this.toArray().reduceRight(...argument) : this.toArray().reduce(...argument)
	}
	find<S extends T>(
		predicate: (value: T, index: number, obj: readonly T[]) => value is S,
		thisArgument?: any
	): S | undefined
	find(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArgument?: any): T | undefined
	find(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArgument?: any): T | undefined {
		return this.toArray().find(predicate, thisArgument)
	}
	findIndex(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArgument?: any): number {
		return this.toArray().findIndex(predicate, thisArgument)
	}
	abstract entries(): IterableIterator<[number, T]>
	*keys(): IterableIterator<number> {
		for (const [key] of this.entries())
			yield key
	}
	*values(): IterableIterator<T> {
		for (const [, value] of this.entries())
			yield value
	}
	[Symbol.iterator](): IterableIterator<T> {
		return this.values()
	}
	flatMap<U, This = undefined>(
		mapping: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
		thisArgument?: This | undefined
	): U[] {
		return this.toArray().flatMap(mapping, thisArgument)
	}
	flat<D extends number = 1>(depth?: D | undefined): FlatArray<readonly T[], D>[] {
		return this.toArray().flat(depth)
	}
	at(index: number): T | undefined {
		return this.toArray().at(index)
	}
	findLast<S extends T>(
		predicate: (value: T, index: number, array: readonly T[]) => value is S,
		thisArgument?: any
	): S | undefined
	findLast(predicate: (value: T, index: number, array: readonly T[]) => boolean, thisArgument?: any): T | undefined
	findLast(predicate: (value: T, index: number, array: readonly T[]) => boolean, thisArgument?: any): T | undefined {
		return this.toArray().findLast(predicate, thisArgument)
	}
	findLastIndex(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArgument?: any): number {
		return this.toArray().findLastIndex(predicate, thisArgument)
	}
	toReversed(): T[] {
		return this.toArray().toReversed()
	}
	toSorted(comparer?: ((left: T, right: T) => number) | undefined): T[] {
		return this.toArray().toSorted(comparer)
	}
	toSpliced(start: number, remove: number, ...items: T[]): T[]
	toSpliced(start: number, remove?: number): T[]
	toSpliced(start: number): T[]
	toSpliced(...argument: [number, number, ...T[]] | [number, number?]): T[] {
		return argument.length == 1 || argument[1] == undefined
			? this.toArray().toSpliced(argument[0])
			: this.toArray().toSpliced(argument[0], argument[1], ...(([, , ...tail]) => tail)(argument))
	}
	with(index: number, value: T): T[] {
		return this.toArray().with(index, value)
	}
	toArray(): T[] {
		return [...this]
	}
	toJSON(): T[] {
		return this.toArray()
	}
}
export namespace Collection {}
