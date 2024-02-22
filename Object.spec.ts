import { typedly } from "./index"

describe("Object", () => {
	it("DistributiveOmit", () => {
		type A = { a: string; common: number }
		type B = { b: boolean; common: number }
		type Union = A | B
		type CommonOmitted = typedly.DistributiveOmit<Union, "common">

		const result: CommonOmitted = {
			a: "hello world",
		}
		expect(result.a).toEqual("hello world")
	})
})
