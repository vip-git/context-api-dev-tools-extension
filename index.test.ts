import useContextDevTools from './index';

const devInit = jest.fn();
const devSend = jest.fn();
const devDisconnect = jest.fn();

const devToolsMock = {
    connect: jest.fn(() => ({
        init: devInit,
        send: devSend,
        disconnect: devDisconnect,
    })),
};

describe('Dev Tools Extension', () => {
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ = devToolsMock;
    const dispatchFn = jest.fn();
    const dispatchContext = useContextDevTools(dispatchFn);

    test('Should initialize devTools', () => {
        dispatchContext.sendDispatch({});
        expect(dispatchFn).toHaveBeenCalledWith({});
    });

    test('Should be able to send updated state', () => {
        dispatchContext.sendUpdatedState({});
        expect(devInit).toHaveBeenCalled();
        dispatchContext.sendUpdatedState({});
        expect(devSend).toHaveBeenCalled();
    });

    test('Should be able to disconnect', () => {
        dispatchContext.disconnectDevTools();
        expect(devDisconnect).toHaveBeenCalled();
    });
})

