import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { ArrowLeft, CreditCard, Plus, Trash2, CheckCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { navItems } from '@/lib/configs';
import Sidebar from '@/components/layout/Sidebar';
import NavigateBack from '@/components/ui/navigate-back';
import Container from '@/components/layout/Container';

export default function PaymentMethods() {
  const { toast } = useToast();
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  // Mock payment methods
  const [paymentMethods] = useState([
    { id: 'card1', type: 'paystack', masked: '•••• •••• •••• 4242', expires: '12/25', default: true },
    { id: 'card2', type: 'flutterwave', masked: '•••• •••• •••• 5555', expires: '09/26', default: false },
  ]);



  const handleSetDefault = (id: string) => {
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Payment method removed",
      description: "The payment method has been removed from your account.",
    });
  };

  const handleAddMethod = (provider: string) => {
    setActiveMethod(provider);
    // In a real app, this would redirect to the payment provider's form or open a modal
    toast({
      title: `Adding ${provider} payment method`,
      description: "In a real app, this would open the payment form.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">


      {/* Desktop Sidebar */}
      <Sidebar />

      <Container enableBackButton title='Payment Methods' description='Manage your payment methods and preferences'>
        {/* Existing payment methods */}
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Your Payment Methods</h3>

            {paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{method.masked}</span>
                          {method.default && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <span className="capitalize">{method.type}</span>
                          <span className="mx-1">•</span>
                          <span>Expires {method.expires}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!method.default && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(method.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No payment methods found</p>
                <p className="text-sm mt-2">Add a payment method to get started</p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Add new payment method */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-medium mb-4">Add Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Paystack Card */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Paystack</CardTitle>
                <CardDescription>Add a card via Paystack payment gateway</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Secure payments</h4>
                    <p className="text-sm text-muted-foreground">Your payment info is never stored</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleAddMethod('Paystack')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Paystack Card
                </Button>
              </CardFooter>
            </Card>

            {/* Flutterwave Card */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Flutterwave</CardTitle>
                <CardDescription>Add a card via Flutterwave payment gateway</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Multiple payment options</h4>
                    <p className="text-sm text-muted-foreground">Cards, mobile money and bank transfers</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleAddMethod('Flutterwave')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Flutterwave Method
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* Payment Preferences */}
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Payment Preferences</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <h4 className="text-sm font-medium">Save payment information</h4>
                  <p className="text-xs text-muted-foreground">Securely save payment methods for faster checkout</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="save-payment" defaultChecked />
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <h4 className="text-sm font-medium">Payment confirmations</h4>
                  <p className="text-xs text-muted-foreground">Get email confirmations for all payments</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="payment-confirmations" defaultChecked />
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-medium">Auto-renewal</h4>
                  <p className="text-xs text-muted-foreground">Automatically renew subscriptions before they expire</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-renewal" defaultChecked />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

      </Container>



    </div>
  );
}
