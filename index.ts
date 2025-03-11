import { TypedlyArray as _Array } from "./Array"
import { Collection as _Collection } from "./Collection"
import { Function as _Function } from "./Function"
import { Guard as _Guard } from "./Guard"
import { Inverse as _Inverse } from "./Inverse"
import { IterableWeakMap as _IterableWeakMap } from "./IterableWeakMap"
import { IterableWeakSet as _IterableWeakSet } from "./IterableWeakSet"
import { Json as _Json } from "./Json"
import { TypedlyObject as _Object } from "./Object"
import { Promise as _Promise } from "./Promise"
import { Stack as _Stack } from "./Stack"
import { TypedlyString as _String } from "./String"
import { Undefined as _Undefined } from "./Undefined"
import { Vector as _Vector } from "./Vector"

export namespace typedly {
	export import Array = _Array
	export import Collection = _Collection
	export import Function = _Function
	export import Type = _Guard
	export import Inverse = _Inverse
	export import IterableWeakMap = _IterableWeakMap
	export import IterableWeakSet = _IterableWeakSet
	export import Json = _Json
	export import Object = _Object
	export import Stack = _Stack
	export import String = _String
	export import Vector = _Vector
	export import Undefined = _Undefined
	export import Promise = _Promise
}
