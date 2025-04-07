import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "./use-axios";
import { ProfileFormValues } from "@/components/profile/types";
import { useToast } from "@/components/ui/use-toast";
import { handleAxiosError } from "@/utils/axios-error";


const { Get, Post, Put } = useAxios();

export interface User {
    id: string;
    email: string;
    name: string;
    phone_number: string;
    profilePicture: string;
    token: string;
    referral_id: string;
}

export interface Referral extends Pick<User, 'id' | 'name' | 'profilePicture'> {
    email?: string;
    status: string;
    created_at: string;
}
export interface ReferralStats {
    referrals: Referral[];
    stats: {
        totalReferrals: number;
        activeReferrals: number;
        totalEarnings: number;
        pendingRewards: number;
    }
}



interface Wallet {
    id: string;
    balance: number;
    pending: number;
    referral_id: string;
}

export interface Transaction {
    id: string;
    amount: number;
    description: string;
    status: string;
    type: string;
    reference: string;
    created_at: string;
}

interface UpdateProfileResponse {
    profile_picture_url: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    code: string;
    icon: string;
}

export interface ProductValidity {
    id: string;
    name: string;
    duration: number;
    duration_type: string;
}

export interface ProductProvider {
    id: string;
    name: string;
    status: string;
    // categories: ProductCategory[];
}


export interface ProductService {
    id: string;
    name: string;
    service_code: string;
    price: number;
    discount: number;
    transaction_fee: number;
    status: string;
    category: ProductCategory;
    provider: ProductProvider
    validity: ProductValidity;
}



export const usePlatformConfigQuery = () => {
    // const queryClient = useQueryClient();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["platform:config"],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate a small delay
            return Get<{ data: any[] }>("/platform/config").then(res => res.data)
        },
        staleTime: 1000 * 60 * 60 * 24 * 30, // 30 days
    });


    return { data, isLoading, error, refetch };
}
export const useGetUserQuery = () => {
    // const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["users:me"],
        queryFn: () => Get<{ data: User }>("/users/me").then(res => res.data),
        throwOnError(error, query) {
            const err = handleAxiosError(error);
            if (err.statusCode === 401) {
                query.invalidate() // invalidate the query
            }
            return true;
        },
    });


    return { data, isLoading, error };
}

export const useGetWalletQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["wallet"],
        queryFn: () => Get<{ data: Wallet }>("/wallets/me").then(res => res.data),
        staleTime: 1000 * 60 * 5,
    });

    return { data, isLoading, error };
};

export const useGetTransactionHistoryQuery = (params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["transactions", params],
        queryFn: () => Get<{ data: Transaction[] }>(`/wallets/transactions`, { params }).then(res => res.data),
        staleTime: 1000 * 60 * 5,
    });

    return { data, isLoading, error };
};

export const useInitializeTransactionQuery = () => {
    const { mutate, isPending, error } = useMutation({
        mutationKey: ["initialize-transaction"],
        mutationFn: async (data: { amount: number, reference: string }) => {
            return Post<{ data: Transaction }>("/wallets/transactions", data).then(res => res.data);
        },
    });

    return { mutate, isPending, error };
}

export const useVerifyTransactionQuery = () => {
    const { mutateAsync, isPending, error } = useMutation({
        mutationKey: ["verify-transaction"],
        mutationFn: async ({ reference }: { reference: string }) => {
            return Post<{ data: Transaction }>(`/wallets/transactions/verify/${reference}`, {}).then(res => res.data);
        }
    });

    return { mutate: mutateAsync, isPending, error };
}


export const useUpdateProfileQuery = () => {
    const { toast } = useToast();
    const { mutateAsync, isPending, error } = useMutation({
        mutationKey: ["users:me"],
        mutationFn: async (data: Partial<ProfileFormValues>) => {
            // Create FormData if there's a profile picture file
            if (typeof data.profilePicture !== 'string' && data.profilePicture) {
                const formData = new FormData();
                formData.append('profilePicture', data.profilePicture);

                // Add other form fields to FormData
                if (data.phone_number) formData.append('phone_number', data.phone_number);

                return Put<{ data: UpdateProfileResponse }>("/users/me", formData).then(res => res.data);
            } else {
                // Use regular JSON if no file is being uploaded
                return Put<{ data: UpdateProfileResponse }>("/users/me", data).then(res => res.data);
            }
        },
        onSuccess: () => {
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        },
    });

    return { mutate: mutateAsync, isPending, error };
};

export const useGetReferralStatsQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["referral-stats"],
        queryFn: () => Get<{ data: ReferralStats }>("/users/referral-stats").then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes (This is the time the data is considered fresh)
        refetchInterval: 1000 * 60 * 5, // 5 minutes (refetch every 5 minutes)
    });

    console.log({ UseGetReferralStatsData: data });


    return { data, isLoading, error };
}

export const useCreateReferralQuery = () => {
    const { mutateAsync, isPending, error } = useMutation({
        mutationKey: ["create-referral"],
        mutationFn: async (data: { code: string }) => {
            return Post<{ data: any }>("/users/create-referral", data).then(res => res.data);
        },
    });

    return { mutate: mutateAsync, isPending, error };
}

export const useGetProductCategoriesQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["product-categories"],
        queryFn: () => Get<{ data: ProductCategory[] }>("/products/categories").then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes (This is the time the data is considered fresh)
    });

    return { data, isLoading, error };
}

export const useGetProductValiditiesQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["product-validities"],
        queryFn: () => Get<{ data: ProductValidity[] }>("/products/validities").then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes (This is the time the data is considered fresh)
    });

    return { data, isLoading, error };
}

export const useGetProductProvidersQuery = (params?: {
    categoryId?: string;
}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["product-providers", params],
        queryFn: () => Get<{ data: ProductProvider[] }>(`/products/providers${params.categoryId ? `?categoryId=${params.categoryId}` : ""}`).then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes (This is the time the data is considered fresh)
    });

    return { data, isLoading, error };
}

/**
 * Hook to fetch product services with optional filtering
 * 
 * This hook fetches services from the /products/services endpoint with the ability
 * to filter by category, providers, and select specific fields to return.
 * 
 * @param filterOptions - Object containing filter parameters
 * @param filterOptions.categoryId - Optional UUID of the category to filter services by
 * @param filterOptions.providerIds - Optional array of provider UUIDs to filter services by
 * @param filterOptions.select - Optional array of field names to include in the response
 *                              (can include fields from related entities using dot notation,
 *                               e.g., 'provider.name', 'category.icon')
 * 
 * @returns {Object} Query result object
 * @returns {ProductService[]} data - Array of product services matching the filter criteria
 * @returns {boolean} isLoading - True when the query is in progress
 * @returns {Error|null} error - Error object if the query failed, null otherwise
 * 
 * @example
 * // Fetch all services for a specific category
 * const { data, isLoading, error } = useGetProductServicesQuery({ categoryId: "123e4567-e89b-12d3-a456-426614174000" });
 * 
 * @example
 * // Fetch services for specific providers with only certain fields
 * const { data } = useGetProductServicesQuery({
 *   providerIds: ["123e4567-e89b-12d3-a456-426614174000", "523e4567-e89b-12d3-a456-426614174001"].join(","),
 *   select: ["id", "name", "price", "provider.name"].join(",")
 * });
 */
export const useGetProductServicesQuery = (filterOptions: {
    categoryId?: string;
    providerIds?: string;
    select?: string;
}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["product-services", filterOptions],
        queryFn: () => Get<{ data: ProductService[] }>("/products/services", { params: filterOptions }).then(res => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes (This is the time the data is considered fresh)
        enabled: !!(filterOptions?.categoryId && filterOptions?.providerIds)
    });

    return { data, isLoading, error };
}
