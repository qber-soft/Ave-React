import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { Tree as NativeTree, TreeGenericHandle, TreeInsert, TreeItem, TreeItemFlag, TreeItemHandle } from "ave-ui";

export interface ITreeComponentProps extends IComponentProps {
	nodes: ITreeNode[];
}

export interface ITreeNode {
	text: string;
	children: ITreeNode[];
}

class TreeComponent extends AveComponent<ITreeComponentProps> {
	static tagName = "ave-tree";

	private tree: NativeTree;

	protected onCreateUI() {
		this.tree = new NativeTree(this.window);
		return this.tree;
	}

	protected onUpdateProp(propName: keyof ITreeComponentProps, propValue: any) {
		switch (propName) {
			case "nodes": {
				this.setValuleForNodes(propValue ?? []);
				break;
			}
		}
	}

	private setValuleForNodes(nodes: ITreeComponentProps["nodes"]) {
		{
			// TODO: support update
			this.tree.ItemClear();
		}
		nodes.forEach((root) => {
			const rootInsert = new TreeInsert();
			rootInsert.Parent = TreeGenericHandle.Root;
			rootInsert.After = TreeGenericHandle.Last;
			rootInsert.Item.Flag = TreeItemFlag.Text;
			rootInsert.Item.Text = root.text;
			const rootHandle = this.tree.ItemInsert(rootInsert);
			this.buildTree(rootHandle, root);
		});
	}

	private buildTree(parentHandle: TreeItemHandle, parent: ITreeNode) {
		parent.children.forEach((child) => {
			const childInsert = new TreeInsert();
			childInsert.Parent = parentHandle;
			childInsert.After = TreeGenericHandle.Last;
			childInsert.Item.Flag = TreeItemFlag.Text;
			childInsert.Item.Text = child.text;
			const childHandle = this.tree.ItemInsert(childInsert);
			this.buildTree(childHandle, child);
		});
	}
}

class Config extends ComponentConfig {
	tagName = TreeComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new TreeComponent(initProps);
	}
}

export const Tree = registerComponent<ITreeComponentProps>(new Config());
