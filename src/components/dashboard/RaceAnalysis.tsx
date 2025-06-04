'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { RaceResult } from '@/lib/data/f1DataProcessor';
import { f1DataProcessor } from '@/lib/data/f1DataProcessor';
import { Card } from '@/components/shared/Card';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>
});

interface LapData {
  lap: number;
  position: number;
  lapTime: number;
  driver: string;
  team: string;
}

export default function RaceAnalysis() {
  const [raceData, setRaceData] = useState<RaceResult[]>([]);
  const [lapData, setLapData] = useState<LapData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const races = await f1DataProcessor.getRaceResults();
        setRaceData(races);
      } catch (error) {
        console.error('Error fetching race data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading race analysis...</div>;
  }

  const data = [{
    type: 'scatter',
    mode: 'lines+markers',
    x: raceData.map(race => race.date),
    y: raceData.map(race => race.results.length),
    name: 'Number of Finishers'
  }];

  const layout = {
    title: 'Race Analysis',
    xaxis: {
      title: 'Race Date'
    },
    yaxis: {
      title: 'Number of Finishers'
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Race Analysis</h2>
        <div className="h-[400px]">
          <Plot
            data={data}
            layout={layout}
            config={{ responsive: true }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </Card>

      <Card className="bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Final Classification</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {raceData.map((race) =>
                race.results.map((result) => (
                  <tr key={result.position}>
                    <td className="px-6 py-4 whitespace-nowrap">{result.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{result.driver}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{result.team}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{result.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{result.points}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 