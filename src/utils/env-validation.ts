export const validateEnv = () => {
    const requiredEnvVars = [
        'VITE_API_URL',
        'VITE_APP_NAME',
        'VITE_APP_VERSION',
        'VITE_APP_ENV',
        'VITE_PAYSTACK_PUBLIC_KEY',
        'VITE_FLUTTERWAVE_PUBLIC_KEY',
    ];

    requiredEnvVars.forEach((key) => {
        if (!import.meta.env[key]) {
            throw new Error(`Missing environment variable: ${key}`);
        }
    });
};