import fs from 'node:fs';
import Papa from 'papaparse';

export function parseLocations(filename: string): { locations_1: number[], locations_2: number[] } {
    type LocationPair = {
        Location1: number;
        Location2: number;
    };

    const file = fs.readFileSync(filename, 'utf8');

    let locations_1: number[] = [];
    let locations_2: number[] = [];

    Papa.parse<LocationPair>(file, {
        delimiter: '   ',
        dynamicTyping: true,
        header: false,
        skipEmptyLines: true,
        step: (row) => {
            const [col1, col2] = row.data as number[];
            if (col1 !== undefined && col2 !== undefined) {
                locations_1.push(col1);
                locations_2.push(col2);
            }
        },
    });

    return { locations_1, locations_2 };
}
