import { Router } from "express";
import { AuthController } from "../../controllers/v2/AuthController.js";

export const authRoute = Router();

const controller = new AuthController();

authRoute.post("/register", controller.register);
authRoute.post("/login", controller.login);