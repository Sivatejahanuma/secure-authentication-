import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('securex_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Verify and fetch authenticated user profile on application boot or token change
  const refreshUser = useCallback(async () => {
    const storedToken = localStorage.getItem('securex_token');
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return null;
    }

    try {
      setIsLoading(true);
      const data = await authAPI.getMe();
      if (data && data.success && data.user) {
        setUser(data.user);
        setToken(storedToken);
        setAuthError(null);
        return data.user;
      }
    } catch (err) {
      console.warn('[AuthContext] Session expired or invalid:', err.response?.data?.message || err.message);
      // Clean invalid credentials
      localStorage.removeItem('securex_token');
      localStorage.removeItem('securex_user');
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
    return null;
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Login handler
  const login = async (email, password) => {
    setAuthError(null);
    try {
      const data = await authAPI.login({ email, password });
      if (data && data.token) {
        localStorage.setItem('securex_token', data.token);
        if (data.user) {
          localStorage.setItem('securex_user', JSON.stringify(data.user));
          setUser(data.user);
        }
        setToken(data.token);
        return { success: true, user: data.user };
      }
      throw new Error(data.message || 'Login failed');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Authentication error';
      setAuthError(message);
      throw new Error(message);
    }
  };

  // Register handler
  const register = async (name, email, password, confirmPassword) => {
    setAuthError(null);
    try {
      const data = await authAPI.register({ name, email, password, confirmPassword });
      if (data && data.token) {
        localStorage.setItem('securex_token', data.token);
        if (data.user) {
          localStorage.setItem('securex_user', JSON.stringify(data.user));
          setUser(data.user);
        }
        setToken(data.token);
        return { success: true, user: data.user };
      }
      throw new Error(data.message || 'Registration failed');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration error';
      setAuthError(message);
      throw new Error(message);
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.warn('Logout API notification error:', err.message);
    } finally {
      localStorage.removeItem('securex_token');
      localStorage.removeItem('securex_user');
      setUser(null);
      setToken(null);
      setAuthError(null);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    authError,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
