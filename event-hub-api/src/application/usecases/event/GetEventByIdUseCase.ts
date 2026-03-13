import { Event } from "../../../domain/entities/events.js";
import type { EventRepositoryInterface } from "../../../domain/interfaces/eventRepositoryInterface.js";

export class GetEventByIdUseCase {
  constructor(private readonly eventRepository: EventRepositoryInterface) {}

  async execute(id: string): Promise<Event | null> {
    if (!id || id.trim() === "") {
      throw new Error("L'identifiant de l'événement est requis.");
    }

    return this.eventRepository.findById(id);
  }
}