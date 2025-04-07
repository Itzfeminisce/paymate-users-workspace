
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STORAGE_KEY, useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUp, } from '@/lib/animations';
import { serviceItems } from '@/lib/configs';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';
import { TransactionHistory } from '@/components/transactions/transaction-history';
import { useGetWalletQuery, useGetTransactionHistoryQuery, User } from '@/hooks/api-hooks';
import { formatCurrency } from '@/utils/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

// Create an array of colorful background and text combinations
const colorCombos = [
  { bg: "from-blue-400/20 to-blue-600/30", text: "text-blue-700" },
  { bg: "from-purple-400/20 to-purple-600/30", text: "text-purple-700" },
  { bg: "from-green-400/20 to-green-600/30", text: "text-green-700" },
  { bg: "from-amber-400/20 to-amber-600/30", text: "text-amber-700" },
  { bg: "from-rose-400/20 to-rose-600/30", text: "text-rose-700" },
  { bg: "from-cyan-400/20 to-cyan-600/30", text: "text-cyan-700" },
  { bg: "from-indigo-400/20 to-indigo-600/30", text: "text-indigo-700" },
  { bg: "from-emerald-400/20 to-emerald-600/30", text: "text-emerald-700" },
];


export default function Dashboard() {
  const { user } = useAuth();
  const { data: wallet, isLoading } = useGetWalletQuery();
  const mobile = useIsMobile()
  const { data: transactions, isLoading: isTransactionsLoading } = useGetTransactionHistoryQuery({ page: 1, limit: 3 });

  const { value: _user } = useLocalStorage<User | null>(STORAGE_KEY, null);

  const referralLink = _user?.referral_id;

  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
        duration: 3000,
      });
    }
  }

  return (
    <Container className="md:my-5 pt-20 md:pt-0" description="Manage your account, top-up, and view your transaction history." title={`Welcome, ${user?.name || 'User'}!`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-y-6">
          <motion.div variants={fadeUp} className="md:col-span-2">
            <GlassCard className="md:p-6 p-2 backdrop-blur-sm border border-opacity-10">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Balance</h3>
                  {isLoading ? (
                    <div className="flex flex-col items-start gap-2">
                      <div className="h-5 w-10 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-3xl font-semibold">{formatCurrency(wallet?.balance || 0)}</p>
                      <p className="text-sm text-muted-foreground">Available for transactions</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  {!isLoading && wallet?.pending > 0 && (
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 shadow-sm flex-1 md:flex-auto hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
                        <p className="text-sm font-medium text-amber-700 whitespace-nowrap overflow-hidden text-ellipsis">Pending</p>
                      </div>
                      <p className="text-lg font-semibold text-amber-900">{formatCurrency(wallet?.pending || 0)}</p>
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-sm flex-1 md:flex-auto hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                      <p className="text-xs sm:text-sm md:text-base font-medium text-purple-700 whitespace-nowrap overflow-hidden text-ellipsis">Referral Earnings</p>
                    </div>
                    <p className="text-lg font-semibold text-purple-900">{formatCurrency(250)}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 pb-1">
                <Button asChild className="w-full md:w-auto" variant={mobile ? "outline" : "default"}>
                  <Link to={"/fund-wallet"}>Fund Wallet</Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Quick Services</h3>
              <Link to="/services" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {serviceItems.map((service, index) => {
                // Select a color combination based on the index
                const colorCombo = colorCombos[index % colorCombos.length];

                return (
                  <Link to={`/services?ref=${service.value}`} key={service.title}>
                    <GlassCard className="p-4 hover:shadow-md hover:scale-105 transition-all duration-200 border border-opacity-10 backdrop-blur-sm">
                      <div className="flex flex-col items-center">
                        <div className={`bg-gradient-to-br ${colorCombo.bg} p-3 rounded-full mb-3 shadow-sm`}>
                          <div className={colorCombo.text}>{service.icon}</div>
                        </div>
                        <h4 className={`text-sm font-medium text-center ${colorCombo.text}`}>{service.title}</h4>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>

        <TransactionHistory 
        transactions={transactions} 
        isLoading={isTransactionsLoading} 
        showViewAllButton={true} 
        renderIfEmpty={() => <div className="text-center text-muted-foreground">No transactions found</div>} />
      </div>

      <motion.div variants={fadeUp}>
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium mb-4">Refer & Earn</h3>
          <p className="text-muted-foreground mb-4">
            Share your referral link with friends and earn bonuses when they sign up!
          </p>
          <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
            {referralLink}
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyReferralLink}>
              Copy Link
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </Container>

  );
}
