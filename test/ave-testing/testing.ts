import { Rect } from "ave-ui";
import { AveComponent, getAppContext } from "../../src/ave-react";

export function getComponentById(id: string) {
	const components = getComponents();
	const result = components.find((each) => each.props?.id === id);
	return result;
}

export function getRectRelativeToWindow(component: AveComponent) {
	const control = component.nativeControl;
	const { Size } = control.GetRectClient(); // use size
	const window = getWindowComponent();
	const rectClient = window.nativeControl.GetRectClient();
	const { Position } = control.MapRect(rectClient, true); // get position relative to window
	return new Rect(Position.x, Position.y, Size.x, Size.y);
}

export function getComponents(): AveComponent[] {
	const windowComponent = getWindowComponent();
	const components = [];
	visitComponent(windowComponent, components);
	return components;
}

export function getWindowComponent(): AveComponent {
	const context = getAppContext();
	const appContainer = context.getAppContainer();
	const children = appContainer.getChildren();
	const [windowComponent] = children;
	return windowComponent;
}

function visitComponent(root: AveComponent, components: AveComponent[]) {
	components.push(root);
	root.children.forEach((child) => visitComponent(child, components));
}
