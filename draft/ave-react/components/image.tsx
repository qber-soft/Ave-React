import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer, getAppContext } from "../renderer";
import { Byo2Image, Byo2ImageCreation, Byo2ImageDataType, IControl, Picture as NativePicture, ResourceSource, StretchMode, ImageData, AveImage } from "ave-ui";
import fs from "fs";

export interface IImageComponentProps extends IComponentProps {
	/**
	 * absolute path of image file
	 */
	src: string | AveImage;
	onLoad?: (byo2: Byo2Image, data: ImageData, picture: NativePicture) => void;
}

class ImageComponent extends AveComponent<IImageComponentProps> {
	static tagName = "ave-image";

	private picture: NativePicture;
	private byo2: Byo2Image;
	private data: ImageData;
	private onLoad: IImageComponentProps["onLoad"];

	protected onCreateUI() {
		this.picture = new NativePicture(this.window);
		this.picture.SetStretchMode(StretchMode.Center);
		this.byo2 = null;
		this.data = null;
		this.onLoad = null;
		return this.picture;
	}

	protected onUpdateProp(propName: keyof IImageComponentProps, propValue: any) {
		switch (propName) {
			case "src": {
				this.updateSrc(propValue ?? "");
				break;
			}

			case "onLoad": {
				this.onLoad = propValue ?? (() => {});
				break;
			}
		}
	}

	private async updateSrc(src: string | AveImage) {
		if (!src) {
			return;
		}

		const context = getAppContext();
		const codec = context.imageCodec;
		let aveImage: AveImage | null = null;

		if (typeof src === "string") {
			// TODO: only sync works
			const buffer = fs.readFileSync(src);
			// const buffer = await fs.promises.readFile(src);
			const resourceSource = ResourceSource.FromBuffer(buffer);
			aveImage = codec.Open(resourceSource);
		} else {
			aveImage = src;
		}

		//
		const imgcp = new Byo2ImageCreation();
		imgcp.DataType = Byo2ImageDataType.Raw;
		const imgData = aveImage.GetImage(0, 0, 0);
		this.data = imgData;
		imgcp.Data = ResourceSource.FromArrayBuffer(imgData.Data, imgData.RowPitch, imgData.SlicePitch);
		imgcp.Width = imgData.Width;
		imgcp.Height = imgData.Height;
		imgcp.Format = imgData.Format;

		//
		this.byo2 = new Byo2Image(this.window, imgcp);
		this.picture.SetImage(this.byo2);
		setTimeout(() => {
			// onLoad can be set after src is set
			if (this.onLoad) {
				this.onLoad(this.byo2, this.data, this.picture);
			}
		}, 0);
	}
}

class Config extends ComponentConfig {
	tagName = ImageComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ImageComponent(initProps);
	}
}

export const Image = registerComponent<IImageComponentProps>(new Config());
