import type { Event, Pagination } from '../../model/event.model';

export interface IEventGateway {
  fetchAll(page?: number, limit?: number): Promise<{ events: Event[]; pagination: Pagination }>;
}