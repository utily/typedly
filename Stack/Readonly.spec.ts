import { typedly } from "../index"

describe("Stack.Readonly", () => {
	class Stack<T> implements typedly.Stack.Readonly<T> {
		get size(): number {
			return this.backend.length
		}
		constructor(readonly backend: T[]) {}
		peek(): T | undefined {
			return this.backend.at(-1)
		}
	}
	it("size", () => {
		const stack = new Stack([1, 2, 3])
		const empty = new Stack([])
		expect(stack.size).toEqual(3)
		expect(empty.size).toEqual(0)
	})
	it("peek", () => {
		const stack = new Stack([1, 2, 3])
		const empty = new Stack([])
		expect(stack.peek()).toEqual(1)
		expect(empty.peek()).toEqual(undefined)
	})
})
