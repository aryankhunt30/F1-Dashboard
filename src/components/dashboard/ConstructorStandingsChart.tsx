'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Constructor } from '@/lib/data/f1DataProcessor';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>
});

interface ConstructorStandingsChartProps {
  constructors: Constructor[];
}

export default function ConstructorStandingsChart({ constructors }: ConstructorStandingsChartProps) {
  if (!constructors || constructors.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No constructor data available</p>
      </div>
    );
  }

  const data = [{
    type: 'bar',
    x: constructors.map(constructor => constructor.name),
    y: constructors.map(constructor => constructor.points),
    name: 'Points',
    marker: {
      color: '#1E40AF'
    }
  }];

  const layout = {
    title: 'Constructor Standings',
    xaxis: {
      title: 'Team',
      tickangle: -45
    },
    yaxis: {
      title: 'Points'
    },
    margin: {
      b: 100
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  };

  return (
    <div className="h-[400px] bg-white rounded-lg shadow">
      <Plot
        data={data}
        layout={layout}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
} 