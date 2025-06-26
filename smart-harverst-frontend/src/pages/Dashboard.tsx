import React from 'react';
import BedCard from '../components/BedCard';
import WeatherOverview from '../components/WeatherOverview';
import { mockBeds } from '../data/mockBeds';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Supervisor Dashboard</h1>
      <div className="grid gap-6 mb-8">
        <WeatherOverview />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBeds.map((bed) => (
          <BedCard key={bed.id} bed={bed} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
