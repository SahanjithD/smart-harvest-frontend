import React from 'react';
import { useParams } from 'react-router-dom';

const BedDetails: React.FC = () => {
  // Get the bed ID from the URL params
  const { bedId } = useParams<{ bedId: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bed Details</h1>
      {/* Content will be added later as requested */}
    </div>
  );
};

export default BedDetails;
