import React from "react";
import { useNavigate } from "react-router-dom";

const ClientRegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle registration logic
    navigate("/client-user/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Client User Registration</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Name" />
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Email" type="email" />
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Password" type="password" />
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Company Name" />
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Location" />
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Contact Details" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Register</button>
        </form>
        <div className="text-center mt-4">
          <a href="/client-user/login" className="text-blue-500 hover:underline">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default ClientRegisterPage; 