import React, {
	createContext,
	Dispatch,
	useReducer,
	useContext,
	useEffect,
} from 'react';

import useContextDevTools from '../../index.min';

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodosState = { root: Todo[] };

const TodosStateContext = createContext<TodosState | undefined>(undefined);

type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'IMPORT_STATE'; state: any };

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined
);

function todosReducer(givenState: TodosState, action: Action): TodosState {
  const state = givenState.root;
  switch (action.type) {
		case 'CREATE':
      const nextId = Math.max(...state.map((todo) => todo.id)) + 1;
			return {
				root: state.concat({
					id: (Number.isFinite(nextId) && nextId) || 1,
					text: action.text,
					done: false,
				}),
			};
		case 'TOGGLE':
			return {
        root: state.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        )
      }
		case 'REMOVE':
			return {
				root: state.filter((todo) => todo.id !== action.id),
			};
		case 'IMPORT_STATE':
			return action.state;
		default:
			throw new Error('Unhandled action');
	}
}

export function TodosContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
	const [todos, dispatch] = useReducer(todosReducer, {
		root: [
			{
				id: 1,
				text: 'My first todo using context API',
				done: true,
			},
			{
				id: 2,
				text: 'Second one to try time travel debugging',
				done: true,
			},
			{
				id: 3,
				text: '3rd one to import new todos',
				done: false,
			},
		],
	});
  
  const devTools = useContextDevTools(dispatch);
  
  useEffect(() => {
    devTools.sendUpdatedState(todos);
	}, [todos, devTools]);
  

	return (
		<TodosDispatchContext.Provider value={devTools.sendDispatch}>
			<TodosStateContext.Provider value={todos}>
				{children}
			</TodosStateContext.Provider>
		</TodosDispatchContext.Provider>
	);
}

export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error('TodosStateProvider not found');
  return state;
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
}
