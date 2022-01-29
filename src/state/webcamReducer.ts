const initialState: InitialStateType = {
    playing: false,
};
type InitialStateType = {
    playing: boolean;
};

type ActionsType = ReturnType<typeof changePlaying>;

export const webcamReducer = (
    state: InitialStateType = initialState,
    action: ActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'WEBCAM/CHANGE-PLAYING':
            return { ...state, playing: !state.playing };
        default:
            return { ...state };
    }
};

export const changePlaying = () => ({ type: 'WEBCAM/CHANGE-PLAYING' } as const);
