import { Server } from "socket.io";
import { createServer } from "http";
import { DpiSize, DpiSize_2, IControl, Window, IGridControl, IGrid, Vec4 } from "ave-ui";

export function startAveDevtoolBackend() {
	const httpServer = createServer();
	const io = new Server(httpServer, {
		cors: {
			origin: "*",
		},
	});

	io.on("connection", (socket) => {
		socket.on("requestTrace", () => {
			// console.log("requestTrace");
			socket.emit("onTraceResponse", JSON.stringify(globalThis.__trace_events__));
		});

		socket.on("onNodeMouseOver", (event: { id: number }) => {
			try {
				// console.log("onNodeMouseOver", event);
				const instance = globalThis.__components__[event.id];
				const control = instance.nativeControl as IControl;

				//
				const rect = control.MapRect(control.GetRectClient(), true);
				const pos = rect.Position;
				const size = rect.Size;
				// console.log("find control, rect: ", {
				// 	pos,
				// 	size,
				// });

				const firstGrid = globalThis.__first_grid__ as IGrid;
				const firstGridRect = firstGrid.MapRect(firstGrid.GetRectClient(), true);
				// console.log("first grid rect: ", firstGridRect);

				const overlay = globalThis.__debug_overlay__ as IGrid;
				if (!globalThis.__debug_overlay_grid_control__) {
					globalThis.__debug_overlay_grid_control__ = firstGrid.ControlAdd(overlay) as IGridControl<IGrid>;
				}

				overlay.SetBackColor(new Vec4(160, 197, 232, 255));
				overlay.SetOpacity(0.8);

				const overlayGridControl = globalThis.__debug_overlay_grid_control__;
				overlayGridControl.SetPos(new DpiSize_2(DpiSize.FromPixel(pos.x - firstGridRect.x), DpiSize.FromPixel(pos.y - firstGridRect.y)));
				overlayGridControl.SetSize(new DpiSize_2(DpiSize.FromPixel(size.x), DpiSize.FromPixel(size.y)));

				const window = globalThis.__window__ as Window;
				window.Redraw();
			} catch (error) {
				console.error(error);
			}
		});

		socket.on("onNodeMouseOut", () => {
			try {
				// console.log("onNodeMouseOut");
				const overlayGridControl = globalThis.__debug_overlay_grid_control__;
				overlayGridControl.SetPos(new DpiSize_2(DpiSize.FromPixel(0), DpiSize.FromPixel(0)));

				// size should be at least 1, or by default size will be full width & height
				overlayGridControl.SetSize(new DpiSize_2(DpiSize.FromPixel(1), DpiSize.FromPixel(1)));

				const window = globalThis.__window__ as Window;
				window.Redraw();
			} catch (error) {
				console.error(error);
			}
		});
	});

	io.listen(6709);
}
