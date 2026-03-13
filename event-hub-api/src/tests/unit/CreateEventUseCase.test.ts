import { CreateEventUseCase } from "../../application/usecases/event/CreateEventUseCase.js";
import type { CreateEventDTO } from "../../application/usecases/event/CreateEventUseCase.js";
import { InMemoryEventRepository } from "../../infrastructure/repositories/InMemoryEventRepository.js";
import { StaticIdGenerator } from "./utils/static-id-genearator.js";

describe("CreateEventUseCase", () => {
  let Repository: InMemoryEventRepository;
  let IdGenerator: StaticIdGenerator;
  let UseCase: CreateEventUseCase;

  const validEventDTO: CreateEventDTO = {
    title: "Sample Event",
    description: "This is a sample event description.",
    postalcode: "12345",
    address: "123 Sample St, Sample City",
    capacity: 100,
    ticket: 50,
    price: 20.0,
    category: ["festival", "concert"],
    createdBy: "organizer123",
    startDate: new Date(Date.now() + 86400000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    Repository = new InMemoryEventRepository();
    IdGenerator = new StaticIdGenerator();
    UseCase = new CreateEventUseCase(Repository, IdGenerator);
  });

  describe("Scenario: no title", () => {
    const dto = {
      ...validEventDTO,
      title: "",
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow("Le titre est requis.");
    });
  });

  describe("Scenario: no postal code", () => {
    const dto = {
      ...validEventDTO,
      postalcode: "",
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow("Le code postal est requis.");
    });
  });

  describe("Scenario: no address", () => {
    const dto = {
      ...validEventDTO,
      address: "",
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow("L'adresse est requise.");
    });
  });

  describe("Scenario: invalid start date", () => {
    const dto = {
      ...validEventDTO,
      startDate: new Date(Date.now() - 86400000),
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow(
        "La date de début doit être dans le futur."
      );
    });
  });

  describe("Scenario: invalid capacity", () => {
    const dto = {
      ...validEventDTO,
      capacity: 0,
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow("La capacité doit être un nombre positif.");
    });
  });

  describe("Scenario: invalid ticket count", () => {
    const dto = {
      ...validEventDTO,
      ticket: 150,
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow(
        "Le nombre de tickets disponibles ne peut pas dépasser la capacité."
      );
    });
  });

  describe("Scenario: invalid price", () => {
    const dto = {
      ...validEventDTO,
      price: -10,
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow("Le prix doit être supérieur ou égal à zéro.");
    });
  });

  describe("Scenario: At least two categories are required", () => {
    const dto = {
      ...validEventDTO,
      category: [],
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow(
        "Au moins deux catégories différentes sont requises."
      );
    });
  });

  describe("Scenario: no duplicate categories", () => {
    const dto = {
      ...validEventDTO,
      category: ["festival", "festival"],
    };
    it("should throw an error", async () => {
      await expect(UseCase.execute(dto)).rejects.toThrow(
        "Au moins deux catégories différentes sont requises."
      );
    });
  });

  describe("Scenario: valid event creation", () => {
    const dto = {
      ...validEventDTO,
    };
    it("should be saved in the database", async () => {
      const event = await UseCase.execute(dto);
      const savedEvent = await Repository.findById(event.getProps().id);
      expect(savedEvent).toBeDefined();
      expect(savedEvent!.getProps()).toEqual(event.getProps());
    });
  });
});