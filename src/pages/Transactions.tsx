
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import NavigateBack from '@/components/ui/navigate-back';
import Container from '@/components/layout/Container';

export default function Transactions() {
  const { isAuthenticated } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">
      {/* Desktop Sidebar */}
      <Sidebar />

      <Container  description='View your transaction history' title='Transactions'>
      <motion.div variants={fadeUp}>
              <GlassCard className="p-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No transactions found</p>
                  <p className="text-sm mt-2">Your transaction history will appear here</p>
                </div>
              </GlassCard>
            </motion.div>
      </Container>
    </div>
  );
}
