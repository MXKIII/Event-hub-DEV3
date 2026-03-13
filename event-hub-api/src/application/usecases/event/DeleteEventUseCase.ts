import type { EventRepositoryInterface } from "../../../domain/interfaces/eventRepositoryInterface.js";

export class DeleteEventUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) {}

    async execute(id: string): Promise<void> {
        await this.eventRepository.delete(id);
    }
}