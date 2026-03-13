import type { Request, Response, NextFunction } from "express";
import { CreateEventUseCase, GetAllEventsUseCase, DeleteEventUseCase, GetEventByIdUseCase, UpdateEventUseCase } from "../../../application/usecases/index.js";

export class EventController {
    constructor(
        private readonly createEventUseCase: CreateEventUseCase,
        private readonly getAllEventsUseCase: GetAllEventsUseCase,
        private readonly getEventByIdUseCase: GetEventByIdUseCase,
        private readonly updateEventUseCase: UpdateEventUseCase,
        private readonly deleteEventUseCase: DeleteEventUseCase
    ) {}

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const newEvent = await this.createEventUseCase.execute(req.body);
            if (!newEvent) {
                return res.jsonError("L'événement n'a pas pu être créé", 400);
            }
             return res.jsonSuccess({ message: "Événement créé avec succès", event: newEvent.getProps() }, 201);    
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const page = Math.max(1, parseInt(req.query.page as string) || 1);
            const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));

            const result = await this.getAllEventsUseCase.execute(page, limit);

            if (result.events.length === 0) {
                return res.jsonError("Aucun événement trouvé", 404);
            }
            return res.jsonSuccess({
                message: "Événements récupérés avec succès",
                events: result.events.map(e => e.getProps()),
                pagination: { page: result.page, total: result.total, totalPages: result.totalPages, limit }
            });
        } catch (error) {
            return next(error);
        }

    }

    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id;
            const event = await this.getEventByIdUseCase.execute(id); 
            if (!event) {
                return res.jsonError("Événement introuvable", 404);
            }
            return res.jsonSuccess({ message: "Événement récupéré avec succès", event: event.getProps() });
        }
        catch (error) {
           return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id;
            const content = req.body;
            const updatedEvent = await this.updateEventUseCase.execute(id, content);
            if (!updatedEvent) {
                return res.jsonError("Événement introuvable", 404);
            }
            return res.jsonSuccess({ message: "Événement mis à jour avec succès", event: updatedEvent.getProps() }, 200);
        }
        catch (error) {
           return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id;
            const existingEvent = await this.getEventByIdUseCase.execute(id);
            if (!existingEvent) {
                return res.jsonError("Événement introuvable", 404);
            }
            await this.deleteEventUseCase.execute(id);
            return res.jsonSuccess(204);
        }
        catch (error) {
           return next(error);
        }
    }

}