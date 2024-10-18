export class IterableWeakSet<T extends WeakKey = any> {
	#weakMap = new WeakMap<T, { reference: WeakRef<T> }>()
	#set = new Set<WeakRef<T>>()
	#finalization = new FinalizationRegistry(
		({ set, reference }: { set: Set<WeakRef<WeakKey>>; reference: WeakRef<WeakKey> }) => set.delete(reference)
	)

	get size(): number {
		return this.#set.size
	}

	constructor(iterable?: Iterable<T>) {
		if (iterable)
			for (const value of iterable)
				this.add(value)
	}

	add(value: T): this {
		const reference = new WeakRef(value)
		this.#weakMap.set(value, { reference })
		this.#set.add(reference)
		this.#finalization.register(value, { set: this.#set, reference }, reference)
		return this
	}

	has(value: T): boolean {
		const entry = this.#weakMap.get(value)
		return entry != undefined
	}

	delete(value: T): boolean {
		const entry = this.#weakMap.get(value)
		if (!entry)
			return false
		this.#weakMap.delete(value)
		this.#set.delete(entry.reference)
		this.#finalization.unregister(entry.reference)
		return true
	}

	forEach(callback: (value: T) => void) {
		for (const [value] of this)
			callback(value)
	}

	*[Symbol.iterator](): Generator<[T, T], void> {
		for (const reference of this.#set) {
			const value = reference.deref()
			if (!value)
				continue
			const stored = this.#weakMap.get(value)
			if (stored)
				yield [value, value]
		}
	}

	entries(): Generator<[T, T], void> {
		return this[Symbol.iterator]()
	}

	*values(): Generator<T, void> {
		for (const [value] of this)
			yield value
	}
}
export namespace IterableWeakSet {}
