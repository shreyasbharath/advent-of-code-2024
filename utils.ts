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
