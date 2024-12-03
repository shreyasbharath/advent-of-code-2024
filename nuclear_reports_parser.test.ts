import { expect, test } from "bun:test";

import { parseNuclearReports } from "./nuclear_report_parser";

test("parses a simple location file", () => {
    let { reports } = parseNuclearReports('./sample_day_2.csv');

    expect(reports[0]).toStrictEqual(<Report>{ levels: [7, 6, 4, 2, 1] });
});
