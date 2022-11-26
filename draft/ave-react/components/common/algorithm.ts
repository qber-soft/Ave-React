import isDeepEqual from "fast-deep-equal";

export enum PropName {
	Style = "style",
	Children = "children",
}

export enum PropValue {
	/**
	 * use null to denote default value
	 */
	Default = null,
}

// TODO: add unit test case
export function diffProps(oldProps: object, newProps: object) {
	oldProps = oldProps ?? {};
	newProps = newProps ?? {};

	const updatePayload: any[] = [];
	let styleUpdates = {};

	// handle removed props
	for (const propName in oldProps) {
		if (
			// this prop still exists in next props
			propName in newProps
		) {
			// then skip it
			continue;
		}
		if (propName === PropName.Style) {
			// unset each old style
			const oldStyle = oldProps[propName];
			for (const styleName in oldStyle) {
				styleUpdates[styleName] = PropValue.Default;
			}
		} else if (propName === PropName.Children) {
			// skip
		} else {
			// restore to default
			updatePayload.push(propName, PropValue.Default);
		}
	}

	// handle updated props or new props
	for (const propName in newProps) {
		const newProp = newProps[propName];
		const oldProp = oldProps[propName];

		if (newProp === oldProp) {
			continue;
		}

		if (propName === PropName.Style) {
			if (oldProp) {
				// unset styles on oldProp
				for (const styleName in oldProp) {
					if (!newProp || !(styleName in newProp)) {
						styleUpdates[styleName] = PropValue.Default;
					}
				}
				// update styles that changed since oldProp
				for (const styleName in newProp) {
					if (oldProp[styleName] !== newProp[styleName]) {
						styleUpdates[styleName] = newProp[styleName];

						// refine, avoid rerender, we need deep comparasion here
						["layout", "backgroundColor", "area"].forEach((styleName) => {
							if (isDeepEqual(oldProp[styleName], newProp[styleName])) {
								delete styleUpdates[styleName];
							}
						});
					}
				}
			} else {
				// use newProp as style
				styleUpdates = newProp;
			}
		} else if (propName === PropName.Children) {
			// skip
		} else {
			updatePayload.push(propName, newProp);
		}
	}

	if (Object.keys(styleUpdates).length !== 0) {
		updatePayload.push(PropName.Style, styleUpdates);
	}

	return updatePayload;
}
