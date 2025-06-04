import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

// Helper function to read CSV file
async function readCSVFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

export async function GET(request: Request) {
  try {
    // Get the base path for our F1 data
    const dataPath = path.join(process.cwd(), 'F1', 'F1_cleaned');
    
    // Read the drivers data
    const driversData = await readCSVFile(path.join(dataPath, 'drivers.csv'));
    const racesData = await readCSVFile(path.join(dataPath, 'races.csv'));
    const resultsData = await readCSVFile(path.join(dataPath, 'results.csv'));
    
    // Process and transform the data
    const processedData = {
      drivers: driversData,
      races: racesData,
      results: resultsData,
      // Add more processed data as needed
    };

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error processing F1 data:', error);
    return NextResponse.json(
      { error: 'Failed to process F1 data' },
      { status: 500 }
    );
  }
}

// Additional endpoints for specific data requests
export async function getDriverStandings() {
  try {
    const dataPath = path.join(process.cwd(), 'F1', 'F1_cleaned');
    const resultsData = await readCSVFile(path.join(dataPath, 'results.csv'));
    
    // Process results to calculate current standings
    const standings = calculateDriverStandings(resultsData);
    return standings;
  } catch (error) {
    console.error('Error getting driver standings:', error);
    throw error;
  }
}

function calculateDriverStandings(results: any[]) {
  // Implementation of points calculation and standings
  // This would aggregate results and calculate total points
  return [];
}

// Add more API endpoints for different data needs 