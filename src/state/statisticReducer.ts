import { v1 } from 'uuid';

import { One, Zero } from 'staticNumber';

const initialState: InitialStateType = {
    calls: [],
};
type InitialStateType = {
    calls: CalledType[];
};
export type CalledType = {
    timeStart?: number; // use one value for start date and time
    timeStop?: number;
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
                calls: [...state.calls, { id: v1(), timeStart: action.timeStart }],
            };
        case 'ADD-CALLED-STOP': {
            const copyState = state.calls.slice(Zero, -One);
            const copyLastItem = state.calls.slice(-One);
            const result = [
                ...copyState,
                { ...copyLastItem[Zero], timeStop: action.timeStop },
            ];
            return {
                ...state,
                calls: result,
            };
        }
        case 'REMOVE-CALLED':
            return {
                ...state,
                calls: state.calls.filter(f => f.id !== action.id),
            };
        default:
            return { ...state };
    }
};

export const AddCalledStart = (timeStart: number) =>
    ({ type: 'ADD-CALLED-START', timeStart } as const);

export const AddCalledStop = (timeStop: number) =>
    ({ type: 'ADD-CALLED-STOP', timeStop } as const);

export const RemoveItemCalled = (id: string) => ({ type: 'REMOVE-CALLED', id } as const);
