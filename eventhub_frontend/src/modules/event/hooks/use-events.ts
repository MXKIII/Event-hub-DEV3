import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type AppState } from '../../../store/store';
import { fetchEvents } from '../queries/fetch-events.query';

export const useEvents = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { events, pagination, status, error } = useSelector((state: AppState) => state.event);

  useEffect(() => { dispatch(fetchEvents(page)); }, [dispatch, page]);

  return { events, pagination, status, error, page, setPage };
};