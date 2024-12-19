import { typedly } from "../index"

describe("typedly.Guard", () => {
	type Falsy = false | 0 | "" | [] | [0] | null | undefined
	const is = {
		boolean: (value: boolean | unknown): value is boolean => typeof value == "boolean",
		string: (value: string | unknown): value is string => typeof value == "string",
		number: (value: number | unknown): value is number => typeof value == "number",
		array: (value: number[] | unknown): value is number[] => Array.isArray(value) && value.every(is.number),
		undefined: (value: undefined | unknown): value is undefined => typeof value == "undefined",
		null: (value: null | unknown): value is null => value === null,
		falsy: (value: Falsy | unknown): value is Falsy => !value,
		emptyString: (value: "" | unknown): value is "" => value === "",
	}
	const values = [true, false, "a", "", 42, 13.37, [1, 3, 3, 7], [], 0, undefined, null]
	it.each([
		["boolean", is.boolean],
		["string", is.string],
		["number", is.number],
		["array", is.array],
		["undefined", is.undefined],
		["null", is.null],
		["falsy", is.falsy],
	])("not %s", (name, is) => {
		expect(values.filter(typedly.Type.not(is as any))).toMatchSnapshot()
		expect(values.filter(v => !is(v)).every(typedly.Type.not(is as any))).toEqual(true)
	})
	it.each([
		["boolean | string", is.boolean, is.string],
		["number | array", is.number, is.array],
		["undefined | null", is.undefined, is.null],
	])("union %s", (name, isA, isB) => {
		expect(values.filter(typedly.Type.union(isA as any, isB as any))).toMatchSnapshot()
		expect(values.filter(v => isA(v) || isB(v)).every(typedly.Type.union(isA as any, isB as any))).toEqual(true)
	})
	it.each([
		["boolean & true", is.boolean, (v: true | unknown): v is true => v === true],
		["falsy & number", is.falsy, is.number],
		['string & ""', is.string, is.emptyString],
	])("intersection %s", (name, isA, isB) => {
		expect(values.filter(typedly.Type.intersection(isA as any, isB as any))).toMatchSnapshot()
		expect(values.filter(v => isA(v) && isB(v)).every(typedly.Type.intersection(isA as any, isB as any))).toEqual(true)
	})
	it.each([['Exclude<string, "">', is.string, is.emptyString]])("exclude %s", (name, isA, isB) => {
		expect(values.filter(typedly.Type.exclude(isA as any, isB as any))).toMatchSnapshot()
		expect(values.filter(v => isA(v) && !isB(v)).every(typedly.Type.exclude(isA as any, isB as any))).toEqual(true)
	})
})
