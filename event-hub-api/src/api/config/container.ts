import { randomUUID } from "crypto";
import { EventRepositoryDatabase } from "../../infrastructure/repositories/EventRepositoryDatabase.js";
import type { IDGenerator } from "../../domain/interfaces/id-generator.interface.js";
import { EventController } from "../controllers/v2/EventController.js";
import { CreateEventUseCase } from "../../application/usecases/event/CreateEventUseCase.js";
import { GetAllEventsUseCase } from "../../application/usecases/event/GetAllEventsUseCase.js";
import { GetEventByIdUseCase } from "../../application/usecases/event/GetEventByIdUseCase.js";
import { UpdateEventUseCase } from "../../application/usecases/event/UpdateEventUseCase.js";
import { DeleteEventUseCase } from "../../application/usecases/event/DeleteEventUseCase.js";
import { QrCodeGenerator } from "../../utility/qr-code-generator.js";
import { getEnvVariable } from "../../utility/utils.js";
import { MemoryOtpBackupCodeRepository } from "../../infrastructure/repositories/memory-otp-backup-code-repository.js";

class CryptoIdGenerator implements IDGenerator {
  generate(): string {
    return randomUUID();
  }
}

const eventRepository = new EventRepositoryDatabase();
const idGenerator = new CryptoIdGenerator();

export const eventController = new EventController(
  new CreateEventUseCase(eventRepository, idGenerator),
  new GetAllEventsUseCase(eventRepository),
  new GetEventByIdUseCase(eventRepository),
  new UpdateEventUseCase(eventRepository),
  new DeleteEventUseCase(eventRepository)
);

const appName = getEnvVariable("APP_NAME");

export const qrCodeGenerator = new QrCodeGenerator(appName);
export const otpBackupCodeRepository = new MemoryOtpBackupCodeRepository();