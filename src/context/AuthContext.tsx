import { toast } from '@/components/ui/use-toast';
import {  User } from '@/hooks/api-hooks';
import { useAxios } from '@/hooks/use-axios';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { handleAxiosError } from '@/utils/axios-error';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

export const STORAGE_KEY = '__paymate_user';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: ({ name, email, password, referral_code }: { name: string, email: string, password: string, referral_code: string }) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { value: _store, setValue: _setStore, deleteValue: _deleteStore, clear: _clearStore } = useLocalStorage<User | null>(STORAGE_KEY, null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!_store);
  const [user, setUser] = useState<User | null>(_store);
  const queryClient = useQueryClient();
  
  const [isLoading, setIsLoading] = useState(false);

  const { Post } = useAxios();

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await Post('/users/customer/login', {
        email,
        password
      });

      const user = response.data;

      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone_number: user.phone_number || '',
        profilePicture: user.profile_picture,
        referral_id: `${window.location.origin}/sign-up?ref=${user.referral_id}`,
        token: user.accessToken
      };

      // Save to localStorage with token
      _setStore(userData);
      setUser(userData);
      setIsAuthenticated(true);
      redirect('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async ({ name, email, password, referral_code }: { name: string, email: string, password: string, referral_code: string }) => {
    setIsLoading(true);
    try {
      const response = await Post('/users/customer/signup', {
        name,
        email,
        password,
        referral_code
      });

      const user = response.data;

      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone_number: user.phone_number || '',
        profilePicture: user.profile_picture,
        referral_id: `${window.location.origin}/sign-up?ref=${user.referral_id}`,
        token: user.accessToken
      };

      _setStore(userData);
      setUser(userData);
      setIsAuthenticated(true);
      redirect('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await Post('/users/customer/logout', {});

      if (response.statusCode === 200) {

        // invalidate ALL query cache
        await queryClient.invalidateQueries();


        toast({
          title: 'Logout successful',
          description: 'You have been logged out successfully',
        });
      }

      redirect('/sign-in');
    } catch (error) {
      const errorResponse = handleAxiosError(error);
      toast({
        title: errorResponse.title || 'Logout failed',
        description: errorResponse.message || 'Unable to logout',
        variant: errorResponse.variant || 'default',
      });

    } finally {
      // Still clear local state even if API fails
      _clearStore();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Request password reset function
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await Post('/users/customer/request-reset', { email });

      // In a real app, the OTP would be sent via email from the backend
      console.log('Password reset requested for:', email);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await Post('/users/customer/reset-password', {
        email,
        otp,
        newPassword
      });

      console.log('Password reset successful for:', email);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state
  // useEffect(() => {
   
  //   const initAuth = () => {
  //     console.log({_store});
      
  //     if (_store) {
  //       setUser(_store);
  //       setIsAuthenticated(true);
  //     }else{
  //       console.log("No user found");
        
  //       _deleteStore();
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     }
  //     setIsLoading(false);
  //   };

  //   initAuth();
  // }, [_store]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      signup,
      logout,
      requestPasswordReset,
      resetPassword
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