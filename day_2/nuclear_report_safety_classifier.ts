import { type Report } from './day_2/types';
import { Trend, type TrendInfo, determineTrend } from '../shared/utils';

export enum ReportClassification {
    Unsafe = "unsafe",
    Safe = "safe",
}

export enum Dampen {
    False,
    True,
}

const MAX_DISTANCE_TO_CONSIDER_SAFE = 3;

function classifyTrend(trendInfo: TrendInfo) {
    if (trendInfo.trend == Trend.Increasing || trendInfo.trend == Trend.Decreasing) {
        if (trendInfo.maxDistance! <= MAX_DISTANCE_TO_CONSIDER_SAFE) {
            return ReportClassification.Safe;
        }
    }

    return ReportClassification.Unsafe;
}

function tryDampenReport(report: Report): ReportClassification {
    let dampenIndex = 0;
    while (dampenIndex < report.levels.length) {
        let dampenedLevels = report.levels.toSpliced(dampenIndex, 1);
        let trendInfo = determineTrend(dampenedLevels);
        let classification = classifyTrend(trendInfo);
        if (classification === ReportClassification.Safe) {
            return classification;
        }
        dampenIndex++;
    }
    console.log(report.levels);
    return ReportClassification.Unsafe;
}

export function classifyReportSafety(reports: Report[], dampen: Dampen = Dampen.False): ReportClassification[] {
    let classified_reports = reports.map((report) => {
        let trendInfo = determineTrend(report.levels);

        const classification = classifyTrend(trendInfo);
        if (dampen === Dampen.False) {
            return classification;
        }

        if (trendInfo.trend !== Trend.None && trendInfo.maxDistance! <= MAX_DISTANCE_TO_CONSIDER_SAFE) {
            return classification;
        }

        return tryDampenReport(report);
    });
    return classified_reports;
}
