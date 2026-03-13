import { Event} from '../../../domain/entities/events.js';
import type { EventRepositoryInterface } from '../../../domain/interfaces/eventRepositoryInterface.js';
import type { IDGenerator } from '../../../domain/interfaces/id-generator.interface.js';
import { Category } from '../../../domain/category/value-object/category.js';
import { CategorySet } from '../../../domain/category/category-set.js';

export interface CreateEventDTO {
    title: string;
    description: string; 
    postalcode: string;
    address: string;
    capacity: number;
    ticket: number;
    price: number;
    category: string[];
    createdBy: string;
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;
}


export class CreateEventUseCase {
    constructor(
        private readonly eventRepository: EventRepositoryInterface,
        private readonly idGenerator: IDGenerator
    ) {}
    async execute(dto: CreateEventDTO): Promise<Event> {
        const id: string = this.idGenerator.generate();
        const category = dto.category.map(c => new Category(c,true))
        const categorySet = new CategorySet(category);

        const event = new Event({
            id,
            title: dto.title,
            description: dto.description,
            postalcode: dto.postalcode,
            address: dto.address,
            capacity: dto.capacity,
            ticket: dto.ticket,
            price: dto.price,
            category,
            createdBy: dto.createdBy,
            startDate: new Date(dto.startDate),
            createdAt: new Date(dto.createdAt),
            updatedAt: new Date(dto.updatedAt),
        });

        if (event.hasEmptyTitle()) {
            throw new Error("Le titre est requis.");
        }

        if (event.hasEmptyPostalcode()) {
            throw new Error("Le code postal est requis.");
        }

        if (event.hasEmptyAddress()) {
            throw new Error("L'adresse est requise.");
        }

        if (event.hasInvalidStartDate()) {
            throw new Error("La date de début doit être dans le futur.");
        }

        if (event.hasInvalidCapacity()) {
            throw new Error("La capacité doit être un nombre positif.");
        }

        if (event.hasInvalidTicketCount()) {
            throw new Error("Le nombre de tickets disponibles ne peut pas dépasser la capacité.");
        }

        if (event.hasInvalidPrice()) {
            throw new Error("Le prix doit être supérieur ou égal à zéro.");
        }

        if (!categorySet.hasAtLeast(2)) {
            throw new Error("Au moins deux catégories différentes sont requises.");
        }
        
        return this.eventRepository.save(event)
    }
}