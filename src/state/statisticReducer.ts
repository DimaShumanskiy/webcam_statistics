import { v1 } from 'uuid';

import { One, Zero } from '../staticNumber';

const initialState: InitialStateType = {
    called: [
        // { data: 123, start: 123, stop: 123, id: '1' },
        // { data: 123, start: 123, stop: 132, id: '2' },
        // { data: 123, start: 123, stop: 132, id: '3' },
    ],
};
type InitialStateType = {
    called: CalledType[];
};
export type CalledType = {
    data?: number;
    start?: number;
    stop?: number;
    id: string;
};

type ActionsType =
    | ReturnType<typeof AddCalledStart>
    | ReturnType<typeof AddCalledStop>
    | ReturnType<typeof RemoveCalled>;

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
        case 'ADD-CALLED-STOP': {
            const copyState = state.called.slice(Zero, -One);
            const copyLastItem = state.called.slice(-One);
            const result = [...copyState, { ...copyLastItem[Zero], stop: action.stop }];
            return {
                ...state,
                called: result,
            };
        }
        case 'REMOVE-CALLED':
            return { ...state };
        default:
            return { ...state };
    }
};

export const AddCalledStart = (data?: number, start?: number) =>
    ({ type: 'ADD-CALLED-START', data, start } as const);

export const AddCalledStop = (stop?: number) =>
    ({ type: 'ADD-CALLED-STOP', stop } as const);

export const RemoveCalled = (id: string) => ({ type: 'REMOVE-CALLED', id } as const);
