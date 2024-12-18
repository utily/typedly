import { isly } from "isly"

export type Data<T = Record<string, never>> = boolean | string | number | null | undefined | Data.Object<T> | Data.Array
export namespace Data {
	export const type: isly.Type<Data> = isly.lazy(() =>
		isly.named<Data>(
			"typedly.Json.Data",
			isly.union<Data>(
				isly.boolean(),
				isly.string(),
				isly.number(),
				isly.fromIs<null>("null", (value: null | unknown): value is null => value === null), // TODO: add null to isly
				isly.undefined(),
				Data.Object.type,
				Data.Array.type
			)
		)
	)
	export const is = type.is
	export const flaw = type.flaw

	export type Object<T = Record<string, never>> = {
		[property in keyof T]: Data
	}
	export namespace Object {
		export const type = isly.named<Object>("typedly.Json.Data.Object", isly.record<Object>(isly.string(), Data.type))
		export const is = type.is
		export const flaw = type.flaw
	}
	export type Array = Data[]
	export namespace Array {
		export const type = isly.named<Array>("typedly.Json.Data.Array", isly.array<Array>(Data.type))
		export const is = type.is
		export const flaw = type.flaw
	}
}
