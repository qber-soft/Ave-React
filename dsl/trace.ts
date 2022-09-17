import { IDSL } from "typedraft";
import template from "@babel/template";
import { Statement, LabeledStatement, ExpressionStatement, ArrowFunctionExpression } from "@babel/types";

export class Trace implements IDSL {
	m_Merge?: boolean;
	m_Env: string;

	constructor(option: { merge: boolean; env: string }) {
		this.m_Merge = option?.merge;
		this.m_Env = option?.env;
	}

	Transcribe(block: Array<Statement>): Array<Statement> {
		if (this.m_Env === "dev") {
			const [useDSL, label] = block as [any, LabeledStatement];
			if (label.label.name === "id") {
				const declareId = template.ast`const __trace_id__ = Trace.getTraceId();` as any;
				return [declareId];
			} else if (label.label.name === "start") {
				const traceStart = template`Trace.traceStart((PARAM)(__trace_id__));`({
					PARAM: (label.body as ExpressionStatement).expression as ArrowFunctionExpression,
				}) as any;
				return [traceStart];
			} else if (label.label.name === "end") {
				const traceEnd = template`Trace.traceEnd((PARAM)(__trace_id__));`({
					PARAM: (label.body as ExpressionStatement).expression as ArrowFunctionExpression,
				}) as any;
				return [traceEnd];
			}
			return [label];
		} else if (this.m_Env === "prod") {
			return [];
		}

		throw new Error(`invalid env: ${this.m_Env}, please use dev or prod`);
	}
}
