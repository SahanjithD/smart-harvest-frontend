import React from "react";
import { useNavigate } from "react-router-dom";
import StartingPageBack from "../assets/backgroundImages/StartingPageBack.jpg";

const StartingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${StartingPageBack})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-white drop-shadow-lg text-center mt-10">
          Welcome to Smart Harvest
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* Farm User Portal */}
          <div
            className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:bg-white/50 transition cursor-pointer"
            onClick={() => navigate("/farm-user/login")}
          >
            <span className="text-2xl font-semibold mb-4 text-green-800">Farm User Portal</span>
            <p className="text-white text-center">Login as a farm user to manage your farm operations.</p>
          </div>
          {/* Client User Portal */}
          <div
            className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:bg-white/50 transition cursor-pointer"
            onClick={() => navigate("/client-user/login")}
          >
            <span className="text-2xl font-semibold mb-4 text-blue-800">Client User Portal</span>
            <p className="text-white text-center">Login as a client to access your dashboard and services.</p>
          </div>
          {/* End User Portal */}
          <div
            className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:bg-white/50 transition cursor-pointer"
            onClick={() => navigate("/end-user/portal")}
          >
            <span className="text-2xl font-semibold mb-4 text-yellow-700">End User Portal</span>
            <p className="text-white text-center">Scan products and get details as an end user.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartingPage; 