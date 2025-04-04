import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { fadeUp } from '@/lib/animations';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';
import { TransactionHistory } from '@/components/transactions/transaction-history';

export default function Transactions() {

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">
      {/* Desktop Sidebar */}
      <Sidebar />

      <Container description='View your transaction history' title='Transactions'>
        <motion.div variants={fadeUp}>
          <TransactionHistory 
            limit={10} 
            renderIfEmpty={() => (
              <GlassCard className="p-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No transactions found</p>
                  <p className="text-sm mt-2">Your transaction history will appear here</p>
                </div>
              </GlassCard>
            )}
          />
        </motion.div>
      </Container>
    </div>
  );
}
