import type { Dependencies } from '../../../store/dependencies';
import type { AppDispatch } from '../../../store/store';
import { eventSlice } from '../store/event.slice';

export const fetchEvents = (page = 1, limit = 10) => async (dispatch: AppDispatch, _: unknown, dependencies: Dependencies) => {
  dispatch(eventSlice.actions.fetchEventsLoading());
  try {
    const result = await dependencies.eventGateway.fetchAll(page, limit);
    dispatch(eventSlice.actions.fetchEventsSuccess(result));
  } catch {
    dispatch(eventSlice.actions.fetchEventsError('Erreur lors du chargement des événements'));
  }
};