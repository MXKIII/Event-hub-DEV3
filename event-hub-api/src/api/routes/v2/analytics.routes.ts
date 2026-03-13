import { Router } from "express";
import { recordAnalytics, getAnalytics} from "../../controllers/v2/analytics.controller.js";

const router = Router();

router.post("/", recordAnalytics);
router.get("/", getAnalytics);

export { router as analyticsRouter };