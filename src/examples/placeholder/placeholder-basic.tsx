import { IPainter, IPlaceholder, Vec4, Rect } from "ave-ui";
import React, { useCallback } from "react";
import { Window, Placeholder, IPlaceholderComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestPlaceholderBasic() {
	const onPaintPost = useCallback<IPlaceholderComponentProps["onPaintPost"]>((sender: IPlaceholder, painter: IPainter, rect: Rect) => {
		painter.SetPenColor(new Vec4(255, 0, 0, 255));
		painter.DrawRectangle(0, 0, rect.w, rect.h);
	}, []);

	return (
		<Window title="Placeholder Basic">
			<DemoLayout>
				<Placeholder onPaintPost={onPaintPost} />
			</DemoLayout>
		</Window>
	);
}
