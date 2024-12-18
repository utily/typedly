import { typedly } from "../index"

describe("String", () => {
	it("capitalize", () => {
		const value: typedly.String = "hello world"
		expect(typedly.String.capitalize(value)).toEqual("Hello world")
	})
})
