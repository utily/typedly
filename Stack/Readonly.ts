export interface Readonly<T> {
	readonly size: number
	peek(): T | undefined
}
export namespace Readonly {}
