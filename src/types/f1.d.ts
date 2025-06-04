declare module '@/lib/data/f1DataProcessor' {
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

  export const f1DataProcessor: {
    getDriverStandings(): Promise<Driver[]>;
    getConstructorStandings(): Promise<Constructor[]>;
    getLastRaceResults(): Promise<RaceResult | null>;
    getDriverPerformanceMetrics(driverId: string): Promise<any>;
    getSeasonStats(): Promise<any>;
    calculateDriverIndex(results: any[]): number;
    analyzePitStops(raceData: any): any;
    analyzeWeatherImpact(raceData: any): any;
  };
} 