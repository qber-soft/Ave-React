import { AveComponent, WindowComponent } from "../components";
import { AppContext } from "./context";

export class AppContainer {
	private children: AveComponent[];
	// avoid gc
	private context: AppContext;

	constructor(context: AppContext) {
		this.children = [];
		this.context = context;
	}

	clearContainer() {
		this.children = [];
	}

	appendChild(component: WindowComponent) {
		if (component instanceof WindowComponent) {
			component.init();
			component.createUI(null);
			this.children.push(component);
		} else {
			throw new Error(`Please use only a single Window as root`);
		}
	}

	getChildren() {
		return [...this.children];
	}
}
