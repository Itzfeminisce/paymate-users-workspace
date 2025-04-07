import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { SocialAuthProvider, AuthResponse } from '@/types/auth';
import { handleSocialAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';


interface UseSocialAuthProps {
  onSuccess?: (response: AuthResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useSocialAuth({
  onSuccess,
  onError,
  redirectTo = '/',
}: UseSocialAuthProps = {}) {
  const [isLoading, setIsLoading] = useState<SocialAuthProvider | null>(null);
  const router = useNavigate();

  const handleAuth = useCallback(async (provider: SocialAuthProvider) => {
    try {
      setIsLoading(provider);
      const response = await handleSocialAuth(provider);
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      toast.success(`Successfully signed in with ${provider}`);
      router(redirectTo);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      toast.error(errorMessage);
      
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsLoading(null);
    }
  }, [onSuccess, onError, redirectTo, router]);

  return {
    isLoading,
    handleAuth,
  };
} 