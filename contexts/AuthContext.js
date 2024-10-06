import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Set user and ensure role is defined
      setUser({
        ...userData,
        role: userData.role || 'employee', // Default to 'employee' if role not found
      });
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  const login = (userData) => {
    // Ensure userData has a role property
    const userWithRole = {
      ...userData,
      role: userData.role || 'employee', // Default role
    };

    setUser(userWithRole);
    localStorage.setItem('user', JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
