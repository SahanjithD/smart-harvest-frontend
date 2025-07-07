import React from "react";
import { useNavigate } from "react-router-dom";

const ClientLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle authentication logic
    navigate("/client-user/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Client User Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Email" type="email" />
          <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Password" type="password" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
        </form>
        <div className="text-center mt-4">
          <a href="/client-user/register" className="text-blue-500 hover:underline">Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
};

export default ClientLoginPage; 