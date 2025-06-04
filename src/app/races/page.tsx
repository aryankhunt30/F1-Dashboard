'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { RaceResult } from '@/lib/data/f1DataProcessor';
import { loadRaceResults } from '@/lib/data/csvProcessor';

export default function RacesPage() {
  const [races, setRaces] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadRaceResults();
        setRaces(data);
      } catch (error) {
        console.error('Error loading races:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-screen flex items-center justify-center">
          <p className="text-xl text-gray-500">Loading races...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Races</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race) => (
            <div key={race.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{race.raceName}</h2>
                <p className="text-gray-500 mb-4">{race.date}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Winner</h3>
                    <p className="text-lg">{race.winner}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Circuit</h3>
                    <p className="text-lg">{race.circuit}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fastest Lap</h3>
                    <p className="text-lg">{race.fastestLap}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 