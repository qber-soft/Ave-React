import { AveComponent } from "../components";
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

	appendChild(component: AveComponent) {
		this.children.push(component);
	}
}
