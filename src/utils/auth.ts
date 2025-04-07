import { SocialAuthProvider, AuthResponse, AuthError, SocialAuthConfig } from '@/types/auth';
import { ENV } from './env';


const AUTH_CONFIGS: Record<SocialAuthProvider, SocialAuthConfig> = {
  google: {
    clientId: ENV.GOOGLE_CLIENT_ID!,
    redirectUri: `${ENV.API_URL}/api/auth/google/callback`,
  },
  facebook: {
    clientId: ENV.FACEBOOK_CLIENT_ID!,
    redirectUri: `${ENV.API_URL}/api/auth/facebook/callback`,
  },
  twitter: {
    clientId: ENV.TWITTER_CLIENT_ID!,
    redirectUri: `${ENV.API_URL}/api/auth/twitter/callback`,
  },
  github: {
    clientId: ENV.GITHUB_CLIENT_ID!,
    redirectUri: `${ENV.API_URL}/api/auth/github/callback`,
  },
};

export async function handleSocialAuth(provider: SocialAuthProvider): Promise<AuthResponse> {
  try {
    const config = AUTH_CONFIGS[provider];
    if (!config.clientId) {
      throw new Error(`${provider} client ID not configured`);
    }

    // Implementation will depend on your auth service
    // This is a placeholder for the actual implementation
    const response = await fetch(`/api/auth/${provider}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ redirectUri: config.redirectUri }),
    });

    if (!response.ok) {
      throw new Error(`${provider} authentication failed`);
    }

    return await response.json();
  } catch (error) {
    const authError = new Error(
      error instanceof Error ? error.message : 'Authentication failed'
    ) as AuthError;
    authError.provider = provider;
    throw authError;
  }
} 