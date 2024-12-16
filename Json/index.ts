import { isly } from "isly"
import { Data as JsonData } from "./Data"

export class Json<T extends Json.Data = Json.Data> {
	constructor(public options: Json.Options<T> = { type: Json.Data.type as isly.Type<T> }) {}
	parse(data: string): T | undefined {
		let result: unknown | undefined
		try {
			result = JSON.parse(data)
		} catch {
			result = undefined
		}
		return (this.options.type ?? isly.any()).get(result)
	}
	stringify(data: T): string {
		return JSON.stringify(data, this.options?.replacer, this.options?.space)
	}
	static #default: Json | undefined
	static parse<T extends Json.Data = Json.Data>(data: string): T | undefined {
		return (Json.#default ??= new Json()).parse(data) as T
	}
	static stringify<T extends Json.Data = Json.Data>(data: T): string {
		return (Json.#default ??= new Json()).stringify(data)
	}
}
export namespace Json {
	export import Data = JsonData
	export interface Options<T extends Json.Data = JsonData> {
		type?: isly.Type<T>
		replacer?: (this: any, key: string, value: any) => any
		space?: string | number
	}
}
