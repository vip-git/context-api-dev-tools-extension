const devInit = jest.fn();
const devSend = jest.fn();
const devDisconnect = jest.fn();

const jumpToStateEvent = {
    payload: {
        type: 'JUMP_TO_STATE',
    },
    state: '{ "root": [] }'
};

const jumpToActionEvent = {
    payload: {
        type: 'JUMP_TO_ACTION',
    },
    state: '{ "root": [] }'
};

const importEvent = {
    type: 'DISPATCH',
    payload: {
        nextLiftedState: require('./mocks.json'),
    },
};

const devToolsMock = {
    connect: jest.fn(() => ({
        init: devInit,
        send: devSend,
        disconnect: devDisconnect,
        subscribe: (callback) => callback(jumpToStateEvent),
    })),
}

const devToolsMock1 = {
    connect: jest.fn(() => ({
        init: devInit,
        send: devSend,
        disconnect: devDisconnect,
        subscribe: (callback) => callback(jumpToActionEvent),
    })),
};

const devToolsMock2 = {
    connect: jest.fn(() => ({
        init: devInit,
        send: devSend,
        disconnect: devDisconnect,
        subscribe: (callback) => callback(importEvent),
    })),
};

describe('Dev Tools Extension (Without Extension)', () => {
    let dispatchFn = {};
    let dispatchContext: any = {};

    beforeAll(() => {
        const useContextDevTools = require('./index').default;
        dispatchFn = jest.fn();
        dispatchContext = useContextDevTools();
    });

    test('Should initialize devTools', () => {
        dispatchContext.sendDispatch({});
        expect(dispatchFn).not.toHaveBeenCalledWith({});
    });

    test('Should be able to send updated state', () => {
        dispatchContext.sendUpdatedState({});
        expect(devInit).not.toHaveBeenCalled();
        dispatchContext.sendUpdatedState({});
        expect(devSend).not.toHaveBeenCalled();
    });

    test('Should be able to subscribe to new events (Jump To State)', () => {
        devToolsMock.connect().subscribe(() => jumpToStateEvent);
        expect(devSend).not.toHaveBeenCalled();
    });

    test('Should be able to unsubscribe on tab close', () => {
        window.dispatchEvent(new Event('beforeunload'));
        dispatchContext.disconnectDevTools();
        expect(devDisconnect).not.toHaveBeenCalled();
    });
})

describe('Dev Tools Extension (JumpToState Event)', () => {
    let dispatchFn = {};
    let dispatchContext: any = {};

    beforeAll(() => {
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ = devToolsMock;
        const useContextDevTools = require('./index').default;
        dispatchFn = jest.fn();
        dispatchContext = useContextDevTools(dispatchFn);
    });

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

    test('Should be able to subscribe to new events (Jump To State)', () => {
        devToolsMock.connect().subscribe(() => jumpToStateEvent);
        expect(devSend).toHaveBeenCalled();
    });

    test('Should be able to unsubscribe on tab close', () => {
        window.dispatchEvent(new Event('beforeunload'));
        expect(devDisconnect).toHaveBeenCalled();
    });
})


describe('Dev Tools Extension (Jump to Action Event)', () => {
     let dispatchFn = {};
    let dispatchContext: any = {};

    beforeAll(() => {
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ = devToolsMock1;
        const useContextDevTools = require('./index').default;
        dispatchFn = jest.fn();
        dispatchContext = useContextDevTools(dispatchFn);
    });

    test('Should initialize devTools', () => {
        dispatchContext.sendDispatch({});
        expect(dispatchFn).toHaveBeenCalledWith({});
    });

    test('Should be able to subscribe to new events (Jump To Action)', () => {
        devToolsMock1.connect().subscribe(() => jumpToActionEvent);
        window.dispatchEvent(new Event('beforeunload'));
        expect(devSend).toHaveBeenCalled();
    });
})

describe('Dev Tools Extension (Import Event)', () => {
    let dispatchFn = {};
    let dispatchContext: any = {};

    beforeAll(() => {
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ = devToolsMock2;
        const useContextDevTools = require('./index').default;
        dispatchFn = jest.fn();
        dispatchContext = useContextDevTools(dispatchFn);
    });

    test('Should initialize devTools', () => {
        dispatchContext.sendDispatch({});
        expect(dispatchFn).toHaveBeenCalledWith({});
    });

    test('Should be able to subscribe to new events (Import)', () => {
        devToolsMock2.connect().subscribe(() => importEvent);
        window.dispatchEvent(new Event('beforeunload'));
        expect(devSend).toHaveBeenCalled();
    });

})
