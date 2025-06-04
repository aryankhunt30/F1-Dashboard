'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Constructor } from '@/lib/data/f1DataProcessor';
import { loadConstructors } from '@/lib/data/csvProcessor';

export default function ConstructorsPage() {
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadConstructors();
        setConstructors(data);
      } catch (error) {
        console.error('Error loading constructors:', error);
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
          <p className="text-xl text-gray-500">Loading constructors...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Constructors</h1>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Podiums</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {constructors.map((constructor) => (
                <tr key={constructor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{constructor.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{constructor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{constructor.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{constructor.wins}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{constructor.podiums}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 