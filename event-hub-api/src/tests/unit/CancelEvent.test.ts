import { Event } from "../../domain/entities/events.js";
import { Category } from "../../domain/category/value-object/category.js";

const baseProps = {
  id: "evt-001",
  title: "Test Event",
  description: "Description",
  postalcode: "75001",
  address: "1 rue de la Paix",
  capacity: 100,
  ticket: 50,
  price: 20,
  category: [new Category("festival", true), new Category("concert", true)],
  createdBy: "organizer-123",
  startDate: new Date(Date.now() + 86400000 * 10),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Event.cancel()", () => {
  it("should change status to cancelled", () => {
    const event = new Event(baseProps);
    event.cancel("organizer-123");
    expect(event.getProps().status).toBe("cancelled");
  });

  it("should throw if user is not the organizer", () => {
    const event = new Event(baseProps);
    expect(() => event.cancel("autre-user")).toThrow(
      "Seul l'organisateur de l'événement peut annuler cet événement."
    );
  });

  it("should throw if event is already cancelled", () => {
    const event = Event.reconstitute({ ...baseProps, status: "cancelled" });
    expect(() => event.cancel("organizer-123")).toThrow(
      "L'événement est déjà annulé."
    );
  });

  it("should throw if event is in the past", () => {
    const event = Event.reconstitute({
      ...baseProps,
      startDate: new Date(Date.now() - 86400000),
    });
    expect(() => event.cancel("organizer-123")).toThrow(
      "Impossible d'annuler un événement passé."
    );
  });
});