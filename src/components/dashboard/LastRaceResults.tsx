'use client';

import { RaceResult } from '@/lib/data/f1DataProcessor';

interface LastRaceResultsProps {
  race: RaceResult | null;
}

export default function LastRaceResults({ race }: LastRaceResultsProps) {
  if (!race) {
    return <div>No race data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">{race.raceName}</h3>
        <p className="text-gray-500">{race.date}</p>
        <p className="text-gray-500">{race.circuit}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {race.results.map((result) => (
              <tr key={result.position}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.driver}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.team}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 