import { parseNuclearReports } from '../day_2/nuclear_report_parser';
import { classifySafety } from './nuclear_report_safety_classifier';

let { reports } = parseNuclearReports('./day_2/data.csv');

const safety = classifySafety(reports);

console.log(safety);
