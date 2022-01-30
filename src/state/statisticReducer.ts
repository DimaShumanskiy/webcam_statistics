import { v1 } from 'uuid';

import { One, Zero } from 'staticNumber';

const initialState: InitialStateType = {
    called: [],
};
type InitialStateType = {
    called: CalledType[];
};
export type CalledType = {
    dataAndStart?: number; // use one value for start date and time
    stop?: number;
    id: string;
};

type ActionsType =
    | ReturnType<typeof AddCalledStart>
    | ReturnType<typeof AddCalledStop>
    | ReturnType<typeof RemoveItemCalled>;

export const statisticReducer = (
    state: InitialStateType = initialState,
    action: ActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'ADD-CALLED-START':
            return {
                ...state,
                called: [...state.called, { id: v1(), dataAndStart: action.data }],
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
            return {
                ...state,
                called: state.called.filter(f => f.id !== action.id),
            };
        default:
            return { ...state };
    }
};

export const AddCalledStart = (data: number) =>
    ({ type: 'ADD-CALLED-START', data } as const);

export const AddCalledStop = (stop: number) =>
    ({ type: 'ADD-CALLED-STOP', stop } as const);

export const RemoveItemCalled = (id: string) => ({ type: 'REMOVE-CALLED', id } as const);
