import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types/lead';

interface AuthContextType {
  authState: AuthState;
  loginUser: (token: string, user: User) => void;
  logoutUser: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuthState({
        token,
        user: JSON.parse(user),
        loading: false,
        error: null,
      });
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const loginUser = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      token,
      user,
      loading: false,
      error: null,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      token: null,
      user: null,
      loading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ authState, loginUser, logoutUser, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};