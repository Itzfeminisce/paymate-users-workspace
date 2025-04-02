import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/lib/animations';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AmountInput } from '@/components/fund-wallet/amount-input';
import { PaymentMethods } from '@/components/fund-wallet/payment-methods';
import { WalletInfo } from '@/components/fund-wallet/wallet-info';
import { ConfirmationDialog } from '@/components/fund-wallet/confirmation-dialog';
import { fundingSchema, FundingFormValues } from '@/components/fund-wallet/types';
import { Form } from '@/components/ui/form';

export default function FundWallet() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const form = useForm<FundingFormValues>({
    resolver: zodResolver(fundingSchema),
    defaultValues: {
      amount: "",
      note: "",
    },
  });
  
  const onSubmit = (data: FundingFormValues) => {
    if (!paymentMethod) {
      toast({
        title: "Please select a payment method",
        description: "Choose a payment method to continue",
        variant: "destructive",
      });
      return;
    }
    
    setShowConfirmDialog(true);
  };
  
  const processPayment = () => {
    toast({
      title: "Processing payment",
      description: "Your wallet will be funded shortly",
    });
    
    setShowConfirmDialog(false);
    form.reset();
    setPaymentMethod(null);
  };
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <Container 
        className="md:my-5 pt-20 md:pt-0" 
        title="Fund Wallet" 
        description="Add money to your wallet to use for transactions"
        enableBackButton
      >
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} className="md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AmountInput form={form} />
                <PaymentMethods 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={!form.formState.isValid}
                >
                  Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <WalletInfo form={form} />
          </motion.div>
        </motion.div>
        
        <ConfirmationDialog
          showConfirmDialog={showConfirmDialog}
          setShowConfirmDialog={setShowConfirmDialog}
          form={form}
          paymentMethod={paymentMethod}
          onConfirm={processPayment}
        />
      </Container>
    </div>
  );
}
