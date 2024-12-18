export type TypedlyString = string
export namespace TypedlyString {
	export function capitalize(string: TypedlyString, index = 0): TypedlyString {
		return string.slice(0, index + 1).toLocaleUpperCase() + string.slice(index + 1)
	}
}
