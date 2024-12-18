import { isly } from "isly"
import { typedly } from "../index"

describe("typedly.Json", () => {
	interface A {
		x: number
		y: number
	}
	const a: A = {
		x: 42,
		y: 13.37,
	}
	it("stringify", () => expect(typedly.Json.create().stringify({ alpha: 42 })).toMatchInlineSnapshot(`"{"alpha":42}"`))
	it("stringify short", () => expect(typedly.Json.stringify({ alpha: 42 })).toMatchInlineSnapshot(`"{"alpha":42}"`))
	it("stringify pretty", () =>
		expect(typedly.Json.create({ space: "\t" }).stringify({ alpha: 42 })).toMatchInlineSnapshot(`
"{
	"alpha": 42
}"
`))
	it.each([
		[{}, "{}"],
		["", '""'],
		[0, "0"],
		[undefined, undefined],
		[null, "null"],
		[{ 0: false }, '{"0":false}'],
		[false, "false"],
		[{ [Symbol.toStringTag]: "string" }, "{}"],
		[new ArrayBuffer(1024) as any, "{}"],
	])("stringify %s", (data, expected) => expect(typedly.Json.stringify(data)).toEqual(expected))
	it("narrowed type", () => {
		expect(typedly.Json.stringify(a)).toEqual('{"x":42,"y":13.37}')
	})
	it("untyped w/ options", () => {
		const json = typedly.Json.create({ space: "\t" })
		expect(json.stringify(a as any)).toEqual('{\n\t"x": 42,\n\t"y": 13.37\n}')
		expect(json.parse('{"x":42,"y":13.37}')).toEqual(a)
	})
	it("typed w/o options", () => {
		const json = typedly.Json.create(isly.object<A>({ x: isly.number(), y: isly.number() }))
		expect(json.stringify(a)).toEqual('{"x":42,"y":13.37}')
		const newA: A | undefined = json.parse('{"x":42,"y":13.37}')
		expect(newA).toEqual(a)
	})
})
