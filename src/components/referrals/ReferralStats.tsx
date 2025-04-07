import { motion } from 'framer-motion';
import { Users, Gift, TrendingUp, Wallet } from 'lucide-react';

interface ReferralStatsProps {
  stats: {
    totalReferrals: number;
    activeReferrals: number;
    totalEarnings: number;
    pendingRewards: number;
  };
}

export const ReferralStats = ({ stats }: ReferralStatsProps) => {
  const statItems = [
    {
      icon: Users,
      label: 'Total Referrals',
      value: stats.totalReferrals,
      color: 'text-blue-500',
      gradient: 'from-blue-500/20 to-blue-500/5',
    },
    {
      icon: Gift,
      label: 'Active Referrals',
      value: stats.activeReferrals,
      color: 'text-green-500',
      gradient: 'from-green-500/20 to-green-500/5',
    },
    {
      icon: Wallet,
      label: 'Total Earnings',
      value: `₦${stats.totalEarnings.toLocaleString()}`,
      color: 'text-purple-500',
      gradient: 'from-purple-500/20 to-purple-500/5',
    },
    {
      icon: TrendingUp,
      label: 'Pending Rewards',
      value: `₦${stats.pendingRewards.toLocaleString()}`,
      color: 'text-orange-500',
      gradient: 'from-orange-500/20 to-orange-500/5',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {  statItems.length > 0 ? (
        statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
            whileHover={{ scale: 1.02 }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />

            <div className="relative bg-background/50 backdrop-blur-sm rounded-xl p-6 h-full border border-primary/10">
              {/* Icon */}
              <div className={`${item.color} mb-4 flex items-center gap-3`}>
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <p className="text-3xl font-bold tracking-tight">
                  {item.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>

              {/* Decorative corner gradient */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-primary/5 rounded-br-xl" />
            </div>
          </motion.div>
        ))
      ) : (
        <div className="col-span-4 text-center text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
};

