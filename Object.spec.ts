import "./global"
import { typedly } from "./index"

describe("Object", () => {
	it("DistributiveOmit", () => {
		type A = { a: string; common: number }
		type B = { b: boolean; common: number }
		type Union = A | B
		type CommonOmittedNamespace = typedly.DistributiveOmit<Union, "common">
		type CommonOmittedGlobal = DistributiveOmit<Union, "common">

		const namespace: CommonOmittedNamespace = {
			a: "hello",
		}
		const global: CommonOmittedGlobal = {
			a: "world",
		}
		expect(`${namespace.a} ${global.a}`).toEqual("hello world")
	})
})
