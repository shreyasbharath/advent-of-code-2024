import { type Report } from './day_2/types';
import { Trend, determineTrend } from '../shared/utils';

export enum ReportClassification {
    Unsafe = "unsafe",
    Safe = "safe",
}

export function classifyReportSafety(reports: Report[]): ReportClassification[] {
    let classified_reports = reports.map((report) => {
        const trendInfo = determineTrend(report.levels);

        if (trendInfo.trend == Trend.Increasing && trendInfo.maxDistance! <= 3) return ReportClassification.Safe;
        if (trendInfo.trend == Trend.Decreasing && trendInfo.maxDistance! <= 3) return ReportClassification.Safe;

        return ReportClassification.Unsafe;
    });
    return classified_reports;
}
