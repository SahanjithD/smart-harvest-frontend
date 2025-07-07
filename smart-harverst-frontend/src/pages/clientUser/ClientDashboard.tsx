import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Jane Doe",
  profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
  company: "AgroClient Ltd.",
  location: "Colombo, Sri Lanka",
  contact: "+94 77 123 4567",
};

const summary = {
  accessedFarms: 5,
  harvestSections: 12,
  completedDeals: 8,
  canceledDeals: 2,
  netProgress: "85%",
};

const accessedFarms = [
  { id: 1, name: "Green Valley Farm" },
  { id: 2, name: "Sunrise Fields" },
];
const notAccessedFarms = [
  { id: 3, name: "Blue Lake Farm" },
  { id: 4, name: "Red Hill Farm" },
];

const ClientDashboard: React.FC = () => {
  const [showAccessed, setShowAccessed] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/client-user/dashboard")}> 
          <img src={mockUser.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-3 border-2 border-blue-400" />
          <span className="font-semibold text-blue-800 text-lg">{mockUser.name}</span>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition" onClick={() => navigate("/client-user/login")}>Logout</button>
      </nav>

      {/* Summary Bar */}
      <div className="bg-blue-100 rounded-xl shadow flex flex-wrap justify-between items-center px-8 py-6 mt-6 mx-auto max-w-4xl">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700">{summary.accessedFarms}</span>
          <span className="text-gray-600">Accessed Farms</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-green-700">{summary.harvestSections}</span>
          <span className="text-gray-600">Harvest Sections</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-emerald-700">{summary.completedDeals}</span>
          <span className="text-gray-600">Completed Deals</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-red-700">{summary.canceledDeals}</span>
          <span className="text-gray-600">Canceled Deals</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-indigo-700">{summary.netProgress}</span>
          <span className="text-gray-600">Net Progress</span>
        </div>
        <div className="flex flex-col items-center ml-8">
          <span className="font-semibold text-blue-800">{mockUser.company}</span>
          <span className="text-gray-600 text-sm">{mockUser.location}</span>
          <span className="text-gray-600 text-sm">{mockUser.contact}</span>
        </div>
      </div>

      {/* Toggleable Farm Panel */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex justify-center mb-4">
          <button
            className={`px-6 py-2 rounded-l-lg font-semibold border ${showAccessed ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setShowAccessed(true)}
          >
            Accessed Farms
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-semibold border -ml-px ${!showAccessed ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setShowAccessed(false)}
          >
            Not Accessed Farms
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(showAccessed ? accessedFarms : notAccessedFarms).map(farm => (
            <div
              key={farm.id}
              className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(showAccessed ? `/client-user/farm/accessed/${farm.id}` : `/client-user/farm/not-accessed/${farm.id}`)}
            >
              <span className="font-semibold text-blue-700 text-lg">{farm.name}</span>
              <span className="text-sm text-gray-400">{showAccessed ? "Accessed" : "Not Accessed"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 