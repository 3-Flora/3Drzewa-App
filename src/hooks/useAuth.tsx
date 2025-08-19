import React, { useState, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { login as mockLogin, register as mockRegister } from '../utils/api';

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
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const userData = await mockLogin(email, password);
    setUser(userData);
  };

  const register = async (userData: RegisterData) => {
    const newUser = await mockRegister(userData);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
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