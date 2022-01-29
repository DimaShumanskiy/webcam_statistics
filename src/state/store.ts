import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { statisticReducer } from './statisticReducer';
import { webcamReducer } from './webcamReducer';

const rootReducer = combineReducers({
    statistic: statisticReducer,
    webcam: webcamReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
