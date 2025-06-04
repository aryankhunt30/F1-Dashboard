'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/shared/DashboardLayout';

// Dynamically import analysis components
const RaceAnalysis = dynamic(
  () => import('@/components/dashboard/RaceAnalysis').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center">Loading race analysis...</div>
  }
);

const CircuitAnalysis = dynamic(
  () => import('@/components/dashboard/CircuitAnalysis').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center">Loading circuit analysis...</div>
  }
);

export default function AnalysisPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Analysis</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Race Analysis</h2>
            <Suspense fallback={<div>Loading race analysis...</div>}>
              <RaceAnalysis />
            </Suspense>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Circuit Analysis</h2>
            <Suspense fallback={<div>Loading circuit analysis...</div>}>
              <CircuitAnalysis />
            </Suspense>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 