import type { Event } from "../../domain/entities/events.js";
import type { EventRepositoryInterface } from "../../domain/interfaces/eventRepositoryInterface.js";

export class InMemoryEventRepository implements EventRepositoryInterface {
  private events: Event[] = [];

  async save(event: Event): Promise<Event> {
    this.events.push(event);
    return event;
  }

  async findById(id: string): Promise<Event | null> {
    return this.events.find((event) => event.getProps().id === id) ?? null;
  }

  async findAll(): Promise<Event[]> {
    return [...this.events];
  }

  async update(event: Event): Promise<Event> {
    const id = event.getProps().id;
    const index = this.events.findIndex((e) => e.getProps().id === id);

    if (index === -1) {
      throw new Error("Aucun événement trouvé avec cet ID");
    }

    this.events[index] = event;
    return event;
  }

  async delete(id: string): Promise<void> {
    this.events = this.events.filter((e) => e.getProps().id !== id);
  }

  async findByOrganizerId(organizerId: string): Promise<Event[]> {
    return this.events.filter((e) => e.getProps().createdBy === organizerId);
  }

  async findByCategoryId(categoryId: string): Promise<Event[]> {
    return this.events.filter((e) => e.getProps().category.includes(categoryId));
  }
}