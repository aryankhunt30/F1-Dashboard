import { parse } from 'csv-parse/sync';
import { Driver, Constructor, RaceResult } from './f1DataProcessor';

export async function loadCSVData<T>(filename: string): Promise<T[]> {
  try {
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}`);
    }
    const csvText = await response.text();
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });
    return records as T[];
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

export async function loadDrivers(): Promise<Driver[]> {
  return loadCSVData<Driver>('drivers.csv');
}

export async function loadConstructors(): Promise<Constructor[]> {
  return loadCSVData<Constructor>('constructors.csv');
}

export async function loadRaceResults(): Promise<RaceResult[]> {
  return loadCSVData<RaceResult>('results.csv');
} 