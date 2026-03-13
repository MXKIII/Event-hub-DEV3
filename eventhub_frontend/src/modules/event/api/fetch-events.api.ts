import axios from 'axios';
import type { IEventGateway } from './interface/event-gateway.interface';
import type { Event, Pagination } from '../model/event.model';

export class FetchEventsApi implements IEventGateway {
  async fetchAll(page = 1, limit = 10): Promise<{ events: Event[]; pagination: Pagination }> {
    const response = await axios.get(`http://localhost:8100/api/events?page=${page}&limit=${limit}`, { withCredentials: true });
    return response.data.data;
  }
}