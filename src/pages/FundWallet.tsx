
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Wallet, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/ui/GlassCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { fadeUp, staggerContainer } from '@/lib/animations';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form validation schema
const fundingSchema = z.object({
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  note: z.string().optional(),
});

type FundingFormValues = z.infer<typeof fundingSchema>;

export default function FundWallet() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Form setup
  const form = useForm<FundingFormValues>({
    resolver: zodResolver(fundingSchema),
    defaultValues: {
      amount: "",
      note: "",
    },
  });
  
  // Handle form submission
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
  
  // Handle payment processing
  const processPayment = () => {
    // Here you would typically integrate with your payment provider
    toast({
      title: "Processing payment",
      description: "Your wallet will be funded shortly",
    });
    
    // Close dialog and reset
    setShowConfirmDialog(false);
    form.reset();
    setPaymentMethod(null);
  };
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <Container 
        className="md:my-5 pt-20 md:pt-0" 
        title="Fund Wallet" 
        description="Add money to your wallet to use for transactions"
        enableBackButton
      >
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Amount Input Section */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-medium mb-4">Enter Amount</h3>
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (₦)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                            <Input
                              {...field}
                              className="pl-8 text-lg font-semibold"
                              placeholder="0.00"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {['1000', '2000', '5000', '10000'].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        className="text-sm"
                        onClick={() => form.setValue('amount', amount)}
                      >
                        ₦{amount}
                      </Button>
                    ))}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Note (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="e.g., Funding for mobile data purchase"
                            className="resize-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </GlassCard>
                
                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Bank Transfer */}
                    <Card 
                      className={`cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Wallet className="h-5 w-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-base">Bank Transfer</CardTitle>
                          </div>
                          {paymentMethod === 'bank' && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 text-sm text-muted-foreground">
                        Transfer directly from your bank account
                      </CardContent>
                    </Card>
                    
                    {/* Paystack */}
                    <Card 
                      className={`cursor-pointer transition-all ${paymentMethod === 'paystack' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod('paystack')}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-green-100 p-2 rounded-full">
                              <CreditCard className="h-5 w-5 text-green-600" />
                            </div>
                            <CardTitle className="text-base">Paystack</CardTitle>
                          </div>
                          {paymentMethod === 'paystack' && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 text-sm text-muted-foreground">
                        Pay with card, bank or USSD via Paystack
                      </CardContent>
                    </Card>
                    
                    {/* Flutterwave */}
                    <Card 
                      className={`cursor-pointer transition-all ${paymentMethod === 'flutterwave' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod('flutterwave')}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-purple-100 p-2 rounded-full">
                              <CreditCard className="h-5 w-5 text-purple-600" />
                            </div>
                            <CardTitle className="text-base">Flutterwave</CardTitle>
                          </div>
                          {paymentMethod === 'flutterwave' && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 text-sm text-muted-foreground">
                        Pay with multiple payment options via Flutterwave
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Submit Button */}
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
          
          {/* Information Panel */}
          <motion.div variants={fadeUp} className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Wallet</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Balance</span>
                  <span className="font-semibold">₦0.00</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-semibold">₦0.00</span>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Having trouble funding your wallet? Our support team is available 24/7 to assist you.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </GlassCard>
          </motion.div>
        </motion.div>
        
        {/* Payment Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Payment</DialogTitle>
              <DialogDescription>
                You are about to fund your wallet with ₦{form.getValues().amount || '0.00'}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">₦{form.getValues().amount || '0.00'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-semibold capitalize">{paymentMethod}</span>
              </div>
              
              {form.getValues().note && (
                <div>
                  <span className="text-muted-foreground block mb-1">Note</span>
                  <p className="text-sm">{form.getValues().note}</p>
                </div>
              )}
              
              <div className="rounded-md bg-amber-50 p-3 border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Important</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      Funding your wallet is subject to our terms and conditions. By proceeding, 
                      you agree to these terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </Button>
              <Button onClick={processPayment}>
                Proceed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
