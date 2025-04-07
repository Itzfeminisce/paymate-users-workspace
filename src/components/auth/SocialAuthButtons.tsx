import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { SocialAuthProvider, AuthResponse } from '@/types/auth';
import { 
  Google,
  Facebook,
  // Twitter,
  // Github,
} from '@/components/ui/icons';
import { useSocialAuth } from '@/hooks/useSocialAuth';

interface SocialAuthButtonsProps {
  onSuccess?: (response: AuthResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
  providers?: SocialAuthProvider[];
}

const PROVIDER_ICONS = {
  google: Google,
  facebook: Facebook,
  // twitter: Twitter,
  // github: Github,
};

const PROVIDER_COLORS = {
  google: 'hover:bg-red-50',
  facebook: 'hover:bg-blue-50',
  twitter: 'hover:bg-sky-50',
  github: 'hover:bg-gray-50',
};

export function SocialAuthButtons({
  onSuccess,
  onError,
  redirectTo = '/',
  providers = ['google'], // Default to Google only
}: SocialAuthButtonsProps) {
  const { isLoading, handleAuth } = useSocialAuth({
    onSuccess,
    onError,
    redirectTo,
  });

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full space-y-4 "
    >
      {providers.map((provider) => {
        const Icon = PROVIDER_ICONS[provider];
        const hoverColor = PROVIDER_COLORS[provider];

        return (
          <Button
            key={provider}
            variant="outline"
            type="button"
            disabled={isLoading !== null}
            onClick={() => handleAuth(provider)}
            className={`w-full flex items-center justify-center gap-2 border border-gray-300 ${hoverColor}`}
          >
            {isLoading === provider ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
            <span>Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
          </Button>
        );
      })}
      
      {providers.length > 0 && (
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
      )}
    </motion.div>
  );
}
