'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Circuit } from '@/lib/data/f1DataProcessor';
import { f1DataProcessor } from '@/lib/data/f1DataProcessor';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>
});

export default function CircuitAnalysis() {
  const [circuitData, setCircuitData] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const circuits = await f1DataProcessor.getCircuitData();
        setCircuitData(circuits);
      } catch (error) {
        console.error('Error fetching circuit data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading circuit analysis...</div>;
  }

  const data = [{
    type: 'bar',
    x: circuitData.map(circuit => circuit.name),
    y: circuitData.map(circuit => circuit.length),
    name: 'Circuit Length (km)'
  }];

  const layout = {
    title: 'Circuit Analysis',
    xaxis: {
      title: 'Circuit',
      tickangle: -45
    },
    yaxis: {
      title: 'Length (km)'
    },
    margin: {
      b: 100
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Circuit Analysis</h2>
      <div className="h-[400px]">
        <Plot
          data={data}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
} 