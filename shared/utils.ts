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
    None = "none",
    Increasing = "increasing",
    Decreasing = "decreasing"
}

export type TrendInfo = {
    trend: Trend;
    maxDistance?: number;
    indexWhereTrendBroken?: number;
}

export function determineTrend(sequence: number[]): TrendInfo {
    if (sequence.length < 2) {
        return { trend: Trend.None };
    }

    let previousTrend = Trend.None;
    let currentTrend = Trend.None;
    let indexWhereTrendBroken = undefined;

    for (let i = 1; i < sequence.length; i++) {
        const diff = sequence[i] - sequence[i - 1];
        maxDistance = Math.max(maxDistance || 0, Math.abs(diff));

        if (diff == 0) {
            currentTrend = Trend.None;
            // console.log(`repeating ${indexWhereTrendBroken}, ${sequence[i - 1]}, ${sequence[i]}`);
        }
        else if (diff < 0) {
            currentTrend = Trend.Decreasing;
            // console.log(`decreasing ${indexWhereTrendBroken}, ${sequence[i - 1]}, ${sequence[i]}`);
        }
        else {
            currentTrend = Trend.Increasing;
            // console.log(`increasing ${indexWhereTrendBroken}, ${sequence[i - 1]}, ${sequence[i]}`);
        }

        // console.log(`previous ${previousTrend}, current ${currentTrend}`);
        if (previousTrend !== Trend.None && currentTrend !== previousTrend) {
            indexWhereTrendBroken = i;
            break;
        }

        previousTrend = currentTrend;
    }

    if (indexWhereTrendBroken !== undefined) {
        return { trend: Trend.None, indexWhereTrendBroken };
    }

    return { trend: currentTrend, maxDistance };
}
