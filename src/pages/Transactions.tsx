
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Transactions() {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeUp}>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground mt-2">
              View your transaction history
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No transactions found</p>
                <p className="text-sm mt-2">Your transaction history will appear here</p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
