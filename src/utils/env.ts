export const getEnvVar = (key: keyof ImportMetaEnv): string => {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

// Usage example
export const ENV = {
    API_URL: getEnvVar('VITE_API_URL'),
    APP_NAME: getEnvVar('VITE_APP_NAME'),
    APP_VERSION: getEnvVar('VITE_APP_VERSION'),
    APP_ENV: getEnvVar('VITE_APP_ENV'),
    PAYSTACK_KEY: getEnvVar('VITE_PAYSTACK_PUBLIC_KEY'),
    FLUTTERWAVE_KEY: getEnvVar('VITE_FLUTTERWAVE_PUBLIC_KEY'),
} as const; 