import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-green-700 text-white' : 'text-green-700 hover:bg-green-100';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-green-700">SmartHarvest</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/dashboard')}`}
              >
                Dashboard
              </Link>
              <Link
                to="/tasks"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/tasks')}`}
              >
                Task List
              </Link>
              <Link
                to="/fertilizer-plans"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/fertilizer-plans')}`}
              >
                Fertilizer Plans
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {/* Add user profile/logout button here later */}
            <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Profile
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/dashboard"
            className={`block px-3 py-2 text-base font-medium rounded-md ${isActive('/dashboard')}`}
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            className={`block px-3 py-2 text-base font-medium rounded-md ${isActive('/tasks')}`}
          >
            Task List
          </Link>
          <Link
            to="/fertilizer-plans"
            className={`block px-3 py-2 text-base font-medium rounded-md ${isActive('/fertilizer-plans')}`}
          >
            Fertilizer Plans
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
