import { type Report } from './day_2/types';
import { Trend, type TrendInfo, determineTrend } from '../shared/utils';

export enum ReportClassification {
    Unsafe = "unsafe",
    Safe = "safe",
}

export type ClassifiedReport = {
    report: Report;
    classification: ReportClassification;
    dampened: boolean;
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
        let classification = classifyTrend(determineTrend(dampenedLevels));
        if (classification === ReportClassification.Safe) {
            return classification;
        }
        dampenIndex++;
    }
    return ReportClassification.Unsafe;
}

export function classifyReportSafety(reports: Report[], dampen: Dampen = Dampen.False): ClassifiedReport[] {
    let classified_reports = reports.map((report) => {
        let trendInfo = determineTrend(report.levels);

        const classification = classifyTrend(trendInfo);
        if (dampen === Dampen.False) {
            return { report: report, classification: classification, dampened: false };
        }

        if (trendInfo.trend !== Trend.None && trendInfo.maxDistance! <= MAX_DISTANCE_TO_CONSIDER_SAFE) {
            return { report: report, classification: classification, dampened: false };
        }

        const dampenedClassification = tryDampenReport(report);
        return { report: report, classification: dampenedClassification, dampened: true };
    });
    return classified_reports;
}
