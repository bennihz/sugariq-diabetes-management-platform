import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { mockPatients } from '../data/mockPatients';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, patientId?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('diabetes-app-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: UserRole, patientId?: string) => {
    let newUser: User;

    if (role === 'doctor') {
      newUser = {
        id: 'doctor-1',
        name: 'Dr. Afsoon',
        role: 'doctor',
        email: 'dr.afsoon@hospital.com',
        profileImage: '/dr-afsoon.jpeg',
      };
    } else {
      // For patient login, use the first patient or specified patient
      const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0];
      newUser = {
        id: patient.id,
        name: patient.name,
        role: 'patient',
        email: patient.email,
        profileImage: patient.profileImage,
      };
    }

    setUser(newUser);
    localStorage.setItem('diabetes-app-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('diabetes-app-user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
