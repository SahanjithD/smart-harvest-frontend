import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type UserRole = 'owner' | 'supervisor';

interface UserInfo {
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  
  // Check for existing user info on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Invalid stored data
        localStorage.removeItem('userInfo');
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    // In a real app, this would call an API
    const isOwner = username.toLowerCase().includes('owner');
    
    const userInfo: UserInfo = {
      username,
      role: isOwner ? 'owner' : 'supervisor',
      name: username.split('@')[0] || username,
    };
    
    setUser(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
