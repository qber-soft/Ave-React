import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer } from "../renderer";
import { Tree as NativeTree, TreeGenericHandle, TreeInsert, TreeItemFlag, TreeItemHandle } from "ave-ui";

export interface ITreeComponentProps extends IComponentProps {
	nodes: ITreeNode[];
	onSelect?: (sender: NativeTree, selected: ITreeNode) => void;
}

export interface ITreeNode {
	text: string;
	children: ITreeNode[];
}

class TreeComponent extends AveComponent<ITreeComponentProps> {
	static tagName = "ave-tree";

	private tree: NativeTree;
	private nodeMap: Map<TreeItemHandle, ITreeNode>;

	protected onCreateUI() {
		this.tree = new NativeTree(this.window);
		this.nodeMap = new Map<TreeItemHandle, ITreeNode>();
		return this.tree;
	}

	protected onUpdateProp(propName: keyof ITreeComponentProps, propValue: any) {
		switch (propName) {
			case "nodes": {
				this.setValuleForNodes(propValue ?? []);
				break;
			}

			case "onSelect": {
				this.tree.OnSelectionChange(
					propValue
						? (sender) => {
								const handle = sender.ItemGetSelection();
								const node = this.nodeMap.get(handle);
								(propValue as ITreeComponentProps["onSelect"])(sender, node);
						  }
						: () => {}
				);
				break;
			}
		}
	}

	private setValuleForNodes(nodes: ITreeComponentProps["nodes"]) {
		{
			// TODO: support update
			this.tree.ItemClear();
			this.nodeMap.clear();
		}
		nodes.forEach((root) => {
			const rootInsert = new TreeInsert();
			rootInsert.Parent = TreeGenericHandle.Root;
			rootInsert.After = TreeGenericHandle.Last;
			rootInsert.Item.Flag = TreeItemFlag.Text;
			rootInsert.Item.Text = root.text;
			const rootHandle = this.tree.ItemInsert(rootInsert);
			this.nodeMap.set(rootHandle, root);
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
			this.nodeMap.set(childHandle, child);
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
