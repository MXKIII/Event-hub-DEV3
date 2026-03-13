import * as AnalyticsModel from '../model/analytics.model';
import type { IAnalyticsGateway } from './interface/analytics-gateway.interface';
import axios from 'axios';

export class SendAnalyticsApi implements IAnalyticsGateway {
    async sendAnalytics(event: AnalyticsModel.Event): Promise<void> {
        await axios.post('http://localhost:8100/analytics', event);
    }
}