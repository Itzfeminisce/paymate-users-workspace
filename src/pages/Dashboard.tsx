
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUp, } from '@/lib/animations';
import { serviceItems } from '@/lib/configs';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar (Desktop & Mobile) */}
      <Sidebar />

      {/* Main Content */}
      <Container className="md:my-5 pt-20 md:pt-0" description="Manage your account, top-up, and view your transaction history." title={`Welcome, ${user?.name || 'User'}!`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} className="md:col-span-2">
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Account Balance</h3>
              <p className="text-3xl font-bold">₦0.00</p>
              <div className="mt-4">
                <Button asChild>
                  <Link to={"/fund-wallet"}> Fund Wallet</Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
              <div className="text-center py-6 text-muted-foreground">
                <p>No recent transactions</p>
              </div>
              <Link to="/transactions">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Transactions
                </Button>
              </Link>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-medium mb-4">Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {serviceItems.map((service) => (
              <Link to={`/services?ref=${service.title}`} key={service.title}>
                <GlassCard className="p-4 cursor-pointer hover:scale-105 transition-transform">
                  <div className="flex flex-col items-center">
                    <div className={`${service.color} p-3 rounded-full mb-3`}>
                      {service.icon}
                    </div>
                    <h4 className="text-sm font-medium">{service.title}</h4>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </motion.div>

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
              <Button variant="outline" size="sm">Copy Link</Button>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </div>
  );
}
