import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface IUCVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  data?: {
    customerName: string;
    address: string;
    district: string;
    status: 'active' | 'inactive';
    lastPayment?: {
      amount: number;
      date: string;
    };
  };
  error?: string;
}

const IUCVerificationDialog: React.FC<IUCVerificationDialogProps> = ({
  isOpen,
  onClose,
  isLoading = false,
  data,
  error,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-2 sticky top-0 bg-background z-10 border-b">
          <DialogTitle className="text-xl font-semibold">IUC Verification</DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-gray-500 text-center">
                  Verifying IUC number...
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <XCircle className="h-12 w-12 text-destructive mb-4" />
                <p className="text-destructive text-center mb-4">{error}</p>
                <Button variant="outline" onClick={onClose}>
                  Try Again
                </Button>
              </motion.div>
            ) : data ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-gray-500">Customer Name</span>
                    <span className="font-medium">{data.customerName}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-gray-500">Address</span>
                    <span className="font-medium text-right">{data.address}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-gray-500">District</span>
                    <span className="font-medium">{data.district}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-gray-500">Status</span>
                    <span className={`font-medium ${
                      data.status === 'active' ? 'text-green-500' : 'text-destructive'
                    }`}>
                      {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                    </span>
                  </div>

                  {data.lastPayment && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Last Payment</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-medium">₦{data.lastPayment.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium">{new Date(data.lastPayment.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        
        {data && !isLoading && !error && (
          <div className="p-4 border-t sticky bottom-0 bg-background z-10 mt-auto">
            <div className="flex justify-end">
              <Button onClick={onClose}>Continue</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IUCVerificationDialog; 