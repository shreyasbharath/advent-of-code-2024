import { parseNuclearReports } from '../day_2/nuclear_report_parser';
import { ReportClassification, classifyReportSafety } from './nuclear_report_safety_classifier';

let { reports } = parseNuclearReports('./day_2/data.csv');

const classified_reports = classifyReportSafety(reports);

let numSafeReports = classified_reports.reduce(function (accumulator, classified_report) {
    return accumulator + (classified_report == ReportClassification.Safe ? 1 : 0);
}, 0);

console.log(numSafeReports);
