import { IDSL } from "typedraft";
import { Statement } from "@babel/types";

export class Debug implements IDSL {
	m_Merge?: boolean;
	m_Env: string;

	constructor(option: { merge: boolean; env: string }) {
		this.m_Merge = option?.merge;
		this.m_Env = option?.env;
	}

	Transcribe(block: Array<Statement>): Array<Statement> {
		if (this.m_Env === "dev") {
			const [useDSL, ...rest] = block;
			return rest;
		} else if (this.m_Env === "prod") {
			return [];
		}

		throw new Error(`invalid env: ${this.m_Env}, please use dev or prod`);
	}
}
