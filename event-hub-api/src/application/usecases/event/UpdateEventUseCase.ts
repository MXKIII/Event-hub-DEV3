import { Event } from "../../../domain/entities/events.js";
import type { EventRepositoryInterface } from "../../../domain/interfaces/eventRepositoryInterface.js";
import type { CreateEventDTO } from "./CreateEventUseCase.js";
import { Category } from "../../../domain/category/value-object/category.js";
import { CategorySet } from "../../../domain/category/category-set.js";

export class UpdateEventUseCase {
  constructor(private readonly eventRepository: EventRepositoryInterface) {}

  async execute(id: string, dto: Partial<CreateEventDTO>): Promise<Event> {
    if (!id || id.trim() === "") {
      throw new Error("L'identifiant de l'événement est requis.");
    }

    const existing = await this.eventRepository.findById(id);
    if (!existing) {
      throw new Error("Aucun événement trouvé avec cet identifiant.");
    }

    const prev = existing.getProps();

    const mergedCategory =
      dto.category !== undefined
        ? dto.category.map((c) => new Category(c, true))
        : prev.category;

    if (dto.category !== undefined) {
      const set = new CategorySet(mergedCategory);
      if (!set.hasAtLeast(2)) {
        throw new Error("Au moins deux catégories différentes sont requises.");
      }
    }

    const updated = new Event({
      id: prev.id,
      title: dto.title ?? prev.title,
      description: dto.description ?? prev.description,
      postalcode: dto.postalcode ?? prev.postalcode,
      address: dto.address ?? prev.address,
      capacity: dto.capacity ?? prev.capacity,
      ticket: dto.ticket ?? prev.ticket,
      price: dto.price ?? prev.price,
      category: mergedCategory,
      createdBy: dto.createdBy ?? prev.createdBy,
      startDate: dto.startDate ? new Date(dto.startDate) : prev.startDate,
      createdAt: prev.createdAt,
      updatedAt: new Date(),
    });

    return this.eventRepository.update(updated);
  }
}