import { typedly } from "./index"

describe("Object", () => {
	it("DistributiveOmit", () => {
		type A = { a: string; common: number }
		type B = { b: boolean; common: number }
		type Union = A | B
		type CommonOmitted = typedly.Object.DistributiveOmit<Union, "common">
		const result: CommonOmitted = {
			a: "hello world",
		}
		expect(`${result.a}`).toEqual("hello world")
	})
	it("DistributiveExclude", () => {
		type Source = {
			foo: string | null
			bar: number | null
			baz: boolean | null
		}
		type Result = typedly.Object.DistributiveExclude<Source, "foo" | "bar", null>
		const result: Result = {
			foo: "hello world", // string
			bar: 1, // number
			baz: null, // boolean | null
		}
		expect(result.foo).not.toEqual(null)
		expect(result.bar).not.toEqual(null)
	})
	it("DotNotation", () => {
		type Source = {
			value: 0
			foo: {
				value: 1
				bar: {
					value: 2
					baz: {
						value: 3
					}
				}
			}
		}
		const paths: typedly.Object.DotNotation<Source>[] = [
			"value",
			"foo",
			"foo.value",
			"foo.bar",
			"foo.bar.value",
			"foo.bar.baz",
			"foo.bar.baz.value",
		]
		expect(paths.length).toEqual(7)
	})
	it("KeyOf", () => {
		const source = { foo: "text", bar: 1, baz: true } as const
		type Result = typedly.Object.KeyOf<typeof source>
		const keys: typedly.Array.UnionValues<Result> = ["foo", "bar", "baz"]
		expect(keys.every(key => key in source)).toEqual(true)
	})
	it("ValueOf", () => {
		const source = { foo: "text", bar: 1, baz: true } as const
		type Result = typedly.Object.ValueOf<typeof source>
		const values: typedly.Array.UnionValues<Result> = [true, 1, "text"]
		expect(Object.values(source).every(value => values.includes(value))).toEqual(true)
	})
	it("Writeable", () => {
		const readonly: Readonly<Record<"foo", number>> = { foo: 123 }
		const writeable: typedly.Object.Writeable<typeof readonly> = readonly
		expect((writeable.foo = 456)).toEqual(456)
	})
	it("RemoveMethods", () => {
		const source = { foo: "text", bar() {}, baz: () => {} }
		type Result = typedly.Object.RemoveMethods<typeof source>
		const value: Result = { foo: "text" }
		expect(source).toMatchObject(value)
	})
	it("reduce", () => {
		const source = { foo: "text", bar: 1, baz: true }
		const result = typedly.Object.reduce(source, (result, [key, value]) => ({ ...result, [key]: value }), {})
		expect(result).toEqual(source)
	})
	it("entries", () => {
		const source = { foo: "text", bar: 1, baz: true }
		expect(typedly.Object.entries(source)).toEqual([
			["foo", "text"],
			["bar", 1],
			["baz", true],
		])
	})
	it("keys", () => {
		const source = { foo: "text", bar: 1, baz: true }
		const result: typedly.Object.KeyOf<typeof source>[] = typedly.Object.keys(source)
		expect(result).toEqual(["foo", "bar", "baz"])
	})
	it("values", () => {
		const source = { foo: "text", bar: 1, baz: true }
		const result: typedly.Object.ValueOf<typeof source>[] = typedly.Object.values(source)
		expect(result).toEqual(["text", 1, true])
	})
	it("filter", () => {
		const source = { foo: "text", bar: 1, baz: true }
		const result = typedly.Object.filter(source, (value, key) => typeof value == "string" && typeof value == "string")
		expect(result).toEqual({ foo: "text" })
	})
	it("map", () => {
		const source = { foo: "text", bar: 0, baz: true }
		const result = typedly.Object.map<typeof source, Record<string, boolean>>(source, ([key, value]) => [key, !!value])
		expect(result).toEqual({ foo: true, bar: false, baz: true })
	})
	it("mapValues", () => {
		const source = { foo: "text", bar: 0, baz: true }
		const result = typedly.Object.mapValues<typeof source, Record<string, boolean>>(source, value => Boolean(value))
		expect(result).toEqual({ foo: true, bar: false, baz: true })
	})
})
