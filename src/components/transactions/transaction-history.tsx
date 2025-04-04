import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRightIcon, ArrowUpIcon, ArrowDownIcon, ReceiptIcon, RefreshCcw } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Transaction, useGetTransactionHistoryQuery } from "@/hooks/api-hooks";
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { TooltipContent } from "@radix-ui/react-tooltip";

export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAWAL = 'withdrawal',
    TRANSFER = 'transfer',
    SUBSCRIPTION = 'subscription',
    REFUND = 'refund'
}


interface TransactionHistoryProps {
    limit?: number;
    showViewAllButton?: boolean;
    renderIfEmpty?: () => React.ReactNode;
}

// RetryButton component
const RetryButton = ({ transactionRef }: { transactionRef: string }) => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate(`/fund-wallet?trxref=${transactionRef}&reference=${transactionRef}`);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-muted/50"
                    onClick={handleRetry}
                >
                    <RefreshCcw className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    <span className="sr-only">Retry transaction</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Retry Transaction
            </TooltipContent>
        </Tooltip>
    );
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
    limit = 2,
    showViewAllButton = false,
    renderIfEmpty,
}) => {
    const { data: transactions = [], isLoading } = useGetTransactionHistoryQuery(limit);

    if (isLoading) {
        return <TransactionHistorySkeleton />;
    }

    if (transactions.length === 0 && renderIfEmpty) {
        return renderIfEmpty();
    }

    return (
        <motion.div variants={fadeUp}>
            <GlassCard className="p-4 sm:p-6">
                <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="hidden sm:table-header-group">
                            <TableRow>
                                <TableHead>Reference</TableHead>
                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id} className="group hover:bg-gray-50/50 transition-colors">
                                    {/* Mobile view - card style */}
                                    <TableCell className="sm:hidden p-3" colSpan={6}>
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm truncate max-w-[150px]">{transaction.reference}</span>
                                                <Badge
                                                    variant={
                                                        transaction.status === 'success'
                                                            ? 'outline'
                                                            : transaction.status === 'failed'
                                                                ? 'destructive'
                                                                : 'default'
                                                    }
                                                    className="ml-2"
                                                >
                                                    {transaction.status}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground text-sm">{format(transaction.created_at, 'MMM d, yyyy')}</span>
                                                <span className="font-semibold">{transaction.amount}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-1">
                                                {transaction.status === 'failed' && (
                                                    <RetryButton transactionRef={transaction.reference} />
                                                )}
                                                {transaction.status !== 'failed' && <div></div>}
                                                <span className="text-xs text-muted-foreground">{format(transaction.created_at, 'h:mm a')}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    
                                    {/* Desktop view - table style */}
                                    <TableCell className="hidden sm:table-cell font-medium">
                                        <span className="truncate max-w-[120px] inline-block">{transaction.reference}</span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span className="truncate max-w-[150px] inline-block">
                                            {transaction.description || "-"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {transaction.amount}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge
                                            variant={
                                                transaction.status === 'success'
                                                    ? 'outline'
                                                    : transaction.status === 'failed'
                                                        ? 'destructive'
                                                        : 'default'
                                            }
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate">
                                        {format(transaction.created_at, 'MMM d, yyyy h:mm a')}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-right">
                                        {transaction.status === 'failed' && (
                                            <RetryButton transactionRef={transaction.reference} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {transactions.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">No transactions found</p>
                    </div>
                )}
                {showViewAllButton && transactions.length > 0 && (
                    <div className="mt-4">
                        <Link to="/transactions">
                            <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                                View All Transactions
                            </Button>
                        </Link>
                    </div>
                )}
            </GlassCard>
        </motion.div>
    );
};

const TransactionHistorySkeleton = () => {
    return (
        <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 animate-pulse">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-full bg-gray-200 h-8 w-8"></div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm bg-gray-200 h-4 w-20 rounded"></span>
                                    <span className="text-xs mt-1 bg-gray-200 h-3 w-32 rounded"></span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="font-semibold bg-gray-200 h-4 w-16 rounded"></span>
                                <span className="text-xs mt-1 bg-gray-200 h-3 w-24 rounded"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
};
