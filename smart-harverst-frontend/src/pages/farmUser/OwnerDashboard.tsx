import React from 'react';
import BedCard from '../../components/BedCard';
import WeatherOverview from '../../components/WeatherOverview';
import { mockBeds } from '../../data/mockBeds';
import { useAuth } from '../../contexts/AuthContext';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Owner Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Owner'}</p>
      </div>
      
      <div className="grid gap-6 mb-8">
        <WeatherOverview />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Farm Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Total Beds</p>
            <p className="text-2xl font-bold">{mockBeds.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <p className="text-gray-500 text-sm">Needs Attention</p>
            <p className="text-2xl font-bold">
              {mockBeds.filter(bed => bed.health === 'needs-attention').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-gray-500 text-sm">Critical</p>
            <p className="text-2xl font-bold">
              {mockBeds.filter(bed => bed.health === 'critical').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Active Plans</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Farm Beds</h2>
          <div className="flex gap-2">
            <select className="border rounded-md px-3 py-1 text-sm">
              <option value="">All Beds</option>
              <option value="zone1">Zone 1</option>
              <option value="zone2">Zone 2</option>
            </select>
            <select className="border rounded-md px-3 py-1 text-sm">
              <option value="">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="warning">Needs Attention</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBeds.map((bed) => (
            <BedCard 
              key={bed.id} 
              bed={bed} 
              onClick={() => console.log(`Navigate to bed ${bed.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
