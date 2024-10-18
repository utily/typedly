export interface Readonly<T> {
	readonly length: number
	get(index: number): T | undefined
}
export namespace Readonly {}
