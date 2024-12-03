import { type Report } from './day_2/types';

export enum ReportClassification {
    Unsafe,
    Safe,
}

export function classifySafety(reports: Report[]): ReportClassification[] {
    reports.map((report) => {
        let prev_level = NaN;
        report.levels.forEach((level) => {
            if (isNaN(prev_level)) {
                prev_level = level;
                return;
            }
            if (prev_level < level) {
                return ReportClassification.Unsafe;
            }
            prev_level = level;
        });
    });
    return [];
}
