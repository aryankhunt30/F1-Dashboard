import { loadCSVData } from './csvProcessor';

export interface Driver {
  id: string;
  name: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
  position: number;
}

export interface Constructor {
  id: string;
  name: string;
  points: number;
  wins: number;
  podiums: number;
  position: number;
}

export interface RaceResult {
  id: string;
  raceName: string;
  date: string;
  circuit: string;
  winner: string;
  fastestLap: string;
  results: {
    position: number;
    driver: string;
    team: string;
    time: string;
    points: number;
  }[];
}

export interface Circuit {
  id: string;
  name: string;
  country: string;
  length: number;
  laps: number;
  fastestLap: string;
}

class F1DataProcessor {
  private static instance: F1DataProcessor;

  private constructor() {}

  public static getInstance(): F1DataProcessor {
    if (!F1DataProcessor.instance) {
      F1DataProcessor.instance = new F1DataProcessor();
    }
    return F1DataProcessor.instance;
  }

  async getDriverStandings(): Promise<Driver[]> {
    try {
      const drivers = await loadCSVData<Driver>('drivers.csv');
      return drivers.sort((a, b) => b.points - a.points);
    } catch (error) {
      console.error('Error fetching driver standings:', error);
      return [];
    }
  }

  async getConstructorStandings(): Promise<Constructor[]> {
    try {
      const constructors = await loadCSVData<Constructor>('constructors.csv');
      return constructors.sort((a, b) => b.points - a.points);
    } catch (error) {
      console.error('Error fetching constructor standings:', error);
      return [];
    }
  }

  async getLastRaceResults(): Promise<RaceResult | null> {
    try {
      const races = await loadCSVData<RaceResult>('races.csv');
      return races[races.length - 1] || null;
    } catch (error) {
      console.error('Error fetching last race results:', error);
      return null;
    }
  }

  async getCircuitData(): Promise<Circuit[]> {
    try {
      const circuits = await loadCSVData<Circuit>('circuits.csv');
      return circuits;
    } catch (error) {
      console.error('Error fetching circuit data:', error);
      return [];
    }
  }

  async getRaceResults(): Promise<RaceResult[]> {
    try {
      const races = await loadCSVData<RaceResult>('races.csv');
      return races;
    } catch (error) {
      console.error('Error fetching race results:', error);
      return [];
    }
  }

  // Helper method to calculate driver performance index
  calculateDriverIndex(results: any[]): number {
    // This would implement a complex algorithm considering:
    // - Qualifying performance
    // - Race finish position vs grid position
    // - Points scored vs expected points
    // - Teammate comparison
    // - Consistency across races
    return 0; // Placeholder
  }

  // Helper method to analyze pit stop strategies
  analyzePitStops(raceData: any) {
    // This would analyze:
    // - Timing of pit stops
    // - Tire compound choices
    // - Impact on race position
    // - Comparison with competitors
    return {}; // Placeholder
  }

  // Helper method for weather impact analysis
  analyzeWeatherImpact(raceData: any) {
    // This would analyze:
    // - Lap times in different conditions
    // - Tire performance
    // - Strategy adaptations
    // - Driver performance in wet vs dry
    return {}; // Placeholder
  }
}

export const f1DataProcessor = F1DataProcessor.getInstance(); 