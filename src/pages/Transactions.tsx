import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { fadeUp } from '@/lib/animations';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';
import { TransactionHistory } from '@/components/transactions/transaction-history';
import { useGetTransactionHistoryQuery } from '@/hooks/api-hooks';
import type { TransactionFilters } from '@/components/transactions/transaction-filters';
import { startOfDay, endOfDay } from 'date-fns';

const ITEMS_PER_PAGE = 10;

export default function Transactions() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filters, setFilters] = React.useState<TransactionFilters>({
    search: '',
    status: 'all',
    dateRange: undefined,
  });

  const { data: transactions, isLoading } = useGetTransactionHistoryQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: filters.search,
    status: filters.status !== 'all' ? filters.status : undefined,
    fromDate: filters.dateRange?.from ? startOfDay(filters.dateRange.from).toISOString() : undefined,
    toDate: filters.dateRange?.to ? endOfDay(filters.dateRange.to).toISOString() : undefined,
  });

  const totalPages = Math.ceil((transactions?.length ?? 0) / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters: TransactionFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <Container description='View your transaction history' title='Transactions'>
      <motion.div variants={fadeUp}>
        <TransactionHistory
          transactions={transactions}
          isLoading={isLoading}
          onFiltersChange={handleFiltersChange}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: handlePageChange,
          }}
          renderIfEmpty={() => (
            <GlassCard className="p-6 shadow-none">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No transactions yet! 🔍</p>
                <p className="text-sm mt-2">When you make transactions, they'll show up right here. Ready when you are! ✨</p>
              </div>
            </GlassCard>
          )}
        />
      </motion.div>
    </Container>
  );
}
