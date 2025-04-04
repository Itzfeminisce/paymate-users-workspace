import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "./use-axios";
import { useAuth } from "@/context/AuthContext";
import { ProfileFormValues } from "@/components/profile/types";
import { toast, useToast } from "@/components/ui/use-toast";
import { handleAxiosError } from "@/utils/axios-error";


const { Get, Post, Put } = useAxios();

export interface User {
    id: string;
    email: string;
    name: string;
    phone_number: string;
    profilePicture?: string;
    token?: string;
  }

  
interface Wallet {
    id: string;
    balance: number;
    pending: number;
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


export const useGetUserQuery = () => {
    // const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["users:me"],
        queryFn: () => Get<{data: User}>("/users/me").then(res => res.data),
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
    const { isAuthenticated } = useAuth();
    const { data, isLoading, error } = useQuery({
        queryKey: ["wallet"],
        queryFn: () => Get<{data: Wallet}>("/wallets/me").then(res => res.data),
        enabled: !!isAuthenticated,
        staleTime: 1000 * 60 * 5,
    });

    return { data, isLoading, error };
};

export const useGetTransactionHistoryQuery = (limit: number) => {
    const { isAuthenticated } = useAuth();
    const { data, isLoading, error } = useQuery({
        queryKey: ["transactions:limit", limit],
        queryFn: () => Get<{data: Transaction[]}>(`/wallets/transactions?limit=${limit}`).then(res => res.data),
        enabled: !!isAuthenticated,
        staleTime: 1000 * 60 * 5,
    });

    return { data, isLoading, error };
};  

export const useInitializeTransactionQuery = () => {
    const { mutate, isPending, error } = useMutation({
        mutationKey: ["initialize-transaction"],
        mutationFn: async (data: {amount: number, reference: string}) => {
            return Post<{data: Transaction}>("/wallets/transactions", data).then(res => res.data);
        },
    });

    return { mutate, isPending, error };
}

export const useVerifyTransactionQuery = () => {
    const { mutateAsync, isPending, error } = useMutation({
        mutationKey: ["verify-transaction"],
        mutationFn: async ({reference}: {reference: string}) => {
            return Post<{data: Transaction}>(`/wallets/transactions/verify/${reference}`, {}).then(res => res.data);
        }
    });

    return { mutate: mutateAsync , isPending, error };
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
                
                return Put<{data: UpdateProfileResponse}>("/users/me", formData).then(res => res.data);
            } else {
                // Use regular JSON if no file is being uploaded
                return Put<{data: UpdateProfileResponse}>("/users/me", data).then(res => res.data);
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
