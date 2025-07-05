import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Use the login function from AuthContext
    login(username, password);
    
    // Navigate to appropriate dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">SmartHarvest</h1>
          <p className="mt-2 text-gray-600">Farm Management System</p>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter username (include 'owner' for Owner role)"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        
        <div className="p-4 mt-4 text-sm text-gray-600 bg-gray-50 rounded-md">
          <p className="font-medium">Demo Accounts:</p>
          <p>• Username: <span className="font-mono">owner@farmharvest.com</span> (Owner role)</p>
          <p>• Username: <span className="font-mono">supervisor@farmharvest.com</span> (Supervisor role)</p>
          <p>• Password: any value will work</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
