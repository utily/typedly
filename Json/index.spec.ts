import { typedly } from "../index"

describe("typedly.Json", () => {
	it("stringify", () => expect(new typedly.Json().stringify({ alpha: 42 })).toMatchInlineSnapshot(`"{"alpha":42}"`))
	it("stringify short", () => expect(typedly.Json.stringify({ alpha: 42 })).toMatchInlineSnapshot(`"{"alpha":42}"`))
	it("stringify pretty", () =>
		expect(new typedly.Json({ space: "\t" }).stringify({ alpha: 42 })).toMatchInlineSnapshot(`
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
	it("testing type", () => {
		interface A {
			x: number
			y: number
		}
		const a: A = {
			x: 42,
			y: 13.37,
		}
		expect(typedly.Json.stringify(a)).toEqual('{"x":42,"y":13.37}')
	})
})
