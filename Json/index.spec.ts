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
})
