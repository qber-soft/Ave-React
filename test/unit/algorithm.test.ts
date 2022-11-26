import { diffProps } from "../../draft/ave-react/components/common/algorithm";

describe("algorithm", () => {
	describe("diff props", () => {
		test("input edge cases", () => {
			{
				const updatePayload = diffProps(undefined, undefined);
				expect(updatePayload).toEqual([]);
			}
			{
				const updatePayload = diffProps(null, null);
				expect(updatePayload).toEqual([]);
			}
			{
				const updatePayload = diffProps([], null);
				expect(updatePayload).toEqual([]);
			}
		});

		test("update text", () => {
			{
				const updatePayload = diffProps({}, { text: "button" });
				expect(updatePayload).toEqual(["text", "button"]);
			}

			{
				const updatePayload = diffProps({ text: "button" }, { text: "button" });
				expect(updatePayload).toEqual([]);
			}

			{
				const updatePayload = diffProps({ text: "button" }, { text: "button-update" });
				expect(updatePayload).toEqual(["text", "button-update"]);
			}

			{
				const updatePayload = diffProps({ text: "button" }, {});
				expect(updatePayload).toEqual(["text", null]);
			}

			{
				const updatePayload = diffProps({ text: "button" }, null);
				expect(updatePayload).toEqual(["text", null]);
			}
		});
	});
});
