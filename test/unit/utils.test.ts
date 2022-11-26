import { parseSize } from "../../draft/ave-react/components/common/utils";

describe("utils", () => {
	test("parse size", () => {
		{
			const size = parseSize("100dpx");
			expect(size.Value).toEqual(100);
			expect(size.IsDpiScaled).toEqual(true);
			expect(size.IsSlice).toEqual(false);
		}
		{
			const size = parseSize("50px");
			expect(size.Value).toEqual(50);
			expect(size.IsDpiScaled).toEqual(false);
			expect(size.IsSlice).toEqual(false);
		}
		{
			const size = parseSize("1");
			expect(size.Value).toEqual(1);
			expect(size.IsDpiScaled).toEqual(false);
			expect(size.IsSlice).toEqual(true);
		}
	});
});
