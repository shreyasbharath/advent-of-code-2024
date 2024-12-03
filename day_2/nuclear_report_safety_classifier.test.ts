import { expect, test } from "bun:test";

import { ReportClassification, classifyReportSafety } from "./nuclear_report_safety_classifier";

test("returns no classified reports if given an empty reports list", () => {
    const classified_reports = classifyReportSafety([]);

    expect(classified_reports).toStrictEqual([]);
});

test("returns unsafe if given a report that is increasing and decreasing", () => {
    const classified_reports = classifyReportSafety([<Report>{ levels: [7, 6, 4, 2, 1, 5] }]);

    expect(classified_reports).toStrictEqual([ReportClassification.Unsafe]);
});

test("returns unsafe if given a report that is neither increasing nor decreasing", () => {
    const classified_reports = classifyReportSafety([<Report>{ levels: [1, 1, 1, 1, 1] }]);

    expect(classified_reports).toStrictEqual([ReportClassification.Unsafe]);
});

test("returns safe if given a report that is increasing by a margin of <= 3", () => {
    const classified_reports = classifyReportSafety([<Report>{ levels: [1, 2, 3, 4, 7] }]);

    expect(classified_reports).toStrictEqual([ReportClassification.Safe]);
});

test("returns unsafe if given a report that is increasing by a margin of > 3", () => {
    const classified_reports = classifyReportSafety([<Report>{ levels: [1, 2, 3, 4, 8] }]);

    expect(classified_reports).toStrictEqual([ReportClassification.Unsafe]);
});

test("returns safe if given a report that is decreasing by a margin of <= 3", () => {
    const classified_reports = classifyReportSafety([<Report>{ levels: [8, 5, 3, 2, 1] }]);

    expect(classified_reports).toStrictEqual([ReportClassification.Safe]);
});

test("returns unsafe if given a report that is decreasing by a margin of > 3", () => {
    const classified_reports = classifyReportSafety([<Report>{ levels: [8, 3, 2, 1, 0] }]);

    expect(classified_reports).toStrictEqual([ReportClassification.Unsafe]);
});
