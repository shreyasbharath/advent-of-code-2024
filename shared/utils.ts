export function zip<S1, S2>(firstCollection: Array<S1>, lastCollection: Array<S2>): Array<[S1, S2]> {
    const length = Math.min(firstCollection.length, lastCollection.length);
    const zipped: Array<[S1, S2]> = [];

    for (let index = 0; index < length; index++) {
        zipped.push([firstCollection[index], lastCollection[index]]);
    }

    return zipped;
}

export function countOccurrences(collection: Array<number>): Map<number, number> {
    const map = collection.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    return map;
}

export enum Trend {
    Neither = "neither",
    Increasing = "increasing",
    Decreasing = "decreasing"
}

export type TrendInfo = {
    trend: Trend;
    maxDistance?: number;
}

export function determineTrend(sequence: number[]): TrendInfo {
    if (sequence.length < 2) {
        return { trend: Trend.Neither };
    }

    let isIncreasing = true;
    let isDecreasing = true;
    let maxDistance = undefined;

    for (let i = 1; i < sequence.length; i++) {
        const diff = sequence[i] - sequence[i - 1];
        maxDistance = Math.max(maxDistance || 0, Math.abs(diff));

        if (diff <= 0) isIncreasing = false;
        if (diff >= 0) isDecreasing = false;
    }

    const trend =
        isIncreasing
            ? Trend.Increasing
            : isDecreasing
                ? Trend.Decreasing
                : Trend.Neither;

    return { trend, maxDistance };
}
