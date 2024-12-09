import { typedly } from "./index"

describe("Promise", () => {
	async function work<T>(value: T): Promise<T> {
		await new Promise(resolve => setTimeout(resolve, 0))
		return value
	}
	it("Promise.Maybe<T>", async () => {
		const values: typedly.Promise.Maybe<number>[] = [new Promise(r => r(1)), 1]
		return expect((await Promise.all(values)).every(value => value == 1)).toEqual(true)
	})
	it("Promise.lazy(), Max one work call", async () => {
		let result: number
		let calls = 0
		const wrapper = (value: number) => work((calls++, value))
		const processed = typedly.Promise.lazy(() => wrapper)
		// only call of process can work at the time so second call will resolve to the result of the first one.
		// expecting result of first call * number of calls
		result = (await Promise.all([processed(1), processed(2)])).reduce((result, number) => result + number, 0)
		expect(calls).toEqual(1)
		expect(result).toEqual(2)
		result = (await Promise.all([processed(1), processed(2)])).reduce((result, number) => result + number, 0)
		expect(calls).toEqual(2)
		expect(result).toEqual(2)
		// forcing second process call to go through even if first call did not finish.
		// expecting sum of both calls result.
		result = (await Promise.all([processed(1), processed.force(2)])).reduce((result, number) => result + number, 0)
		expect(calls).toEqual(4)
		expect(result).toEqual(3)
	})
	it("Promise.lazy(), Max one call per key", async () => {
		let result: number
		const calls = { id1: 0, id2: 0 }
		const wrapper = (value: number, identifier: keyof typeof calls) => work((calls[identifier]++, value))
		const processed = typedly.Promise.lazy(
			() => wrapper,
			(_, identifier) => identifier
		)
		result = (await Promise.all([processed(1, "id1"), processed(1, "id1"), processed(3, "id2")])).reduce(
			(result, number) => result + number,
			0
		)
		expect(calls.id1).toEqual(1)
		expect(calls.id2).toEqual(1)
		expect(result).toEqual(5)
		result = (await Promise.all([processed(1, "id1"), processed(1, "id1"), processed(3, "id2")])).reduce(
			(result, number) => result + number,
			0
		)
		expect(calls.id1).toEqual(2)
		expect(calls.id2).toEqual(2)
		expect(result).toEqual(5)
	})
	it("awaitLatest", async () => {
		let result: number
		const processed = typedly.Promise.awaitLatest(work)
		result = (await Promise.all([processed(2), processed(3), processed(5)])).reduce(
			(result, number) => result + number,
			0
		)
		// older versions of calls to `processed()` will only resolved if it finishes before another call to `processed()` starts.
		// if more calls occurs before it finishes it will await result from the latest call.
		// expecting 3 * value of last call
		expect(result).toEqual(15)
		result = (await Promise.all([processed(5), processed(3), processed(2)])).reduce(
			(result, number) => result + number,
			0
		)
		expect(result).toEqual(6)
	})
	it("awaitLatest + lazy", async () => {
		let result: number
		const calls = { id1: 0, id2: 0 }
		const wrapper = (value: number, identifier: keyof typeof calls) => work((calls[identifier]++, value))
		const processed = typedly.Promise.lazy(
			() => typedly.Promise.awaitLatest(wrapper),
			(_, identifier) => identifier
		)
		result = (await Promise.all([processed(1, "id1"), processed(2, "id1"), processed(3, "id2")])).reduce(
			(result, number) => result + number,
			0
		)
		expect(calls.id1).toEqual(1)
		expect(calls.id2).toEqual(1)
		expect(result).toEqual(5)
		result = (await Promise.all([processed(1, "id1"), processed(2, "id1"), processed(3, "id2")])).reduce(
			(result, number) => result + number,
			0
		)
		expect(calls.id1).toEqual(2)
		expect(calls.id2).toEqual(2)
		expect(result).toEqual(5)
		// forcing second call of id1 to take precedence over call to id1.
		// id1 will resolve to result of id2 unless it already resolved.
		result = (await Promise.all([processed(1, "id1"), processed.force(2, "id1"), processed(3, "id2")])).reduce(
			(result, number) => result + number,
			0
		)
		// expecting 3 from id2 call and 2 * 2 from id1 call since second one was forced
		expect(calls.id1).toEqual(4)
		expect(calls.id2).toEqual(3)
		expect(result).toEqual(7)
	})
})
