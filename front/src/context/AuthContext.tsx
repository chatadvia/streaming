import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn());

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token, userId } = await response.json();

      localStorage.setItem('token', token);
      setUser({ id: userId, name: 'Mock Name', email, role: 'USER' });
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (checkIfLoggedIn()) {
      setUser({ id: '1', name: 'Mock Name', email: 'mock@example.com', role: 'USER' });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
