import { Driver, Constructor, RaceResult } from '../data/f1DataProcessor';
import { loadDrivers, loadConstructors, loadRaceResults } from '../data/csvProcessor';

class DataFetcher {
  async getDriverStandings(): Promise<Driver[]> {
    const drivers = await loadDrivers();
    return drivers.sort((a, b) => b.points - a.points);
  }

  async getConstructorStandings(): Promise<Constructor[]> {
    const constructors = await loadConstructors();
    return constructors.sort((a, b) => b.points - a.points);
  }

  async getLastRace(): Promise<RaceResult | null> {
    const results = await loadRaceResults();
    return results[0] || null;
  }
}

export const dataFetcher = new DataFetcher(); 