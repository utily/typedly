import { typedly } from "../index"

describe("Vector", () => {
	class Vector<T> implements typedly.Vector<T> {
		constructor(readonly backend: T[]) {}
		get length(): number {
			return this.backend.length
		}
		get(index: number): T | undefined {
			return this.backend[index]
		}
		set(index: number, value: T): boolean {
			if (index < 0 || this.length <= index)
				return false
			this.backend[index] = value
			return true
		}
	}
	it("set", () => {
		const length = 3
		const vector = new Vector<number>(Array.from({ length }))
		expect(vector.set(-1, -1)).toEqual(false)
		expect(Array.from({ length }, (_, index) => vector.set(index, index)).every(status => status)).toEqual(true)
		expect(vector.set(length, length)).toEqual(false)
	})
})
