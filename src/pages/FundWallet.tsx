import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { useAxios } from '@/hooks/use-axios';
import { ConfirmPaymentDialog } from '@/components/fund-wallet/confirm-payment-dialog';
import { handleAxiosError } from '@/utils/axios-error';
import { ToastAction } from '@/components/ui/toast';
import { useTransactionError } from '@/hooks/use-api-response';
import { useVerifyTransactionQuery } from '@/hooks/api-hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export default function FundWallet() {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { Post } = useAxios();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const { handleTransactionError } = useTransactionError();
  const { mutate: verifyTransactionMutation } = useVerifyTransactionQuery();
  const queryClient = useQueryClient();

  const form = useForm<FundingFormValues>({
    resolver: zodResolver(fundingSchema),
    defaultValues: {
      amount: 100,
      note: "Funding wallet",
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

  const processPayment = async () => {
    toast({
      title: "Processing payment",
      description: "Your wallet will be funded shortly",
    });

    // TODO: Process payment
    switch (paymentMethod) {
      case "bank":
        // TODO: Process bank payment
        break;
      case "paystack":
        // TODO: Process paystack payment
        const response = await Post('/wallets/transactions/initialize', {
          amount: +form.getValues().amount,
          callback_url: window.location.href,
          note: form.getValues().note,
          paymentMethod: paymentMethod,
        });

        const { authorization_url } = response.data;

        window.location.href = authorization_url;

        break;
      case "flutterwave":
        // TODO: Process flutterwave payment
        break;
      default:
        toast({
          title: "Invalid payment method",
          description: "Please select a valid payment method",
          variant: "destructive",
        });
        break;
    }
    // TODO: Update wallet balance
    // TODO: Redirect to dashboard

    setShowConfirmDialog(false);
    form.reset();
    setPaymentMethod(null);
  };


  useEffect(() => {
    if (searchParam.has('reference')) {
      const reference = searchParam.get("reference");
      setIsVerifying(true);
      setVerificationStatus('verifying');

      const verifyTransaction = async () => {
        try {
          await verifyTransactionMutation({ reference });
          await queryClient.invalidateQueries({ queryKey: ["wallet"] });
          await queryClient.invalidateQueries({ queryKey: ["transactions"] });

          setVerificationStatus('success');
          toast({
            title: "Payment Successful",
            description: "Your wallet has been funded successfully",
          });
          
          setSearchParam({});
          navigate('/transactions');
        } catch (error) {
          setVerificationStatus('error');
          handleTransactionError(error);
        }
      };
      
      verifyTransaction();
    }
  }, [searchParam, queryClient, verifyTransactionMutation, handleTransactionError, setSearchParam]);

  const handleVerificationClose = () => {
    setIsVerifying(false);
    if (verificationStatus === 'success') {
      navigate('/transactions');
    }
  };

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
            <Suspense fallback={<div>Loading...</div>}>
              <WalletInfo form={form} />
            </Suspense>
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

      <ConfirmPaymentDialog
        isOpen={isVerifying}
        status={verificationStatus}
        form={form}
        reference={searchParam.get("reference") || undefined}
        onClose={handleVerificationClose}
      />
    </div>
  );
}
