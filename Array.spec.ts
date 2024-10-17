import { typedly } from "./index"

describe("Array", () => {
	it("Union", () => {
		type UnionArray = typedly.Array.Union<"foo" | "bar" | "baz">
		const array: UnionArray = ["foo", "bar", "baz"]
		expect(array).toEqual(["foo", "bar", "baz"])
	})
	it("OmitFirst", () => {
		const array = [1, 2, 3] as const
		const result: typedly.Array.OmitFirst<typeof array> = [2, 3]
		expect(result).toEqual(array.slice(1))
	})
})
