import { TypedlyArray as typedlyArray } from "./Array"
import { Collection as typedlyCollection } from "./Collection"
import { Function as typedlyFunction } from "./Function"
import { IterableWeakMap as typedlyIterableWeakMap } from "./IterableWeakMap"
import { IterableWeakSet as typedlyIterableWeakSet } from "./IterableWeakSet"
import { Json as typedlyJson } from "./Json"
import { TypedlyObject as typedlyObject } from "./Object"
import { Promise as typedlyPromise } from "./Promise"
import { Stack as typedlyStack } from "./Stack"
import { TypedlyString as typedlyString } from "./String"
import { Undefined as typedlyUndefined } from "./Undefined"
import { Vector as typedlyVector } from "./Vector"

export namespace typedly {
	export import Array = typedlyArray
	export import Collection = typedlyCollection
	export import Function = typedlyFunction
	export import IterableWeakMap = typedlyIterableWeakMap
	export import IterableWeakSet = typedlyIterableWeakSet
	export import Json = typedlyJson
	export import Object = typedlyObject
	export import Stack = typedlyStack
	export import String = typedlyString
	export import Vector = typedlyVector
	export import Undefined = typedlyUndefined
	export import Promise = typedlyPromise
}
