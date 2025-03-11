import { typedly } from "../index"

describe("typedly.Inverse", () => {
	it("exclude %s", () => {
		const value: any = "a"
		function is(value: string | unknown): value is typedly.Inverse<string> {
			return typeof value != "string"
		}
		if (is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const a = value
		}
	})
})
