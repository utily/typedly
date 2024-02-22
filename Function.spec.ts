import { typedly } from "./index"

describe("Function", () => {
	it("Return", () => {
		function work(): number {
			const result: typedly.Return<typeof work> = 1
			return result
		}
		expect(work()).toEqual(1)
	})
	it("Parameter", () => {
		function foo(_: string, __: number): boolean {
			return true
		}
		function bar(a: typedly.Parameter<typeof foo, 0>, b: typedly.Parameter<typeof foo, 1>): string {
			return a + b.toString(10)
		}
		expect(bar("a", 1)).toEqual("a1")
	})
})
