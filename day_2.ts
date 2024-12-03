import { parseLocations } from './location_parser';
import { countOccurrences } from './utils';

export function computeSimilarityScore(locations_1: number[], occurrences: Map<number, number>) {
    let similarityScore = locations_1.reduce(function (accumulator, location) {
        return accumulator + location * (occurrences.get(location) || 0);
    }, 0);

    return similarityScore;
}

let { locations_1, locations_2 } = parseLocations('./day_1.csv');

let occurrences = countOccurrences(locations_2);

let similarityScore = computeSimilarityScore(locations_1, occurrences);
console.log(similarityScore);
