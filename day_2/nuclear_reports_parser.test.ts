import { expect, test } from "bun:test";

import { parseNuclearReports } from "./nuclear_report_parser";

test("parses a simple location file", () => {
    let { reports } = parseNuclearReports('./day_2/sample_data.csv');

    expect(reports).toStrictEqual([<Report>{ levels: [7, 6, 4, 2, 1, 5] },
    <Report>{ levels: [1, 2, 7, 8] },
    <Report>{ levels: [9, 7, 6, 2, 1] },
    <Report>{ levels: [1, 3, 2, 4, 5, 6, 7, 8, 9] },
    <Report>{ levels: [8, 6, 4, 4, 1] },
    <Report>{ levels: [1, 3, 6, 7, 9] }]
    );
});
