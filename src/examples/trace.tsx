import React, { useEffect, useState } from "react";
import { Template } from "../ave-react/dev";

export function TestRemoveChildFromContainer() {
	const [shouldRemove, setShouldRemove] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			console.log(`remove child`);
			setShouldRemove(true);
		}, 1000);
	}, []);
	return (
		<>
			{shouldRemove ? <></> : <Template desc="child 1" />}
			<Template desc="child 2" />
		</>
	);
}

export function TestInsertInContainerBefore() {
	const [shouldInsert, setShouldInsert] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			console.log(`insertInContainerBefore`);
			setShouldInsert(true);
		}, 1000);
	}, []);
	return (
		<>
			{shouldInsert ? <Template desc="child 1" /> : <></>}
			<Template desc="child 2" />
		</>
	);
}

export function TestRemoveChild() {
	const [shouldRemove, setShouldRemove] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			console.log(`remove child`);
			setShouldRemove(true);
		}, 1000);
	}, []);
	return (
		<Template desc="root">
			{shouldRemove ? <></> : <Template desc="child 1" />}
			<Template desc="child 2" />
		</Template>
	);
}

export function TestInsertBefore() {
	const [shouldInsert, setShouldInsert] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			console.log(`insert child`);
			setShouldInsert(true);
		}, 1000);
	}, []);
	return (
		<Template desc="root">
			{shouldInsert ? <Template desc="child 1" /> : <></>}
			<Template desc="child 2" />
		</Template>
	);
}

export function TestAppendChild() {
	const [shouldAppend, setShouldAppend] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			console.log(`append child`);
			setShouldAppend(true);
		}, 1000);
	}, []);
	return <Template desc="root">{shouldAppend ? <Template desc="child 1" /> : <></>}</Template>;
}

export function TestUpdateProps() {
	const [desc, setDesc] = useState(`child 1 - ${Date.now()}`);
	useEffect(() => {
		setTimeout(() => {
			console.log(`update desc`);
			setDesc(`child 1 - ${Date.now()}`);
		}, 1000);
	}, []);
	return (
		<Template desc="root">
			<Template desc={desc} />
		</Template>
	);
}

export function TestFirstRender() {
	return (
		<Template desc="root">
			<Template desc="child 1" />
		</Template>
	);
}
