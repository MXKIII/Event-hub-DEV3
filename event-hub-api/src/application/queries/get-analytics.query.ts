import {type IAnalyticsRepository } from "../../domain/interfaces/analytics-repository.interface.js";

export class GetAnalyticsQuery {
  constructor(private readonly analyticsRepository: IAnalyticsRepository) {}

  async execute(event: { eventName: string; userId: string; page: string; timestamp: Date }) {
    return this.analyticsRepository.getAnalytics();
  }
}