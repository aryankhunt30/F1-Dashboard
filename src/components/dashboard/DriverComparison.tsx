import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from '@/components/shared/Card';
import { Driver } from '@/lib/data/f1DataProcessor';

interface ComparisonMetric {
  label: string;
  driver1Value: number;
  driver2Value: number;
  description: string;
}

interface DriverComparisonProps {
  driver1?: Driver;
  driver2?: Driver;
  onDriverSelect: (position: 1 | 2, driverId: string) => void;
  availableDrivers: Driver[];
}

export function DriverComparison({
  driver1,
  driver2,
  onDriverSelect,
  availableDrivers
}: DriverComparisonProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>('points');

  const metrics: ComparisonMetric[] = driver1 && driver2 ? [
    {
      label: 'Championship Points',
      driver1Value: driver1.points,
      driver2Value: driver2.points,
      description: 'Total points scored in the current season'
    },
    {
      label: 'Race Wins',
      driver1Value: driver1.wins,
      driver2Value: driver2.wins,
      description: 'Number of race victories'
    },
    {
      label: 'Podium Finishes',
      driver1Value: driver1.podiums,
      driver2Value: driver2.podiums,
      description: 'Total podium appearances (top 3 finishes)'
    },
    {
      label: 'Fastest Laps',
      driver1Value: driver1.fastestLaps,
      driver2Value: driver2.fastestLaps,
      description: 'Number of fastest laps achieved'
    }
  ] : [];

  const plotData = [
    {
      type: 'bar',
      name: driver1?.name || 'Driver 1',
      x: metrics.map(m => m.label),
      y: metrics.map(m => m.driver1Value),
      marker: { color: '#FF1E1E' }
    },
    {
      type: 'bar',
      name: driver2?.name || 'Driver 2',
      x: metrics.map(m => m.label),
      y: metrics.map(m => m.driver2Value),
      marker: { color: '#3671C6' }
    }
  ];

  const layout = {
    barmode: 'group',
    title: 'Driver Performance Comparison',
    xaxis: {
      title: 'Metrics'
    },
    yaxis: {
      title: 'Value'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      family: 'Inter, sans-serif'
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Driver 1
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={driver1?.id || ''}
              onChange={(e) => onDriverSelect(1, e.target.value)}
            >
              <option value="">Select Driver</option>
              {availableDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} ({driver.team})
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Driver 2
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={driver2?.id || ''}
              onChange={(e) => onDriverSelect(2, e.target.value)}
            >
              <option value="">Select Driver</option>
              {availableDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} ({driver.team})
                </option>
              ))}
            </select>
          </div>
        </div>

        {driver1 && driver2 ? (
          <div className="h-[400px]">
            <Plot
              data={plotData}
              layout={layout}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            Select two drivers to compare their performance
          </div>
        )}
      </Card>

      {driver1 && driver2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.label} className="bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">{metric.label}</h3>
              <p className="text-sm text-gray-600 mb-4">{metric.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500">{driver1.name}</p>
                  <p className="text-2xl font-bold text-red-600">
                    {metric.driver1Value}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">{driver2.name}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {metric.driver2Value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 