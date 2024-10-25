export type Promise<T> = globalThis.Promise<T>
export namespace Promise {
	export type Lazy<T extends (...argument: any[]) => Promise<unknown>> = T & { force: T }
	export function lazy<T extends (...argument: any[]) => Promise<unknown>>(
		factory: () => T,
		duplicate?: (...argument: Parameters<T>) => unknown
	): Lazy<T> {
		const tasks = new Map<unknown, T>()
		const ongoing = new Map<unknown, Promise<unknown>>()
		const result = <T>((...argument: Parameters<T>) => {
			let result: Promise<unknown>
			const key = duplicate?.(...argument)
			let task = tasks.get(key)
			if (!task)
				tasks.set(key, (task = factory()))
			const current = ongoing.get(key)
			if (current)
				result = current
			else {
				result = task(...argument)
				ongoing.set(key, result)
				result.then(() => ongoing.delete(key))
			}
			return result
		})
		return Object.assign(result, {
			force: <T>((...argument: Parameters<T>) => {
				ongoing.delete(duplicate?.(...argument))
				return result(...argument)
			}),
		})
	}
	export function awaitLatest<T extends (...argument: any[]) => Promise<unknown>>(task: T): T {
		let latest: Promise<unknown>
		return <T>(async (...argument) => {
			latest = task(...argument)
			return latest.then(async () => {
				let result: Promise<unknown>
				do {
					await (result = latest)
				} while (result != latest)
				return result
			})
		})
	}
}
