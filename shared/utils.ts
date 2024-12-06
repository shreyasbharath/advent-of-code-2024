import * as fs from 'fs';

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
    let absDiff = undefined;

    for (let i = 1; i < sequence.length; i++) {
        const diff = sequence[i] - sequence[i - 1];
        absDiff = Math.max(absDiff || 0, Math.abs(diff));

        if (diff == 0) {
            currentTrend = Trend.None;
            break;
        }
        else if (diff < 0) {
            currentTrend = Trend.Decreasing;
        }
        else {
            currentTrend = Trend.Increasing;
        }

        if (previousTrend !== Trend.None && currentTrend !== previousTrend) {
            indexWhereTrendBroken = i;
            break;
        }

        previousTrend = currentTrend;
    }

    if (indexWhereTrendBroken !== undefined) {
        return { trend: Trend.None, indexWhereTrendBroken };
    }

    return { trend: currentTrend, maxDistance: absDiff };
}

function customJSONStringify(obj: any, space: number = 2): string {
    // First, stringify the object with formatting.
    const formatted = JSON.stringify(obj, null, space);

    // Then, replace arrays with their minified versions.
    return formatted.replace(
        /(\[\s*[^[]*?\])/g, // Matches arrays with newlines or indentation
        (match) => match.replace(/\s+/g, ' ') // Minifies array content
    );
}

export function writeObjectToFile(filePath: string, obj: any): void {
    try {
        const jsonData = customJSONStringify(obj);
        fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}
