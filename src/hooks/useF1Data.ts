import { useState, useEffect } from 'react';
import { Driver, Constructor, RaceResult } from '@/lib/data/f1DataProcessor';
import { f1DataProcessor } from '@/lib/data/f1DataProcessor';

export function useF1Data() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [lastRace, setLastRace] = useState<RaceResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversData, constructorsData, lastRaceData] = await Promise.all([
          f1DataProcessor.getDriverStandings(),
          f1DataProcessor.getConstructorStandings(),
          f1DataProcessor.getLastRaceResults()
        ]);

        setDrivers(driversData);
        setConstructors(constructorsData);
        setLastRace(lastRaceData);
      } catch (error) {
        console.error('Error fetching F1 data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    drivers,
    constructors,
    lastRace,
    loading
  };
} 