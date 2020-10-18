# Remote Context API - DevTools Extension

Port for [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension) now using Context API

```
npm install --save-dev-exact context-api-dev-tools-extension
```

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
