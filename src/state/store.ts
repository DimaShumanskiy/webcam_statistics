import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { statisticReducer } from 'state/statisticReducer';
import { webcamReducer } from 'state/webcamReducer';

const rootReducer = combineReducers({
    statistic: statisticReducer,
    webcam: webcamReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
