export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
export type Temp = {
	foo: number | boolean
	bar: string | boolean
}
export type DistributiveExclude<T, K extends keyof T, E> = {
	[key in keyof T]: key extends K ? Exclude<Pick<T, K>[key], E> : T[key]
}
