import { SendAnalyticsApi } from "../analytics/api/send-analytics.api";
import { Dependencies } from "../../store/dependencies";
import { type AppStore, createStore } from "../../store/store";
import { FetchAnalyticsDataApi } from "../dashboard/api/fetch-analytics-data.api";
import { FetchEventsApi } from "../event/api/fetch-events.api";

export class App{
    public dependencies:Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            analyticsGateway: new SendAnalyticsApi(),
            dashboardQuery: new FetchAnalyticsDataApi(),
            eventGateway: new FetchEventsApi(), // ← add
        };
    }}

export const app = new App();