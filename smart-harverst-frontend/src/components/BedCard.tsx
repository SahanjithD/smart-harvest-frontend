import React from 'react';
import type { Bed } from '../types/bed';

interface BedCardProps {
  bed: Bed;
  onClick: (bedId: string) => void;
}

const BedCard: React.FC<BedCardProps> = ({ bed, onClick }) => {
  const healthColors = {
    'healthy': 'bg-primary-100 border-primary-500',
    'needs-attention': 'bg-yellow-100 border-yellow-500',
    'critical': 'bg-red-100 border-red-500'
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 75) return 'bg-red-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-primary-500';
  };

  return (
    <div
      className={`cursor-pointer rounded-lg border-l-4 p-4 shadow-md hover:shadow-lg transition-shadow ${healthColors[bed.health]}`}
      onClick={() => onClick(bed.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{bed.name}</h3>
        <span 
          className="px-2 py-1 rounded text-sm font-medium"
          style={{ 
            backgroundColor: bed.health === 'healthy' ? '#dcfce7' : 
                            bed.health === 'needs-attention' ? '#fef9c3' : '#fee2e2',
            color: bed.health === 'healthy' ? '#166534' : 
                   bed.health === 'needs-attention' ? '#854d0e' : '#991b1b'
          }}
        >
          {bed.health.replace('-', ' ')}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">{bed.cropType}</p>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div>
          <span className="text-gray-500">Temperature:</span>
          <span className="ml-1 font-medium">{bed.currentTemp}°C</span>
        </div>
        <div>
          <span className="text-gray-500">Humidity:</span>
          <span className="ml-1 font-medium">{bed.humidity}%</span>
        </div>
        <div>
          <span className="text-gray-500">Soil Moisture:</span>
          <span className="ml-1 font-medium">{bed.soilMoisture}%</span>
        </div>
        <div>
          <span className="text-gray-500">Last Watered:</span>
          <span className="ml-1 font-medium">{formatDate(bed.lastWatered)}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Fertilizer Progress</span>
          <span className="font-medium">{bed.fertilizerPlan.progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressBarColor(bed.fertilizerPlan.progress)}`}
            style={{ width: `${bed.fertilizerPlan.progress}%` }}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2">
        <p className="text-sm">
          <span className="text-gray-500">Next Task:</span>
          <span className="ml-1 font-medium">{bed.nextTask}</span>
        </p>
        <p className="text-sm text-gray-500">
          Due by {formatDate(bed.nextTaskDue)}
        </p>
      </div>
    </div>
  );
};

export default BedCard;
