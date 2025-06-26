import React from 'react';
import { mockBeds } from '../data/mockBeds';
import BedCard from './BedCard';
import WeatherOverview from './WeatherOverview';

const SupervisorDashboard: React.FC = () => {
  const handleBedClick = (bedId: string) => {
    // This will be implemented when we add routing to show bed details
    console.log('Clicked bed:', bedId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Supervisor Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Beds Overview Section */}
        <section className="dashboard-section col-span-full lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Beds Under Supervision</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockBeds.map((bed) => (
                <BedCard
                  key={bed.id}
                  bed={bed}
                  onClick={handleBedClick}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Weather Overview Section */}
        <section className="dashboard-section lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Weather Overview</h2>
            <WeatherOverview />
          </div>
        </section>

        {/* Fertilizer Plans Overview */}
        <section className="dashboard-section col-span-full">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Fertilizer Plans</h2>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Fertilizer plans timeline coming soon...</p>
            </div>
          </div>
        </section>

        {/* Task List Overview */}
        <section className="dashboard-section col-span-full">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Task List</h2>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Task list coming soon...</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
