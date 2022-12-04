import { parseSize, parseMargin } from "../../src/ave-react/components/common/utils";

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

	test("parse margin", () => {
		{
			const margin = parseMargin("100dpx 50px 0 1");
			expect(margin.Left.IsDpiScaled).toEqual(true);
			expect(margin.Left.Value).toEqual(100);

			expect(margin.Top.IsDpiScaled).toEqual(false);
			expect(margin.Top.IsSlice).toEqual(false);
			expect(margin.Top.Value).toEqual(50);

			expect(margin.Right.IsSlice).toEqual(true);
			expect(margin.Right.Value).toEqual(0);

			expect(margin.Bottom.IsSlice).toEqual(true);
			expect(margin.Bottom.Value).toEqual(1);
		}
	});
});
