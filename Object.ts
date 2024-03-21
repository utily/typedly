export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
export type DistributiveExclude<T, K extends keyof T, E> = {
	[key in keyof T]: key extends K ? Exclude<T[key], E> : T[key]
}
