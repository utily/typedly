import { TypedlyObject } from "../Object"

export type Promise<T, R = any> = globalThis.Promise<T> & { resolve: Promise.Resolve<T>; reject: Promise.Reject<R> }
export namespace Promise {
	export type Resolve<T> = (value: T | globalThis.PromiseLike<T>) => void
	export type Reject<T = any> = (reason: T) => void
	export type Maybe<T> = T | globalThis.Promise<T> | Promise<T>
	export type Lazy<T extends (...argument: any[]) => globalThis.Promise<unknown>> = T & { force: T }
	export type Promisify<T> = { [Key in keyof T]: globalThis.Promise<T[Key]> }
	export function promisify<T>(value: T): Promisify<T> {
		return TypedlyObject.mapValues<T, Promisify<T>>(value, value => globalThis.Promise.resolve(value))
	}
	export function create<T, R = any>(executor?: (resolve: Resolve<T>, reject: Reject<R>) => void): Promise<T> {
		const functions: { resolve: Resolve<T>; reject: Reject } = { resolve: () => {}, reject: () => {} }
		const promise = new globalThis.Promise<T>((resolve, reject) => {
			functions.resolve = resolve
			functions.reject = reject
			executor?.(resolve, reject)
		})
		return Object.assign(promise, functions)
	}
	export function from<T>(promise: PromiseLike<T>): Promise<T, unknown> {
		return Promise.create(async (resolve, reject) => {
			try {
				resolve(await promise)
			} catch (e) {
				reject(e)
			}
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
	export function awaitLatest<T, A extends unknown[]>(
		task: (...argument: A) => globalThis.Promise<T> | Promise<T>
	): (...argument: A) => Promise<T> {
		let latest: globalThis.Promise<T>
		const result = (...argument: A) => {
			latest = task(...argument)
			return Promise.from(
				latest.then(async () => {
					let result: globalThis.Promise<T>
					do {
						await (result = latest)
					} while (result != latest)
					return result
				})
			)
		}
		return result
	}
}
