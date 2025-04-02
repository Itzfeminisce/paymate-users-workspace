
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: ({name, email, password}: {name: string, email: string, password: string}) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        profilePicture: '', // Add empty profile picture
        token: '1234567890' // Add token
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async ({name, email, password}: {name: string, email: string, password: string}) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '1',
        email,
        name,
        profilePicture: '', // Add empty profile picture
        token: '1234567890' // Add token
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Mock request password reset function
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send an email with OTP
      // For mock purposes, we'll just store the email and a fake OTP in localStorage
      const mockOtp = '123456'; // In a real app, this would be generated and sent via email
      localStorage.setItem(`reset_${email}`, mockOtp);
      
      console.log('Password reset requested for:', email, 'OTP:', mockOtp);
      // In a real app, we would not log the OTP
    } finally {
      setIsLoading(false);
    }
  };

  // Mock reset password function
  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if OTP matches (in a real app, this would be validated on the server)
      const storedOtp = localStorage.getItem(`reset_${email}`);
      
      if (!storedOtp || storedOtp !== otp) {
        throw new Error('Invalid OTP');
      }
      
      // In a real app, we would update the password in the database
      console.log('Password reset successful for:', email);
      
      // Clean up
      localStorage.removeItem(`reset_${email}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
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
