import { createSlice } from "@reduxjs/toolkit";

export type AnalyticsState = {
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
}

const initialState: AnalyticsState = {
    status: 'idle',
    error: null,
}

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        sendAnalyticsLoading: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        sendAnalyticsSuccess: (state) => {
            state.status = 'success';
            state.error = null;
        },
        sendAnalyticsError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },
    }
})