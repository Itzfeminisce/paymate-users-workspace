import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STORAGE_KEY, useAuth } from '@/context/AuthContext';
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
  const { user } = useAuth();
  const { toast } = useToast();
  const { setValue: setLstorage } = useLocalStorage<User>(STORAGE_KEY)
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

      const profilePicture = response.profile_picture_url;
      await queryClient.invalidateQueries({ queryKey: ["users:me"] });

      // Update profile picture in local storage
      setLstorage(it => ({...it, profilePicture}));
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


  // Generate user avatar initials
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : user.name.substring(0, 2).toUpperCase();
  };

  return (
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
  );
}
