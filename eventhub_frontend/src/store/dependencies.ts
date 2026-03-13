import type { IAnalyticsGateway } from "../modules/analytics/api/interface/analytics-gateway.interface";
import type { IDashboardQuery } from "../modules/dashboard/api/interfaces/dashboard-query.interface";
import type { IEventGateway } from "../modules/event/api/interface/event-gateway.interface";

export type Dependencies = {
    analyticsGateway: IAnalyticsGateway,
    dashboardQuery: IDashboardQuery,
    eventGateway: IEventGateway,
};