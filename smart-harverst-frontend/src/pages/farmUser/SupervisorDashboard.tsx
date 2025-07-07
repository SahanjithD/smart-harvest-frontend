import React from 'react';
import BedCard from '../../components/BedCard';
import WeatherOverview from '../../components/WeatherOverview';
import { mockBeds } from '../../data/mockBeds';
import { useAuth } from '../../contexts/AuthContext';

// Filter beds to simulate supervisor only seeing assigned beds
const filteredBeds = mockBeds.slice(0, 4); // Only show first 4 beds for supervisor

const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Supervisor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Supervisor'}</p>
      </div>
      
      <div className="grid gap-6 mb-8">
        <WeatherOverview />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">My Assigned Beds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Assigned Beds</p>
            <p className="text-2xl font-bold">{filteredBeds.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <p className="text-gray-500 text-sm">Needs Attention</p>
            <p className="text-2xl font-bold">
              {filteredBeds.filter(bed => bed.health === 'needs-attention').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-gray-500 text-sm">Critical</p>
            <p className="text-2xl font-bold">
              {filteredBeds.filter(bed => bed.health === 'critical').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Beds</h2>
          <select className="border rounded-md px-3 py-1 text-sm">
            <option value="">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="needs-attention">Needs Attention</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeds.map((bed) => (
            <BedCard 
              key={bed.id} 
              bed={bed} 
              onClick={() => console.log(`Navigate to bed ${bed.id}`)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ul className="divide-y">
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">Water Bed 2</p>
                <p className="text-sm text-gray-500">Due in 2 hours</p>
              </div>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                Mark Complete
              </button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">Apply Fertilizer to Bed 1</p>
                <p className="text-sm text-gray-500">Due today</p>
              </div>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                Mark Complete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
