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
            const event = await this.createEventUseCase.execute(req.body);
             res.jsonSuccess(event.getProps(), 201);    
        } catch (error) {
           return next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try {

        }
        catch (error) {
           return next(error);
        }

    }

    async getById(req: Request, res: Response, next: NextFunction){
        try {
        }
        catch (error) {
           return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try {
        }
        catch (error) {
           return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try {
        }
        catch (error) {
           return next(error);
        }
    }

}