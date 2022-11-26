import { ButtonStyle } from "ave-ui";
import { IButtonComponentProps } from "../../draft/ave-react/components";
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

		test("update object", () => {
			{
				const updatePayload = diffProps({}, { option: { key: 1, text: "react" } });
				expect(updatePayload).toEqual(["option", { key: 1, text: "react" }]);
			}

			{
				const updatePayload = diffProps({ option: { key: 1, text: "react" } }, { option: { key: 1, text: "react" } });
				expect(updatePayload).toEqual(["option", { key: 1, text: "react" }]);
			}

			{
				const prop = { option: { key: 1, text: "react" } };
				const updatePayload = diffProps(prop, prop);
				expect(updatePayload).toEqual([]);
			}

			{
				const updatePayload = diffProps({ option: { key: 1, text: "react" } }, { option: { key: 1, text: "react-update" } });
				expect(updatePayload).toEqual(["option", { key: 1, text: "react-update" }]);
			}

			{
				const updatePayload = diffProps({ option: { key: 1, text: "react" } }, {});
				expect(updatePayload).toEqual(["option", null]);
			}

			{
				const updatePayload = diffProps({ option: { key: 1, text: "react" } }, null);
				expect(updatePayload).toEqual(["option", null]);
			}
		});

		test("update style: normal", () => {
			{
				const oldProp: IButtonComponentProps = {};
				const newProp: IButtonComponentProps = { style: { visualStyle: ButtonStyle.Push } };

				const updatePayload = diffProps(oldProp, newProp);
				expect(updatePayload).toEqual(["style", newProp.style]);
			}

			{
				const oldProp: IButtonComponentProps = { style: { visualStyle: ButtonStyle.Command } };
				const newProp: IButtonComponentProps = { style: { visualStyle: ButtonStyle.Push } };

				const updatePayload = diffProps(oldProp, newProp);
				expect(updatePayload).toEqual(["style", newProp.style]);
			}

			{
				const oldProp: IButtonComponentProps = { style: {} };
				const newProp: IButtonComponentProps = { style: { visualStyle: ButtonStyle.Push } };

				const updatePayload = diffProps(oldProp, newProp);
				expect(updatePayload).toEqual(["style", newProp.style]);
			}

			{
				const oldProp: IButtonComponentProps = { style: { visualStyle: null } };
				const newProp: IButtonComponentProps = { style: { visualStyle: ButtonStyle.Push } };

				const updatePayload = diffProps(oldProp, newProp);
				expect(updatePayload).toEqual(["style", newProp.style]);
			}

			{
				const oldProp: IButtonComponentProps = { style: { visualStyle: ButtonStyle.Command } };
				const newProp: IButtonComponentProps = { style: {} };

				const updatePayload = diffProps(oldProp, newProp);
				expect(updatePayload).toEqual(["style", { visualStyle: null }]);
			}

			{
				const oldProp: IButtonComponentProps = { style: { visualStyle: ButtonStyle.Command } };
				const newProp: IButtonComponentProps = {};

				const updatePayload = diffProps(oldProp, newProp);
				expect(updatePayload).toEqual(["style", { visualStyle: null }]);
			}
		});

		test("update children", () => {
			{
				const updatePayload = diffProps({}, { children: [] });
				expect(updatePayload).toEqual([]);
			}

			{
				const updatePayload = diffProps({ children: [] }, {});
				expect(updatePayload).toEqual([]);
			}

			{
				const updatePayload = diffProps({ children: [] }, { children: [] });
				expect(updatePayload).toEqual([]);
			}

			{
				const updatePayload = diffProps({ children: ["a"] }, { children: [] });
				expect(updatePayload).toEqual([]);
			}
		});
	});
});
