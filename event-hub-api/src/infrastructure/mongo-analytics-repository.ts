import type { IAnalyticsRepository } from "../domain/interfaces/analytics-repository.interface.js";
import * as AnalyticsModel from "../domain/models/analytics.model.js";

export class MongoAnalyticsRepository implements IAnalyticsRepository {
    async recordAnalytics(event: { eventName: string; userId: string; page: string; timestamp: Date; }): Promise<void> {
        await AnalyticsModel.EventModel.create(event);
    }

    async getAnalytics(): Promise<{ _id: string; count: number; }[]> {
        const result = await AnalyticsModel.EventModel.aggregate([
            { $match: { eventName: "pageview" } },
            { $group: { _id: "$page", count: { $sum: 1 } } },
            { $sort: { count: -1} } // -1 DESC ; 1 ASC
        ]);
        return result; 
    }

    
}