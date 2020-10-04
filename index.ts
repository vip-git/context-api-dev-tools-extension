// Context API Dev Tools
const devTools: any = { send: () => {} };
let isInitialized = false;
let firstRender = false;
let oldArgs = {};

export const useContextDevTools = (dispatch: Function) => {
	if (!isInitialized) {
		devTools.current = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
		isInitialized = true;
	}

	const sendDispatch = (args: any) => {
		if(dispatch) {
			dispatch(args);
		}
		oldArgs = args; 
	};

	const sendUpdatedState = (updatedState: any) => {
		if (!firstRender) {
			devTools.current.init(updatedState);
			firstRender = true;
		} else {
			devTools.current.send(oldArgs, { root: updatedState });
		}
	};

	const disconnectDevTools = () => {
		return devTools.current.disconnect();
	}

	return {
		sendDispatch,
		sendUpdatedState,
		disconnectDevTools,
	};
};
