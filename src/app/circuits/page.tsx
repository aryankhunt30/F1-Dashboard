'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';

interface Circuit {
  id: string;
  name: string;
  country: string;
  length: number;
  laps: number;
  fastestLap: string;
}

export default function CircuitsPage() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/circuits.csv');
        const data = await response.text();
        // Process circuit data here
        setCircuits([]); // Placeholder
      } catch (error) {
        console.error('Error loading circuits:', error);
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
          <p className="text-xl text-gray-500">Loading circuits...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Circuits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {circuits.map((circuit) => (
            <div key={circuit.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{circuit.name}</h2>
                <p className="text-gray-500 mb-4">{circuit.country}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Length</h3>
                    <p className="text-lg">{circuit.length} km</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Laps</h3>
                    <p className="text-lg">{circuit.laps}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fastest Lap</h3>
                    <p className="text-lg">{circuit.fastestLap}</p>
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