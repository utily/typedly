export type Guard<T> = (value: T | unknown) => value is T
export namespace Guard {
	export function not<T>(guard: Guard<T>): (value: T | unknown) => value is unknown {
		return (value: T | unknown): value is unknown => !guard(value)
	}
	export function intersection<A, B>(guardA: Guard<A>, guardB: Guard<B>): (value: (A & B) | unknown) => value is A & B {
		return (value: (A & B) | unknown): value is A & B => guardA(value) && guardB(value)
	}
	export function union<A, B>(guardA: Guard<A>, guardB: Guard<B>): (value: (A | B) | unknown) => value is A | B {
		return (value: (A | B) | unknown): value is A | B => guardA(value) || guardB(value)
	}
	export function exclude<A, B>(
		guardA: Guard<A>,
		guardB: Guard<B>
	): (value: Exclude<A, B> | unknown) => value is Exclude<A, B> {
		return (value: Exclude<A, B> | unknown): value is Exclude<A, B> => guardA(value) && !guardB(value)
	}
}
