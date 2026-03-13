import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Event, Pagination } from '../model/event.model';

export type EventState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  events: Event[];
  pagination: Pagination | null;
  error: string | null;
};

const initialState: EventState = { status: 'idle', events: [], pagination: null, error: null };

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    fetchEventsLoading: (state) => { state.status = 'loading'; state.error = null; },
    fetchEventsSuccess: (state, action: PayloadAction<{ events: Event[]; pagination: Pagination }>) => {
      state.status = 'success';
      state.events = action.payload.events;
      state.pagination = action.payload.pagination;
    },
    fetchEventsError: (state, action: PayloadAction<string>) => {
      state.status = 'error'; state.error = action.payload;
    },
  },
});