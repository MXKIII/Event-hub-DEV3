import { Event } from "../../../domain/entities/events.js";
import type { EventRepositoryInterface } from "../../../domain/interfaces/eventRepositoryInterface.js";

export class GetAllEventsUseCase {
  constructor(private readonly eventRepository: EventRepositoryInterface) {}

  async execute(page = 1, limit = 10): Promise<{ events: Event[]; total: number; page: number; totalPages: number }> {
    const { events, total } = await this.eventRepository.findPaginated(page, limit);
    return { events, total, page, totalPages: Math.ceil(total / limit) };
  }
}