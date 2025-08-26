import React, { useState, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { login, register } from '../utils/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is already logged in from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: Validate token with backend and get user data
      // For now, we'll just assume user is logged in if token exists
      return { id: '1', name: 'User', email: 'user@example.com', avatar: '' } as User;
    }
    return null;
  });

  const loginHandler = async (email: string, password: string) => {
    const userData = await login(email, password);
    setUser(userData);
  };

  const registerHandler = async (userData: RegisterData) => {
    const newUser = await register(userData);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login: loginHandler,
      register: registerHandler,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}