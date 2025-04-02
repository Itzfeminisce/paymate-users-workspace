import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import Google from '../ui/icons/google';


interface SocialAuthButtonsProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  isLoading?: boolean;
  redirectTo?: string;
}

export function SocialAuthButtons({
  onSuccess,
  onError,
  isLoading = false,
  redirectTo = '/',
}: SocialAuthButtonsProps) {
  const [loading, setLoading] = useState(isLoading);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Implement actual Google auth logic here
      // This is a placeholder for the actual implementation
      console.log('Google sign-in initiated');
      
      // Simulate success after auth
      setTimeout(() => {
        setLoading(false);
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (onError) onError(error as Error);
      console.error('Google sign-in failed:', error);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full space-y-4"
    >
      <Button
        variant="outline"
        type="button"
        disabled={loading}
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 py-5 border border-gray-300 hover:bg-gray-50"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary" />
        ) : (
          <Google className="h-5 w-5" />
        )}
        <span>Continue with Google</span>
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </motion.div>
  );
}
