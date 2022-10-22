import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { ITrackBar, TrackBar as NativeTrackBar } from "ave-ui";

export interface ITrackBarComponentProps extends IComponentProps {
	onThumbRelease?: Parameters<ITrackBar["OnThumbRelease"]>[0];
}

class TrackBarComponent extends AveComponent<ITrackBarComponentProps> {
	static tagName = "ave-track-bar";

	private trackBar: NativeTrackBar;

	protected onCreateUI() {
		this.trackBar = new NativeTrackBar(this.window, this.props?.langKey);
		return this.trackBar;
	}

	protected onUpdateProp(propName: keyof ITrackBarComponentProps, propValue: any) {
		switch (propName) {
			case "onThumbRelease": {
				this.trackBar.OnThumbRelease(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = TrackBarComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new TrackBarComponent(initProps);
	}
}

export const TrackBar = registerComponent<ITrackBarComponentProps>(new Config());
