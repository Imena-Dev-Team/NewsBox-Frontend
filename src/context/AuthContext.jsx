import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // If user is a member and has a profile, we're good
          // If they're a member without profile data, they'll be redirected to complete profile
          console.log('Restored user from localStorage:', userData);
        } catch (_) {
          // ignore parse error and clear bad data
          localStorage.removeItem('user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    
    // Enhanced user data with profile information
    const enhancedUserData = {
      ...userData,
      hasProfile: userData.profile ? true : false,
      profileData: userData.profile || null
    };
    
    setUser(enhancedUserData);
    try {
      localStorage.setItem('user', JSON.stringify(enhancedUserData));
      console.log('User data saved to localStorage:', enhancedUserData);
    } catch (_) {
      console.error('Failed to save user data to localStorage');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('temp_token'); // Clean up any temp tokens
    setIsAuthenticated(false);
    setUser(null);
    console.log('User logged out successfully');
    // Navigation will be handled by the component using this context
  };

  const updateUser = (partialUser) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...(partialUser || {}) };
      try {
        localStorage.setItem('user', JSON.stringify(next));
      } catch (_) {
        // do nothing
      }
      return next;
    });
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
