import { Readonly as StackReadonly } from "./Readonly"

export interface Stack<T> extends Stack.Readonly<T> {
	push(item: T): this
	pop(): T | undefined
	shift(): T | undefined
}
export namespace Stack {
	export import Readonly = StackReadonly
}
