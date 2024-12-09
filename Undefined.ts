export namespace Undefined {
	export function not<T>(value: T | undefined): value is T {
		return value !== undefined
	}
}
