import { expect, test } from "bun:test";

import { parseLocations } from "./location_parser";

test("parses a simple location file", () => {
    let { locations_1, locations_2 } = parseLocations('./sample_day_1.csv');

    expect(locations_1).toStrictEqual([3, 4, 2, 1, 3, 3]);
    expect(locations_2).toStrictEqual([4, 3, 5, 3, 9, 3]);
});
