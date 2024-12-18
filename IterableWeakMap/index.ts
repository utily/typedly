// https://github.com/tc39/proposal-weakrefs?tab=readme-ov-file#iterable-weakmaps
export class IterableWeakMap<TKey extends WeakKey, TValue> {
	#backend = new WeakMap<TKey, { value: TValue; reference: WeakRef<TKey> }>()
	#set = new Set<WeakRef<TKey>>()
	#finalization = new FinalizationRegistry(
		({ set, reference }: { set: Set<WeakRef<WeakKey>>; reference: WeakRef<WeakKey> }) => set.delete(reference)
	)

	get size(): number {
		return this.#set.size
	}

	constructor(iterable?: Iterable<[TKey, TValue]>) {
		if (iterable)
			for (const [key, value] of iterable)
				this.set(key, value)
	}

	set(key: TKey, value: TValue): this {
		const reference = new WeakRef(key)
		this.#backend.set(key, { value, reference })
		this.#set.add(reference)
		this.#finalization.register(key, { set: this.#set, reference }, reference)
		return this
	}

	get(key: TKey): TValue | undefined {
		const entry = this.#backend.get(key)
		return entry && entry.value
	}
	has(key: TKey): boolean {
		return this.#backend.get(key) !== undefined
	}

	delete(key: TKey) {
		const entry = this.#backend.get(key)
		if (!entry)
			return false
		this.#backend.delete(key)
		this.#set.delete(entry.reference)
		this.#finalization.unregister(entry.reference)
		return true
	}

	forEach(callback: (value: TValue, key: TKey) => void) {
		for (const [key, value] of this)
			callback(value, key)
	}

	*[Symbol.iterator](): Generator<[TKey, TValue], void> {
		for (const ref of this.#set) {
			const key = ref.deref()
			if (!key)
				continue
			const stored = this.#backend.get(key)
			if (stored)
				yield [key, stored.value]
		}
	}

	entries(): Generator<[TKey, TValue], void> {
		return this[Symbol.iterator]()
	}

	*keys(): Generator<TKey, void> {
		for (const [key] of this)
			yield key
	}

	*values(): Generator<TValue, void> {
		for (const [, value] of this)
			yield value
	}
}
export namespace IterableWeakMap {}
