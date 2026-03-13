import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { qrCode, enable, disable } from "../../controllers/v2/a2f.controller.js";

const router = Router();

router.use(requireAuth());

router.get("/qrcode", qrCode);
router.post("/enable", enable);
router.post("/disable", disable);

export { router as a2fRouter };