/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_PAYSTACK_PUBLIC_KEY: string
  readonly VITE_FLUTTERWAVE_PUBLIC_KEY: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENV: 'development' | 'production' | 'staging'
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 