import { typedly } from "./index"

describe("typedly.Undefined", () => {
	it("not", () => {
		expect(typedly.Undefined.not(42)).toEqual(true)
	})
})
