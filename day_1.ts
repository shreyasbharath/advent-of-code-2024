import { parseLocations } from './location_parser';
import { zip } from './utils';

export function computeTotalLocationsDistance(locations_1: number[], locations_2: number[]) {
    let location_pairs = zip(locations_1, locations_2);

    let totalDistance = location_pairs.reduce(function (accumulator, pair) {
        return accumulator + Math.abs(pair[0] - pair[1]);
    }, 0);

    return totalDistance;
}

let { locations_1, locations_2 } = parseLocations('./day_1.csv');

let sortedLocations1 = locations_1.sort()
let sortedLocations2 = locations_2.sort()

const totalDistance = computeTotalLocationsDistance(sortedLocations1, sortedLocations2);

console.log(totalDistance)
