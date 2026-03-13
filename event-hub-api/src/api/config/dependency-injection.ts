import { asClass, asValue, createContainer, InjectionMode } from "awilix";
import { getEnv } from "./get-env.js";
import  type { IAnalyticsRepository } from "../../domain/interfaces/analytics-repository.interface.js";
import  { RecordAnalyticsCommand } from "../../application/commands/record-analytics.command.js";
import  { GetAnalyticsQuery } from "../../application/queries/get-analytics.query.js";
import { MongoAnalyticsRepository } from "../../infrastructure/mongo-analytics-repository.js";


const jwtSecret = getEnv("JWT_SECRET");

export interface Dependencies {
    analyticsRepository: IAnalyticsRepository;
    recordAnalyticsCommand: RecordAnalyticsCommand;
    getAnalyticsQuery: GetAnalyticsQuery;
    jwtSecret: string;
}

const container = createContainer<Dependencies>({
    injectionMode: InjectionMode.CLASSIC
});

container.register({
    jwtSecret: asValue(jwtSecret),
    analyticsRepository: asClass(MongoAnalyticsRepository).singleton(),
    recordAnalyticsCommand: asClass(RecordAnalyticsCommand).singleton(),
    getAnalyticsQuery: asClass(GetAnalyticsQuery).singleton()
});

export default container;