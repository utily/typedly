/**
 * make sure to export new types in this file and./typely.ts
 */
import * as Function from "./Function"
import * as Object from "./Object"

declare global {
	type DistributiveOmit<T, K extends keyof any> = Object.DistributiveOmit<T, K>
	type Return<T extends (parameters: unknown[]) => unknown> = Function.Return<T>
	type Parameter<T extends (...parameters: unknown[]) => unknown, N extends number> = Function.Parameter<T, N>
}
