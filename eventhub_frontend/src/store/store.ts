import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { Dependencies } from './dependencies';
import { useDispatch } from 'react-redux';
import { analyticsSlice } from '../modules/analytics/store/analytics.slice';
import { dashboardSlice } from '../modules/dashboard/store/dashboard.slice';
import { eventSlice } from '../modules/event/store/event.slice';

const reducers = combineReducers({});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore['dispatch'];
export type AppGetState =  AppStore['getState'];

const rootReducer = {
  temp: (state = {}) => state, 
  analytics: analyticsSlice.reducer,
  dashboard: dashboardSlice.reducer,
  event: eventSlice.reducer,
};

export const createStore = (config: {
    dependencies: Dependencies
}) => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>{
            return getDefaultMiddleware({
                thunk: {extraArgument: config.dependencies}
            })
        }
    })
    return store;
}


export const useAppDispatch = () => useDispatch<AppDispatch>();
