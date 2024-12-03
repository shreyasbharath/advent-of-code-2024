import { expect, test } from "bun:test";

import { Trend, type TrendInfo, determineTrend } from "./utils";

test("returns no trend for an array of size zero", () => {
    const trend = determineTrend([]);

    expect(trend).toStrictEqual({ trend: Trend.Neither });
});

test("returns no trend for an array of size 1", () => {
    const trend = determineTrend([1]);

    expect(trend).toStrictEqual({ trend: Trend.Neither });
});

test("returns increasing trend for a sequence of 1, 2", () => {
    const trend = determineTrend([1, 2]);

    expect(trend).toStrictEqual({ trend: Trend.Increasing, maxDistance: 1 });
});

test("returns decreasing trend for a sequence of 2, 1", () => {
    const trend = determineTrend([2, 1]);

    expect(trend).toStrictEqual({ trend: Trend.Decreasing, maxDistance: 1 });
});

test("returns no trend for a sequence of 1, 3, 2, 4, 5", () => {
    const trend = determineTrend([1, 3, 2, 4, 5]);

    expect(trend).toStrictEqual({ trend: Trend.Neither, indexWhereTrendBroken: 1 });
});

test("returns no trend for a sequence of 8,11,13,14,15,18,17", () => {
    const trend = determineTrend([8, 11, 13, 14, 15, 18, 17]);

    expect(trend).toStrictEqual({ trend: Trend.Neither, indexWhereTrendBroken: 6 });
});

test("returns increasing trend for a sequence of 1, 3, 7, 8, 9 with a max distance of 4", () => {
    const trend = determineTrend([1, 3, 7, 8, 9]);

    expect(trend).toStrictEqual({ trend: Trend.Increasing, maxDistance: 4 });
});

test("returns decreasing trend for a sequence of 20, 10, 3, 2, 1 with a max distance of 10", () => {
    const trend = determineTrend([20, 10, 3, 2, 1]);

    expect(trend).toStrictEqual({ trend: Trend.Decreasing, maxDistance: 10 });
});
