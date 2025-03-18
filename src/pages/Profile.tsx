
import React from 'react';
import { Navigate } from 'react-router-dom';
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

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  // Generate user avatar initials
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">
      {/* Desktop Sidebar */}
      <Sidebar />

      <Container title='My Profile' description='View and update your profile information'>
      <motion.div variants={fadeUp}>
              <GlassCard className="p-8">
                <div className="flex flex-col items-center md:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback className="bg-primary text-white text-4xl">{getInitials()}</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-4 text-muted-foreground text-sm">Click the camera to update your picture</p>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded-md"
                          value={user?.name || ''}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border rounded-md"
                          value={user?.email || ''}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border rounded-md"
                          placeholder="Add your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border bg-gray-50 rounded-md"
                          value={user?.id || 'N/A'}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={fadeUp}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Account Security</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">••••••••</span>
                      <Button variant="outline" size="sm">Change Password</Button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Two-Factor Authentication</label>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Not enabled</span>
                      <Button variant="outline" size="sm">Enable 2FA</Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
      </Container>
    </div>
  );
}
