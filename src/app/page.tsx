'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Card } from '@/components/shared/Card';
import { useF1Data } from '@/hooks/useF1Data';
import DriverStandingsChart from '@/components/dashboard/DriverStandingsChart';
import ConstructorStandingsChart from '@/components/dashboard/ConstructorStandingsChart';
import LastRaceResults from '@/components/dashboard/LastRaceResults';
import RaceAnalysis from '@/components/dashboard/RaceAnalysis';
import CircuitAnalysis from '@/components/dashboard/CircuitAnalysis';

export default function DashboardPage() {
  const { drivers, constructors, lastRace, loading } = useF1Data();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-screen flex items-center justify-center">
          <p className="text-xl text-gray-500">Loading F1 data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Season Overview Card */}
        <Card className="col-span-full bg-white shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4">2024 Season Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-500">Completed Races</p>
              <p className="text-3xl font-bold">4</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Remaining Races</p>
              <p className="text-3xl font-bold">20</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Next Race</p>
              <p className="text-xl font-bold">Chinese GP</p>
            </div>
          </div>
        </Card>

        {/* Driver Standings Chart */}
        <div className="col-span-full lg:col-span-2">
          <DriverStandingsChart drivers={drivers} />
        </div>

        {/* Constructor Standings Chart */}
        <div className="col-span-full lg:col-span-2">
          <ConstructorStandingsChart constructors={constructors} />
        </div>

        {/* Quick Stats */}
        <Card className="bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Season Quick Stats</h2>
          <div className="space-y-3">
            {drivers.slice(0, 1).map(driver => (
              <div key={driver.id}>
                <p className="text-gray-500">Championship Leader</p>
                <p className="font-medium">{driver.name} ({driver.points} pts)</p>
              </div>
            ))}
            {constructors.slice(0, 1).map(constructor => (
              <div key={constructor.id}>
                <p className="text-gray-500">Leading Constructor</p>
                <p className="font-medium">{constructor.name} ({constructor.points} pts)</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Last Race Results */}
        <div className="col-span-full lg:col-span-2">
          <LastRaceResults race={lastRace} />
        </div>

        {/* Race Analysis */}
        <div className="col-span-full">
          <RaceAnalysis />
        </div>

        {/* Circuit Analysis */}
        <div className="col-span-full">
          <CircuitAnalysis />
        </div>
      </div>
    </DashboardLayout>
  );
} 