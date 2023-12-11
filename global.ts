/**
 * make sure to export new types in this file and./typely.ts
 */
import { DistributiveOmit as GlobalDistributiveOmit } from "./DistributiveOmit"
declare global {
	type DistributiveOmit<T, K extends keyof any> = GlobalDistributiveOmit<T, K>
}
export {}
