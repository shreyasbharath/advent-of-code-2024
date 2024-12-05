import { type Report } from './day_2/types';
import { Trend, determineTrend } from '../shared/utils';

export enum ReportClassification {
    Unsafe = "unsafe",
    Safe = "safe",
}

export enum Dampen {
    False,
    True,
}

export function classifyReportSafety(reports: Report[], dampen: Dampen = Dampen.False): ReportClassification[] {
    let classified_reports = reports.map((report) => {
        let trendInfo = determineTrend(report.levels);

        if (dampen == Dampen.True && trendInfo.trend == Trend.Neither) {
            let dampenedLevels = report.levels.toSpliced(trendInfo.indexWhereTrendBroken!, 1);
            trendInfo = determineTrend(dampenedLevels);
        }

        if (trendInfo.trend == Trend.Increasing && trendInfo.maxDistance! <= 3) return ReportClassification.Safe;
        if (trendInfo.trend == Trend.Decreasing && trendInfo.maxDistance! <= 3) return ReportClassification.Safe;

        return ReportClassification.Unsafe;
    });
    return classified_reports;
}
