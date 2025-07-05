import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-green-700 text-white' : 'text-green-700 hover:bg-green-100';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span className="mr-2">{user?.name || 'User'}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {user?.role === 'owner' ? 'Owner' : 'Supervisor'}
                </span>
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
