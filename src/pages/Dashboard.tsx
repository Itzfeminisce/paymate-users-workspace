
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'User'}!</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account, top-up, and view your transaction history.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Account Balance</h3>
              <p className="text-3xl font-bold">₦0.00</p>
              <div className="mt-4">
                <Button size="sm">Fund Wallet</Button>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">Buy Airtime</Button>
                <Button variant="outline" className="w-full justify-start">Buy Data</Button>
                <Button variant="outline" className="w-full justify-start">Pay Bills</Button>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
              <div className="text-center py-6 text-muted-foreground">
                <p>No recent transactions</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
        
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Refer & Earn</h3>
            <p className="text-muted-foreground mb-4">
              Share your referral link with friends and earn bonuses when they sign up!
            </p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
              https://vtulink.com/ref/{user?.id || '123456'}
            </div>
            <div className="mt-4">
              <Button size="sm">Copy Link</Button>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
