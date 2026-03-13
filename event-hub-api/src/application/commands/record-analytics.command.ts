import type { IAnalyticsRepository } from "../../domain/interfaces/analytics-repository.interface.js";

export class RecordAnalyticsCommand {
  constructor(private readonly analyticsRepository: IAnalyticsRepository) {}

  async execute(event: { eventName: string; userId: string; page: string; timestamp: Date }) {
    await this.analyticsRepository.recordAnalytics(event);
  }
}