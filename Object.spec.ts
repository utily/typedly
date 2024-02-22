import { typely } from "./index"

describe("Object", () => {
	it("DistributiveOmit", () => {
		type A = { a: string; common: number }
		type B = { b: boolean; common: number }
		type Union = A | B
		type CommonOmitted = typely.DistributiveOmit<Union, "common">

		const result: CommonOmitted = {
			a: "hello world",
		}
		expect(result.a).toEqual("hello world")
	})
})
