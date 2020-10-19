# Remote Context API - DevTools Extension
[![Build](https://img.shields.io/github/workflow/status/vip-git/context-api-dev-tools-extension/Build-Test-Deploy/main?style=flat)](https://github.com/vip-git/context-api-dev-tools-extension/actions) [![npm version](https://badge.fury.io/js/context-api-dev-tools-extension.svg)](https://badge.fury.io/js/context-api-dev-tools-extension) [![codecov](https://codecov.io/gh/vip-git/context-api-dev-tools-extension/branch/main/graph/badge.svg?token=YLEDGQOZTH)](https://codecov.io/gh/vip-git/context-api-dev-tools-extension) [![Known Vulnerabilities](https://snyk.io/test/github/vip-git/context-api-dev-tools-extension/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vip-git/context-api-dev-tools-extension?targetFile=package.json)

Port for [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension) now using [Context API](https://reactjs.org/docs/context.html)

```
npm install --save-dev-exact context-api-dev-tools-extension
```
## [Example Demo](https://vip-git.github.io/context-api-dev-tools-extension/)
![](./example/context-api-dev-tools-demo.gif)

## Example using `useReducer`
#### Detailed example can be [seen here](https://github.com/vip-git/context-api-dev-tools-extension/blob/main/example/contexts/TodosContext.tsx)

```
// Library
import useContextDevTools from 'context-api-dev-tools-extension';

export function TodosContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  // Define reducer
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  
  // Initialize DevTools Extension
  const devTools = useContextDevTools(dispatch);
  
  // Update devtools to send updated state
  useEffect(() => {
    devTools.sendUpdatedState(todos);
  }, [todos, devTools]);
  
  // Mount provider with state context
  return (
    <TodosDispatchContext.Provider value={devTools.sendDispatch}>
     <TodosStateContext.Provider value={todos}>
      {children}
     </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}
```
