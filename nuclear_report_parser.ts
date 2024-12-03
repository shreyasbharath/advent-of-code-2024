import fs from 'node:fs';
import Papa from 'papaparse';

type Report = {
    levels: number[];
};

export function parseNuclearReports(filename: string): { reports: Report[] } {
    const file = fs.readFileSync(filename, 'utf8');

    let reports: Report[] = [];

    Papa.parse<number[]>(file, {
        delimiter: ' ',
        dynamicTyping: true,
        header: false,
        skipEmptyLines: true,
        step: (row) => {
            reports.push(<Report>{ levels: row.data as number[] });
        },
    });

    return { reports };
}
