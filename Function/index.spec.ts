import "./global"
import { typedly } from "../index"

describe("Function", () => {
	it("Return", () => {
		type Arguments = [() => number]
		type Result<T> = typedly.Function.Return<Arguments[0]> extends T ? true : false
		const match: typedly.Function.Return<Arguments[0]> extends Return<Arguments[0]> ? true : false = true
		const truthy: Result<number> = true
		const falsy: Result<string> = false
		expect(truthy).toEqual(true)
		expect(falsy).toEqual(false)
		expect(match).toEqual(true)
	})
	it("Parameter", () => {
		type Arguments = [(foo: number) => void, 0]
		type Result<T> = typedly.Function.Parameter<Arguments[0], Arguments[1]> extends T ? true : false
		const match: typedly.Function.Parameter<Arguments[0], Arguments[1]> extends Parameter<Arguments[0], Arguments[1]>
			? true
			: false = true
		const truthy: Result<number> = true
		const falsy: Result<string> = false
		expect(truthy).toEqual(true)
		expect(falsy).toEqual(false)
		expect(match).toEqual(true)
	})
	it("ProtectedConstructorParameters (abstract class)", () => {
		abstract class Base {
			constructor(protected foo: string) {}
		}
		class Implementation extends Base {
			constructor(...parameters: typedly.Function.ProtectedConstructorParameters<typeof Base>) {
				super(...parameters)
			}
		}
		const instance = new Implementation("hello")
		expect(instance instanceof Implementation).toEqual(true)
	})
	it("ProtectedConstructorParameters (protected constructor)", () => {
		class Base {
			protected constructor(foo: string) {}
		}
		class Implementation extends Base {
			constructor(...parameters: typedly.Function.ProtectedConstructorParameters<typeof Base>) {
				super(...parameters)
			}
		}
		const instance = new Implementation("hello")
		expect(instance instanceof Implementation).toEqual(true)
	})
})
