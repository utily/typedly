/**
 * make sure to export new types in this file and ./typedly.ts
 */
import * as Function from "./Function"
import * as Object from "./Object"

declare global {
	type DistributiveOmit<T, K extends keyof any> = Object.DistributiveOmit<T, K>
	type DistributiveExclude<T, K extends keyof T, E> = Object.DistributiveExclude<T, K, E>
	type Return<T extends (...parameters: any[]) => any> = Function.Return<T>
	type Parameter<T extends (...parameters: any[]) => any, N extends number> = Function.Parameter<T, N>
	type ProtectedConstructorParameters<T> = Function.ProtectedConstructorParameters<T>
}
