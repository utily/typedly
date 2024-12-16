import { typedly } from "./index"

describe("Array", () => {
	it("Union", () => {
		type UnionArray = typedly.Array.UnionValues<"foo1" | "bar1" | "baz1">
		const array: UnionArray = ["foo1", "bar1", "baz1"]
		expect(array).toEqual(["foo1", "bar1", "baz1"])
	})
	it("OmitFirst", () => {
		const array = [1, 2, 3] as const
		const result: typedly.Array.OmitFirst<typeof array> = [2, 3]
		expect(result).toEqual(array.slice(1))
	})
})
