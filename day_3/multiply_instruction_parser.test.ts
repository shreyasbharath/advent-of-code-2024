import { expect, test } from "bun:test";

import { ExecuteMultiplyInstructions, ParseMultiplyInstructions } from "./multiply_instruction_parser";

test("returns empty array for empty input", () => {
    const parsed = ParseMultiplyInstructions("");

    expect(parsed).toStrictEqual([]);
});

test("parses a valid mul instruction", () => {
    const parsed = ParseMultiplyInstructions("mul(1,2)");

    expect(parsed).toStrictEqual([{ operator: 'mul', lhs: 1, rhs: 2 }]);
});

test("does not a parse a mul instruction with more than three digit operators", () => {
    const parsed = ParseMultiplyInstructions("mul(3611,2)mul(1,2)");

    expect(parsed).toStrictEqual([
        { operator: 'invalid', lhs: 0, rhs: 0 },
        { operator: 'mul', lhs: 1, rhs: 2 }]);
});

test("parses a stream of valid mul instructions separated by whitespace", () => {
    const parsed = ParseMultiplyInstructions("mul(1,2) mul(2,3) mul(3,4)");

    expect(parsed).toStrictEqual([{ operator: 'mul', lhs: 1, rhs: 2 },
    { operator: 'mul', lhs: 2, rhs: 3 },
    { operator: 'mul', lhs: 3, rhs: 4 }]);
});

test("parses a stream of valid mul instructions separated by junk", () => {
    const parsed = ParseMultiplyInstructions("mul(1,2)abcmul(2,3)xyzmul(3,4)mul(4,5]mul(4,5!)mul(5,6]mul ( 2, 4 )");
    const totalMultiplied = ExecuteMultiplyInstructions(parsed);

    expect(totalMultiplied).toStrictEqual(20);
});

test("does not parse a mul instruction with whitespace", () => {
    const parsed = ParseMultiplyInstructions("mul (1,2)");
    const totalMultiplied = ExecuteMultiplyInstructions(parsed);

    expect(totalMultiplied).toStrictEqual(0);
});

test("parses a stream of valid mul instructions separated by junk", () => {
    const parsed = ParseMultiplyInstructions("mul(1,2)abcmul(2,3)xyzmul(3,4)mul(4,5]mul(4,5!)mul(5,6]mul ( 2, 4 )");
    const totalMultiplied = ExecuteMultiplyInstructions(parsed);

    expect(totalMultiplied).toStrictEqual(20);
});

test("Parses a stream of valid mul instructions separated by junk", () => {
    const parsed = ParseMultiplyInstructions("why(421,566)#mul(357where(305,979)what()*)*mul(775,55)");
    const totalMultiplied = ExecuteMultiplyInstructions(parsed);

    expect(totalMultiplied).toStrictEqual(42625);
});
