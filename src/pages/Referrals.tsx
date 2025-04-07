import { motion } from 'framer-motion';
import {
    Users,
    Copy,
    Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReferralStats } from '@/components/referrals/ReferralStats';
import { ReferralTable } from '@/components/referrals/ReferralTable';
import { ReferralCodeInput } from '@/components/referrals/ReferralCodeInput';
import Container from '@/components/layout/Container';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useCreateReferralQuery, useGetReferralStatsQuery, User } from '@/hooks/api-hooks';
import { toast } from 'sonner';
import { STORAGE_KEY } from '@/context/AuthContext';



const Referrals = () => {
    const {value} = useLocalStorage<User>(STORAGE_KEY);

    const { mutate: createReferral } = useCreateReferralQuery();

    const { data: referralStat, isLoading: isReferralStatsLoading, error: errorReferralStats } = useGetReferralStatsQuery();

    
    const referralLink = value?.referral_id;

    const copyReferralLink = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            toast.success('Referral link copied to clipboard!');
        } catch (error) {
            toast.error('Failed to copy referral link');
        }
    }




    return (
        <Container 
            title="Referrals" 
            description="Earn rewards by inviting your friends to join PayMate."
            className='w-full'
        >
            <div className="min-h-screen space-y-12 mt-0">
                {/* Hero Section with Referral Link */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background border border-primary/10 p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center"
                    >
                        {/* Left: Content */}
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                                Share PayMate, <br />
                                <span className="text-primary">Earn Rewards</span>
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Get ₦1,000 for each friend who joins and completes their first transaction.
                                The more you share, the more you earn!
                            </p>
                        </div>

                        {/* Right: Referral Link Card */}
                        <div className="bg-background/80 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-primary/10 shadow-lg">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Share2 className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Your Referral Link</h3>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Input
                                        readOnly
                                        value={referralLink}
                                        className="bg-background/50 font-mono text-xs sm:text-sm truncate"
                                    />
                                    <Button
                                        onClick={copyReferralLink}
                                        variant="default"
                                        className="flex-shrink-0 hover:scale-105 transition-transform w-full sm:w-auto"
                                    >
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                </section>

                {/* Stats Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                 {errorReferralStats ? (
                    <h1>Error loading stats, Please try again</h1>
                 ) : isReferralStatsLoading ? <ReferralStatsSkeleton /> : <ReferralStats stats={referralStat?.stats} />}
                </motion.section>

                {/* Repositioned and Enhanced Input Referral Code Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative py-6"
                >
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                    
                    {/* Content */}
                    <div className="relative max-w-4xl mx-auto">
                        <ReferralCodeInput onSubmit={() => createReferral({ code: value.referral_id })} />
                    </div>
                </motion.section>

                {/* Referrals Table Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Your Referrals</h2>
                        <Button variant="outline" className="hidden sm:flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Export List
                        </Button>
                    </div>
                    
                    <div className="relative">
                        {/* Table background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background rounded-xl -z-10" />
                        
                        <ReferralTable referrals={referralStat?.referrals} isLoading={isReferralStatsLoading} />
                    </div>  
                </motion.section>
            </div>
        </Container>
    );
};

export default Referrals; 


const ReferralStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="group relative">
          {/* Background gradient skeleton */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200/20 to-gray-200/5 rounded-xl opacity-50 animate-pulse" />
          
          <div className="relative bg-background/50 backdrop-blur-sm rounded-xl p-6 h-full border border-primary/10">
            {/* Icon skeleton */}
            <div className="mb-4 flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gray-200/30 animate-pulse w-12 h-12" />
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-1">
              <div className="h-8 bg-gray-200/30 rounded-md animate-pulse w-24" />
              <div className="h-4 bg-gray-200/20 rounded-md animate-pulse w-20 mt-2" />
            </div>
            
            {/* Decorative corner gradient */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-primary/5 rounded-br-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};