import { typedly } from "./index"

describe("IterableWeakSet", () => {
	const runGarbageCollector =
		"gc" in globalThis && typeof (globalThis as any).gc == "function" ? (globalThis as any).gc : undefined
	it("constructor + size", async () => {
		const objects = Array.from({ length: 3 }, (_, index) => ({ index }))
		const set = new typedly.IterableWeakSet(objects)
		expect(set.size).toEqual(3)
	})
	it("add", () => {
		const objects = Array.from({ length: 3 }, (_, index) => ({ index }))
		const set = new typedly.IterableWeakSet()
		objects.forEach(object => set.add(object))
		expect(set.size).toEqual(3)
	})
	it("has", () => {
		const objects = Array.from({ length: 3 }, (_, index) => ({ index }))
		const set = new typedly.IterableWeakSet(objects)
		expect(objects.every(object => set.has(object))).toEqual(true)
	})
	it("delete", () => {
		const objects = Array.from({ length: 3 }, (_, index) => ({ index }))
		const set = new typedly.IterableWeakSet(objects)
		expect(objects.every(object => set.delete(object))).toEqual(true)
		expect(set.size).toEqual(0)
	})
	it("entries", () => {
		const objects = Array.from({ length: 3 }, (_, index) => ({ index }))
		const set = new typedly.IterableWeakSet(objects)
		const setEntries = [...set.entries()]
		expect(setEntries.length).toEqual(3)
		expect(new Set(setEntries)).toEqual(new Set(set))
		expect(setEntries.every(([key, value]) => key == value && objects.includes(key)))
	})
	it("GC", async () => {
		if (runGarbageCollector) {
			const set = new typedly.IterableWeakSet()
			const objects = Array.from({ length: 3 }, (_, index) => ({ index }))
			objects.forEach(object => set.add(object))
			expect(set.size).toEqual(3)
			runGarbageCollector()
			await new Promise(resolve => setTimeout(resolve, 0))
			expect(set.size).toEqual(3)
			objects.splice(0, objects.length)
			runGarbageCollector()
			await new Promise(resolve => setTimeout(resolve, 0))
			expect(set.size).toEqual(0)
		}
	})
})
