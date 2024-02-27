import "./global"
import { typedly } from "./index"

describe("Function", () => {
	it("Return", () => {
		function work(): number {
			const namespace: typedly.Return<typeof work> = 1
			const global: Return<typeof work> = 1
			return namespace + global
		}
		expect(work()).toEqual(2)
	})
	it("Parameter", () => {
		function foo(_: string, __: number): boolean {
			return true
		}
		function bar(a: typedly.Parameter<typeof foo, 0>, b: Parameter<typeof foo, 1>): string {
			return a + b.toString(10)
		}
		expect(bar("a", 1)).toEqual("a1")
	})
	it("ProtectedConstructorParameters (abstract class)", () => {
		abstract class Base {
			constructor(protected foo: string) {}
		}
		class Implementation extends Base {
			constructor(...parameters: typedly.ProtectedConstructorParameters<typeof Base>) {
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
			constructor(...parameters: ProtectedConstructorParameters<typeof Base>) {
				super(...parameters)
			}
		}
		const instance = new Implementation("hello")
		expect(instance instanceof Implementation).toEqual(true)
	})
})
