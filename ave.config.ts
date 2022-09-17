import { IPackConfig } from "ave-pack";

const config: IPackConfig = {
  build: {
    projectRoot: __dirname,
    target: "node14-win-x64",
    input: "./build/src/app.js",
    output: "./bin/ave-react.exe",
  },
  resource: {
    icon: "./assets/ave.ico",
    productVersion: "0.0.1",
    productName: "Ave React App",
    fileVersion: "0.0.1",
    companyName: "QberSoft",
    fileDescription: "The Demo App of Ave React",
    LegalCopyright: `© ${new Date().getFullYear()} Ave Copyright.`,
  },
};

export default config;
