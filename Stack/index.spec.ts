import { typedly } from "../index"

describe("Stack", () => {
	class Stack<T> implements typedly.Stack<T> {
		get size(): number {
			return this.backend.length
		}
		constructor(readonly backend: T[]) {}
		push(item: T): this {
			this.backend.push(item)
			return this
		}
		pop(): T | undefined {
			return this.backend.pop()
		}
		shift(): T | undefined {
			return this.backend.shift()
		}
		peek(): T | undefined {
			return this.backend.at(-1)
		}
	}
	it("push", () => {
		const stack = new Stack([0, 1, 2])
		const next = stack.peek()
		const pushed = stack.size
		stack.push(pushed)
		expect(next).toEqual(2)
		expect(next).not.toEqual(stack.peek())
		expect(stack.peek()).toEqual(pushed)
	})
	it("pop", () => {
		const stack = new Stack([0, 1, 2])
		const next = stack.peek()
		const popped = stack.pop()
		expect(next).toEqual(popped)
		expect(next).not.toEqual(stack.peek())
		expect(stack.peek()).toEqual(1)
	})
	it("shift", () => {
		const stack = new Stack([0, 1, 2])
		const startSize = stack.size
		const next = stack.peek()
		const shifted = stack.shift()
		expect(next).toEqual(stack.peek())
		expect(shifted).toEqual(0)
		expect(stack.size).toEqual(startSize - 1)
	})
})
