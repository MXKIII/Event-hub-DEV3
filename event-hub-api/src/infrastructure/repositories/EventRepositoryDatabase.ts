import type { Event as PrismaEvent } from "@prisma/client";

import { prisma } from "../../prisma/client.js";
import { Event } from "../../domain/entities/events.js";
import type { EventRepositoryInterface } from "../../domain/interfaces/eventRepositoryInterface.js";
import { Category } from "../../domain/category/value-object/category.js";

export class EventRepositoryDatabase implements EventRepositoryInterface {
  private toDomain(row: PrismaEvent): Event {
    return Event.reconstitute({
      id: row.id,
      title: row.title,
      description: row.description,
      postalcode: row.postalcode,
      address: row.address,
      capacity: row.capacity,
      ticket: row.ticket,
      price: row.price,
      category: row.category.map((name) => new Category(name, true)),
      createdBy: row.createdBy,
      startDate: row.startDate,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async save(event: Event): Promise<Event> {
    const p = event.getProps();

    const created = await prisma.event.create({
      data: {
        id: p.id,
        title: p.title,
        description: p.description,
        postalcode: p.postalcode,
        address: p.address,
        capacity: p.capacity,
        ticket: p.ticket,
        price: p.price,
        category: p.category.map((c) => c.getName()),
        createdBy: p.createdBy,
        startDate: p.startDate,
      },
    });

    return this.toDomain(created);
  }

  async findById(id: string): Promise<Event | null> {
    const found = await prisma.event.findUnique({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async findAll(): Promise<Event[]> {
    const rows = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async update(event: Event): Promise<Event> {
    const p = event.getProps();

    const updated = await prisma.event.update({
      where: { id: p.id },
      data: {
        title: p.title,
        description: p.description,
        postalcode: p.postalcode,
        address: p.address,
        capacity: p.capacity,
        ticket: p.ticket,
        price: p.price,
        category: p.category.map((c) => c.getName()),
        createdBy: p.createdBy,
        startDate: p.startDate,
      },
    });

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.event.delete({ where: { id } });
  }

  async findPaginated(page: number, limit: number): Promise<{ events: Event[]; total: number }> {
    const [rows, total] = await Promise.all([
      prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.event.count(),
    ]);
    return { events: rows.map((r) => this.toDomain(r)), total };
  }
}