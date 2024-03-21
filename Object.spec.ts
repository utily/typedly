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
	it("DistributiveExclude", () => {
		type Source = {
			foo: string | null
			bar: number | null
			baz: boolean | null
		}
		type Namespace = typedly.DistributiveExclude<Source, "foo" | "bar", null>
		type Global = DistributiveExclude<Source, "foo" | "baz", null>
		const namespace: Namespace = {
			foo: "hello world", // string
			bar: 1, // number
			baz: null, // boolean | null
		}
		const global: Global = {
			foo: "hello world", // string
			bar: null, // number | null
			baz: true, // boolean
		}
		expect(namespace.foo).not.toEqual(null)
		expect(namespace.bar).not.toEqual(null)
		expect(global.foo).not.toEqual(null)
		expect(global.baz).not.toEqual(null)
	})
})
