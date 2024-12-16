import { typedly } from "../index"

describe("typedly.Json.Data", () => {
	it.each([{}, "string", 42, 13.37, true, undefined, null, [42, 2337], { v: 42, t: "text" }])("is %s", data =>
		expect(typedly.Json.Data.is(data)).toEqual(true)
	)
})
