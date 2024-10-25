import { typedly } from "../index"

describe("Vector.Readonly", () => {
	class Vector<T> implements typedly.Vector.Readonly<T> {
		constructor(readonly backend: T[]) {}
		get length(): number {
			return this.backend.length
		}
		get(index: number): T | undefined {
			return this.backend.at(index)
		}
	}
	it("size", () => {
		const vector = new Vector([1, 2, 3])
		expect(vector.length).toEqual(3)
		for (let index = 0; index < vector.length; index++)
			expect(vector.get(index)).toEqual(index + 1)
	})
	it("get", () => {
		const vector = new Vector([1, 2, 3])
		for (let index = 0; index < vector.length; index++)
			expect(vector.get(index)).toEqual(index + 1)
	})
})
