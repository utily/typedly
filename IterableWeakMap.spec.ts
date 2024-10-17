import { typedly } from "./index"

describe("IterableWeakMap", () => {
	const runGarbageCollector =
		"gc" in globalThis && typeof (globalThis as any).gc == "function" ? (globalThis as any).gc : undefined
	it("constructor + size", async () => {
		const entries = Array.from({ length: 3 }, (_, index): [{ index: number }, number] => [{ index }, index])
		const map = new typedly.IterableWeakMap(entries)
		expect(map.size).toEqual(3)
	})
	it("add", () => {
		const entries = Array.from({ length: 3 }, (_, index): [{ index: number }, number] => [{ index }, index])
		const map = new typedly.IterableWeakMap()
		entries.forEach(([key, value]) => map.set(key, value))
		expect(map.size).toEqual(3)
	})
	it("has", () => {
		const entries = Array.from({ length: 3 }, (_, index): [{ index: number }, number] => [{ index }, index])
		const map = new typedly.IterableWeakMap(entries)
		expect(map.size).toEqual(3)
		expect(entries.every(([key]) => map.has(key))).toEqual(true)
	})
	it("get", () => {
		const entries = Array.from({ length: 3 }, (_, index): [{ index: number }, number] => [{ index }, index])
		const map = new typedly.IterableWeakMap(entries)
		entries.forEach(([key, value]) => expect(map.get(key)).toEqual(value))
	})
	it("delete", () => {
		const entries = Array.from({ length: 3 }, (_, index): [{ index: number }, number] => [{ index }, index])
		const map = new typedly.IterableWeakMap(entries)
		expect(entries.every(([key]) => map.delete(key))).toEqual(true)
		expect(map.size).toEqual(0)
	})
	it("entries", () => {
		const entries = Array.from({ length: 3 }, (_, index): [{ index: number }, number] => [{ index }, index])
		const map = new typedly.IterableWeakMap(entries)
		const mapEntries = [...map.entries()]
		expect(mapEntries.length).toEqual(3)
		expect(new Set(mapEntries)).toEqual(new Set(map))
		expect(mapEntries.every(([key]) => entries.find(([object]) => key == object)))
	})

	it("GC", async () => {
		if (runGarbageCollector) {
			const set = new typedly.IterableWeakMap()
			const objects = Array.from({ length: 3 }, (_, index) => ({ index }))
			objects.forEach(object => set.set(object, object.index))
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
