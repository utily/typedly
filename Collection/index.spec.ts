import { typedly } from "../index"

describe("Collection", () => {
	const backend: readonly number[] = [0, 1, 2, 2]
	class Collection<T> extends typedly.Collection<T> {
		constructor(readonly backend: T[]) {
			super()
		}
		entries(): IterableIterator<[number, T]> {
			return this.backend.entries()
		}
	}
	const collection = new Collection<number>([...backend])
	it("toString", () => {
		expect(collection.toString()).toEqual(backend.toString())
	})
	it("toLocaleString", () => {
		expect(collection.toLocaleString()).toEqual(backend.toLocaleString())
	})
	it("concat", () => {
		const argument = [[4]] as const
		expect(collection.concat(...argument)).toEqual(backend.concat(...argument))
	})
	it("join", () => {
		const argument = [", "] as const
		expect(collection.join(...argument)).toEqual(backend.join(...argument))
	})
	it("slice", () => {
		const argument = [1, 1] as const
		expect(collection.slice(...argument)).toEqual(backend.slice(...argument))
	})
	it("indexOf", () => {
		const argument = [2, 1] as const
		expect(collection.indexOf(...argument)).toEqual(backend.indexOf(...argument))
	})
	it("lastIndexOf", () => {
		const argument = [2, 1] as const
		expect(collection.lastIndexOf(...argument)).toEqual(backend.lastIndexOf(...argument))
	})
	it("includes", () => {
		const argument = [1] as const
		expect(collection.includes(...argument)).toEqual(backend.includes(...argument))
	})
	it("every", () => {
		const argument = [(value: number, index: number): boolean => typeof value == "number" && index <= value] as const
		expect(collection.every(...argument)).toEqual(backend.every(...argument))
	})
	it("some", () => {
		const argument = [(value: number, index: number, array: readonly number[]): boolean => value < index] as const
		expect(collection.some(...argument)).toEqual(backend.some(...argument))
	})
	it("map", () => {
		const argument = [
			(value: number, index: number, array: readonly number[]): number => value + index + array.length,
		] as const
		expect(collection.map(...argument)).toEqual(backend.map(...argument))
	})
	it("filter", () => {
		const argument = [(value: number, index: number): boolean => value == index] as const
		expect(collection.filter(...argument)).toEqual(backend.filter(...argument))
	})
	it("reduce", () => {
		const argument = [
			(result: number, value: number, index: number, array: readonly number[]): number =>
				result + value + index + array.length,
			0,
		] as const
		expect(collection.reduce(...argument)).toEqual(backend.reduce(...argument))
	})
	it("reduceRight", () => {
		const argument = [
			(result: number, value: number, index: number, array: readonly number[]): number =>
				result + value + index + array.length,
			0,
		] as const
		expect(collection.reduceRight(...argument)).toEqual(backend.reduceRight(...argument))
	})
	it("find", () => {
		const argument = [(value: number, index: number) => value < index] as const
		expect(collection.find(...argument)).toEqual(backend.find(...argument))
	})
	it("findIndex", () => {
		const argument = [(value: number, index: number) => value !== index] as const
		expect(collection.findIndex(...argument)).toEqual(backend.findIndex(...argument))
	})
	it("entries", () => {
		const argument = [] as const
		expect(collection.entries(...argument)).toEqual(backend.entries(...argument))
	})
	it("keys", () => {
		const argument = [] as const
		expect([...collection.keys(...argument)]).toEqual([...backend.keys(...argument)])
	})
	it("values", () => {
		const argument = [] as const
		expect([...collection.values(...argument)]).toEqual([...backend.values(...argument)])
	})
	it("flatMap", () => {
		const argument = [(value: number) => [value]] as const
		expect(collection.flatMap(...argument)).toEqual(backend.flatMap(...argument))
	})
	it("flat", () => {
		const argument = [2] as const
		const backend = [[[1, 2, 3]], [[4, 5, 6]]]
		expect(new Collection(backend).flat(...argument)).toEqual(backend.flat(...argument))
	})
	it("at", () => {
		const argument = [-1] as const
		expect(collection.at(...argument)).toEqual(backend.at(...argument))
	})
	it("findLast", () => {
		const argument = [(value: number, index: number): boolean => value !== index] as const
		expect(collection.findLast(...argument)).toEqual(backend.findLast(...argument))
	})
	it("findLastIndex", () => {
		const argument = [(value: number, index: number): boolean => value !== index] as const
		expect(collection.findLastIndex(...argument)).toEqual(backend.findLastIndex(...argument))
	})
	it("toReversed", () => {
		const argument = [] as const
		expect(collection.toReversed(...argument)).toEqual(backend.toReversed(...argument))
	})
	it("toSorted", () => {
		const argument = [] as const
		expect(collection.toSorted(...argument)).toEqual(backend.toSorted(...argument))
	})
	it("toSpliced", () => {
		const argument = [1] as const
		expect(collection.toSpliced(...argument)).toEqual(backend.toSpliced(...argument))
	})
	it("with", () => {
		const argument = [0, 10] as const
		expect(collection.with(...argument)).toEqual(backend.with(...argument))
	})
	it("toArray", () => {
		const argument = [] as const
		expect(collection.toArray(...argument)).toEqual(backend)
	})
	it("toJson", () => {
		expect(JSON.stringify(collection)).toEqual(JSON.stringify(backend))
	})
})
