import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { statisticReducer } from './statisticReducer';

const rootReducer = combineReducers({
    statistic: statisticReducer,
});

export const store = createStore(rootReducer, applyMiddleware());
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
