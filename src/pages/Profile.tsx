import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import NavigateBack from '@/components/ui/navigate-back';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileForm } from '@/components/profile/profile-form';
import { SecuritySettings } from '@/components/profile/security-settings';
import { profileSchema, type ProfileFormValues } from '@/components/profile/types';
import { useToast } from '@/hooks/use-toast';
import { User, useUpdateProfileQuery } from '@/hooks/api-hooks';
import { useQueryClient } from '@tanstack/react-query';
import { handleAxiosError } from '@/utils/axios-error';
import { useLocalStorage } from '@/hooks/use-local-storage';


export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [,setLstorage] = useLocalStorage<User>("user", localStorage.getItem('user') as unknown as User)
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone_number: user?.phone_number || '',
      profilePicture: null
    }
  });

  const { mutate, isPending } = useUpdateProfileQuery();

  const onSubmit = async (data: ProfileFormValues) => {
    try {
     const response = await mutate({
        phone_number: data.phone_number,
        profilePicture: data.profilePicture
      });

      console.log({uploadedProfilePicture: response});

      const profilePicture = response.profile_picture_url;
      // Update profile picture in local storage
      setLstorage(it => ({...it, profilePicture}));
      await queryClient.invalidateQueries({ queryKey: ["users:me"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      const errorResponse = handleAxiosError(error);
      toast({
        title: errorResponse.title || "Error",
        description: errorResponse.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/sign-in");
    return;
  }

  // Generate user avatar initials
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : user.name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">
      {/* Desktop Sidebar */}
      <Sidebar />

      <Container title='My Profile' description='View and update your profile information'>
        <motion.div variants={staggerContainer} className="space-y-6">
          <motion.div variants={fadeUp}>
            <ProfileForm 
              isPending={isPending}
              form={form} 
              onSubmit={onSubmit}
              initials={getInitials()}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SecuritySettings />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
