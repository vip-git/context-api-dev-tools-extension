// Context API Dev Tools
const devTools: any = { send: () => {} };
let isInitialized = false;
let firstRender = false;
let oldArgs: any = {};

const useContextDevTools = (dispatch: Function) => {
	if (!isInitialized && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
		devTools.current = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({
			features: {
				pause: true, // start/pause recording of dispatched actions
				lock: true, // lock/unlock dispatching actions and side effects    
				persist: true, // persist states on page reloading
				export: true, // export history of actions in a file
				import: 'custom', // import history of actions from a file
				jump: true, // jump back and forth (time travelling)
				skip: true, // skip (cancel) actions
				reorder: true, // drag and drop actions in the history list 
				dispatch: true, // dispatch custom actions or action creators
				test: true // generate tests for the selected actions
			},
			// other options like actionSanitizer, stateSanitizer
		});
		isInitialized = true;
		if (typeof devTools.current.subscribe === 'function') {
			devTools.current.subscribe((message: any) => {
				if (message.payload && (message.payload.type === 'JUMP_TO_STATE' || message.payload.type === 'JUMP_TO_ACTION') && message.state) {
					const parsedState = JSON.parse(message.state);
					sendDispatch({
						type: 'IMPORT_STATE',
						state: parsedState,
					});
				} else if (message.type === 'DISPATCH' && message.payload && message.payload.nextLiftedState) {
					message.payload.nextLiftedState.computedStates.forEach((cs: { state: any}, csi: number) => {
						const actionToSend = message.payload.nextLiftedState.actionsById[csi];
						if (actionToSend.action.type !== '@@INIT') {
							sendDispatch(actionToSend.action);
						}
					});
				}
			});
			window.addEventListener('beforeunload', function (e) {
				e.preventDefault();
				disconnectDevTools();
			});
		}
	}

	const sendDispatch = (args: any) => {
		if(dispatch) {
			dispatch(args);
		}
		oldArgs = args; 
	};

	const sendUpdatedState = (updatedState: any) => {
		if ((window as any).__REDUX_DEVTOOLS_EXTENSION__){
			if (!firstRender) {
				devTools.current.init(updatedState);
				firstRender = true;
			} else {
				if (oldArgs.type !== 'IMPORT_STATE') {
					devTools.current.send(oldArgs, updatedState);
				}
			}
		}
	};

	const disconnectDevTools = () => {
		if ((window as any).__REDUX_DEVTOOLS_EXTENSION__){
			return typeof devTools?.current?.disconnect === 'function' && devTools?.current?.disconnect();
		}
	}

	return {
		sendDispatch,
		sendUpdatedState,
		disconnectDevTools,
	};
};

export default useContextDevTools; 
