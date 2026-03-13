import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import path from "node:path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { jsonApiResponseMiddleware, errorHandlerMiddleware } from "./middlewares/index.js";
import { eventRoute } from "./routes/v2/eventRoutes.js";
import { authRoute } from "./routes/v2/authRoutes.js";
import { a2fRouter } from "./routes/v2/a2fRoutes.js";
import { analyticsRouter } from "./routes/v2/analytics.routes.js";

const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

const swaggerPath = path.resolve(process.cwd(), "docs", "swagger-output.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoute);
app.use("/api/events", eventRoute);
app.use("/api/a2f", a2fRouter);
app.use("/analytics", analyticsRouter);

app.use(errorHandlerMiddleware);

export default app;