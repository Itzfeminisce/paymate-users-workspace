import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';
import { ENV } from '@/utils/env';
import { handleAxiosError } from '@/utils/axios-error';

// Default config for axios instance
const defaultConfig: AxiosRequestConfig = {
    baseURL: ENV.API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
};

// Create a custom axios instance
export const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create({
        ...defaultConfig,
        ...config,
    });

    // Request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            // You can modify the request config here (add headers, auth tokens, etc.)
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

// Default axios instance
export const axiosInstance = createAxiosInstance();

// Hook for using axios with authentication
export const useAxios = () => {

    // Create a new instance with auth headers
    const authAxios = createAxiosInstance();

    // Add auth token to requests
    authAxios.interceptors.request.use((config) => {
        // how will this look like in the local storage?
        // __paymate_user
        // __paymate_user.token
        const token = (JSON.parse(localStorage.getItem('__paymate_') || '{}'))?.__paymate_user?.token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Handle auth errors
    authAxios.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            const errorResponse = handleAxiosError(error);

            toast({
                title: errorResponse.title || "Error",
                description: errorResponse.message || "Something went wrong. Please try again later.",
                variant: errorResponse.variant,
            });


            // Handle 401 Unauthorized errors
            if (errorResponse.statusCode === 401) {
                // Clear user data from localStorage
                localStorage.clear()
        
                // Redirect to login page
                window.location.href = '/sign-in'
                return;
            }



            return Promise.reject(error);
        }
    );

    // Helper methods for common operations
    const axiosGet = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return authAxios.get<T, AxiosResponse<T>>(url, config).then((res) => res.data);
    };

    const axiosPost = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return authAxios.post<T, AxiosResponse<T>>(url, data, config).then((res) => res.data);
    };

    // for form data - automatically sets the correct content type and doesn't override with auth headers
    const axiosPut = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        // Check if data is FormData and set appropriate headers if not already set
        if (data instanceof FormData && config?.headers === undefined) {
            config = {
                ...config,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
        }
        return authAxios.put<T, AxiosResponse<T>>(url, data, config).then((res) => res.data);
    };

    const axiosPatch = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return authAxios.patch<T, AxiosResponse<T>>(url, data, config).then((res) => res.data);
    };

    const axiosDelete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return authAxios.delete<T, AxiosResponse<T>>(url, config).then((res) => res.data);
    };

    return {
        axios: authAxios,
        Get: axiosGet,
        Post: axiosPost,
        Put: axiosPut,
        Patch: axiosPatch,
        Delete: axiosDelete,
    };
};
