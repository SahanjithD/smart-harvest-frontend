import React from 'react';

const FertilizerPlans: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Fertilizer Plans</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Plans</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Create New Plan
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <select className="border rounded-md px-3 py-2">
              <option value="">All Beds</option>
              <option value="bed1">Bed 1</option>
              <option value="bed2">Bed 2</option>
            </select>
            <select className="border rounded-md px-3 py-2">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        
        {/* Placeholder for fertilizer plans */}
        <div className="space-y-4">
          <p className="text-gray-500 italic">No active fertilizer plans. Create a new plan to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default FertilizerPlans;
