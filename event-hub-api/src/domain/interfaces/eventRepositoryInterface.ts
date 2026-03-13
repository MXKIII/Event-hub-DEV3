import { Event } from "../entities/events.js";

export interface EventRepositoryInterface {
  save(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  findAll(): Promise<Event[]>;
  findPaginated(page: number, limit: number): Promise<{ events: Event[]; total: number }>;
  update(event: Event): Promise<Event>;
  delete(id: string): Promise<void>;
}