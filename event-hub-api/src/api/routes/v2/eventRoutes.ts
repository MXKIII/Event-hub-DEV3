import { Router } from "express";
import { eventController } from "../../config/container.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();


router.get("/", eventController.getAll.bind(eventController));
router.get("/:id", eventController.getById.bind(eventController));


router.post("/", requireAuth(), eventController.create.bind(eventController));
router.put("/:id", requireAuth(), eventController.update.bind(eventController));
router.delete("/:id", requireAuth(), eventController.delete.bind(eventController));

export { router as eventRoute };

