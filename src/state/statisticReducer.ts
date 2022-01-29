import { v1 } from 'uuid';

const initialState: InitialStateType = {
    called: [
        { data: 'ww.ww.ww', start: '11.22.33', stop: '11.11.11', id: '1' },
        { data: 'ww.ww.ww', start: '11.22.33', stop: '11.11.11', id: '2' },
        { data: 'ww.ww.ww', start: '11.22.33', stop: '11.11.11', id: '3' },
    ],
    mean: 10,
    sum: 10,
};
type InitialStateType = {
    called: CalledType[];
    mean: number;
    sum: number;
};
export type CalledType = {
    data?: string;
    start?: string;
    stop?: string;
    id: string;
};

type ActionsType = ReturnType<typeof AddCalledStart> | ReturnType<typeof AddCalledStop>;

export const statisticReducer = (
    state: InitialStateType = initialState,
    action: ActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'ADD-CALLED-START':
            return {
                ...state,
                called: [
                    ...state.called,
                    { id: v1(), data: action.data, start: action.start },
                ],
            };
        case 'ADD-CALLED-STOP':
            const one = 2;
            // const lastItem = state.called[state.called.length - one]; // { data: 'ww.ww.ww', start: '11.22.33', stop: '11.11.11', id: '3' },
            const copyState = state.called.slice(0, -1);
            const copyLastItem = state.called.slice(-1);
            const result = [...copyState, { ...copyLastItem[0], stop: action.stop }];
            console.log(result);
            return {
                ...state,
                // called: [...state.called, lastItem.stop: action.stop],
                called: result,
            };
        default:
            return { ...state };
    }
};

export const AddCalledStart = (data?: string, start?: string) =>
    ({ type: 'ADD-CALLED-START', data, start } as const);

export const AddCalledStop = (stop?: string) =>
    ({ type: 'ADD-CALLED-STOP', stop } as const);
