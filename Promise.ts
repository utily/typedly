export type Promise<T, R = any> = globalThis.Promise<T> & { resolve: Promise.Resolve<T>; reject: Promise.Reject<R> }
export namespace Promise {
	export type Resolve<T> = (value: T | globalThis.PromiseLike<T>) => void
	export type Reject<T = any> = (reason: T) => void
	export type Maybe<T> = T | globalThis.Promise<T> | Promise<T>
	export type Lazy<T extends (...argument: any[]) => globalThis.Promise<unknown>> = T & { force: T }
	export function create<T, R = any>(executor?: (resolve: Resolve<T>, reject: Reject<R>) => void): Promise<T> {
		const callbacks: { resolve?: Resolve<T>; reject?: Reject } = {}
		const promise = new globalThis.Promise<T>((resolve, reject) => {
			callbacks.resolve = resolve
			callbacks.reject = reject
			executor?.(resolve, reject)
		})
		return Object.assign(promise, {
			resolve: (...parameters: Parameters<Resolve<T>>) => callbacks.resolve?.(...parameters),
			reject: (...parameters: Parameters<Reject>) => callbacks.reject?.(...parameters),
		})
	}
	export function lazy<T extends (...argument: any[]) => globalThis.Promise<unknown>>(
		factory: () => T,
		duplicate?: (...argument: Parameters<T>) => unknown
	): Lazy<T> {
		const tasks = new Map<unknown, T>()
		const ongoing = new Map<unknown, globalThis.Promise<unknown>>()
		const result = <T>((...argument: Parameters<T>) => {
			let result: globalThis.Promise<unknown>
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
	export function awaitLatest<T extends (...argument: any[]) => globalThis.Promise<unknown>>(task: T): T {
		let latest: globalThis.Promise<unknown>
		return <T>(async (...argument) => {
			latest = task(...argument)
			return latest.then(async () => {
				let result: globalThis.Promise<unknown>
				do {
					await (result = latest)
				} while (result != latest)
				return result
			})
		})
	}
}
