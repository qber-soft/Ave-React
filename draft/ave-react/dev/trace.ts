export interface ITraceEvent {
	id: number;
	phase?: "start" | "end";
	type?: string;
	name?: string;
	timestamp?: number;
	detail?: any;
}

//
let events = [];
globalThis.__trace_events__ = { events };
globalThis.__components__ = {};

//
export function traceStart(raw: ITraceEvent) {
	const event: ITraceEvent = {
		...raw,
		phase: "start",
	};
	traceEvent(event);
}

export function traceEnd(raw: ITraceEvent) {
	const event: ITraceEvent = {
		...raw,
		phase: "end",
	};
	traceEvent(event);
}

export function traceEvent(raw: ITraceEvent) {
	const event: ITraceEvent = {
		timestamp: Date.now(),
		...raw,
	};

	if (!event?.detail) {
		event.detail = {};
	}

	const cloned = cloneObject(event);
	events.push(cloned);
}

// avoid object ref changes after record event
export function cloneObject(data: any) {
	return JSON.parse(
		JSON.stringify(
			data,
			(key, value) => {
				if (key === "_owner") {
					return "[ignore]";
				} else if (value === undefined) {
					return "[undefined]";
				} else if (key === "type") {
					return typeof value === "string" ? value : typeof value === "function" ? value.constructor.name : typeof value === "symbol" ? value.toString() : "unknown";
				}
				return value;
			},
			4
		)
	);
}

//
let traceId = 0;

export function getTraceId() {
	++traceId;
	return traceId;
}
