import React from "react";
import { useNavigate } from "react-router-dom";

const StartingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Welcome to Smart Harvest</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition cursor-pointer" onClick={() => navigate("/farm-user/login")}> 
          <span className="text-2xl font-semibold mb-4 text-green-700">Farm User Portal</span>
          <p className="text-gray-600 mb-2 text-center">Login as a farm user to manage your farm operations.</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition cursor-pointer" onClick={() => navigate("/client-user/login")}> 
          <span className="text-2xl font-semibold mb-4 text-blue-700">Client User Portal</span>
          <p className="text-gray-600 mb-2 text-center">Login as a client to access your dashboard and services.</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition cursor-pointer" onClick={() => navigate("/end-user/portal")}> 
          <span className="text-2xl font-semibold mb-4 text-yellow-700">End User Portal</span>
          <p className="text-gray-600 mb-2 text-center">Scan products and get details as an end user.</p>
        </div>
      </div>
    </div>
  );
};

export default StartingPage; 