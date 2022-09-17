not important now: 

- getRootHostContext
- getChildHostContext

when we need text node:

- shouldSetTextContent

important: init phase, only once

- createInstance: create component instance, but not ui
- appendInitialChild, finalizeInitialChildren: fiber tree established, and we should create component tree
- prepareForCommit, resetAfterCommit: ignore
- appendChildToContainer: trivial
- clearContainer: currently trivial, test unmount root window?

important: update (state/props) phase

- prepareUpdate: diff and calc payload
- commitUpdate: use payload

important: mount ui phase

- appendChild, removeChild, insert etc: mutate component AND ui