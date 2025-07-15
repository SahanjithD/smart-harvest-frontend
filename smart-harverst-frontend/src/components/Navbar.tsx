import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                SmartHarvest
              </span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/dashboard') || isActive('/owner-dashboard') || isActive('/supervisor-dashboard')
                    ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500 shadow-sm'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/tasks"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/tasks')
                    ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500 shadow-sm'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Task List
              </Link>
              {user?.role !== 'owner' && (
                <Link
                  to="/fertilizer-plans"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive('/fertilizer-plans')
                      ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500 shadow-sm'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Fertilizer Plans
                </Link>
              )}
            </div>
          </div>
          
          {/* User profile menu and mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* User profile dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                }}
                className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full pl-2 pr-3 py-1 hover:shadow-md transition-all"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-800 hidden sm:block">{user?.name || 'User'}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full hidden sm:block ${
                  user?.role === 'owner' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {user?.role === 'owner' ? 'Owner' : 'Supervisor'}
                </span>
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-100">
                  <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                    Signed in as <span className="font-medium text-gray-800">{user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/dashboard') || isActive('/owner-dashboard') || isActive('/supervisor-dashboard')
                  ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/tasks')
                  ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Task List
            </Link>
            {user?.role !== 'owner' && (
              <Link
                to="/fertilizer-plans"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/fertilizer-plans')
                    ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Fertilizer Plans
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
