import { Router } from "express";
import { eventController } from "../../config/container.js";

const router = Router();

router.post("/", eventController.create.bind(eventController));


export { router as eventRoute };

