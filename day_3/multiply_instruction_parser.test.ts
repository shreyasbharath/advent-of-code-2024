import { expect, test } from "bun:test";

import { ParseMultiplyInstructions } from "./multiply_instruction_parser";

test("returns empty array for empty input", () => {
    const parsed = ParseMultiplyInstructions("");

    expect(parsed).toStrictEqual([]);
});

test("parses a valid mul instruction", () => {
    const parsed = ParseMultiplyInstructions("mul(1,2)");

    expect(parsed).toStrictEqual([{ operator: 'mul', lhs: 1, rhs: 2 }]);
});

test("parses a stream of valid mul instructions separated by whitespace", () => {
    const parsed = ParseMultiplyInstructions("mul(1,2) mul(2,3) mul(3,4)");

    expect(parsed).toStrictEqual([{ operator: 'mul', lhs: 1, rhs: 2 },
    { operator: 'mul', lhs: 2, rhs: 3 },
    { operator: 'mul', lhs: 3, rhs: 4 }]);
});
