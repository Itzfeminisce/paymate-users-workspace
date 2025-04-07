export type SocialAuthProvider = 'google' | 'facebook' | 'twitter' | 'github';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
  };
  token: string;
}

export interface SocialAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
}

export interface AuthError extends Error {
  code?: string;
  provider?: SocialAuthProvider;
} 