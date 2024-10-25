import { Readonly as VectorReadonly } from "./Readonly"

export interface Vector<T> extends Vector.Readonly<T> {
	set(index: number, value: T): boolean
}

export namespace Vector {
	export import Readonly = VectorReadonly
}
