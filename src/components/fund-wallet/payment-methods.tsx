import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Wallet, CheckCircle2 } from "lucide-react";

interface PaymentMethodsProps {
  paymentMethod: string | null;
  setPaymentMethod: (method: string) => void;
}

export function PaymentMethods({ paymentMethod, setPaymentMethod }: PaymentMethodsProps) {
  const paymentOptions = [
    {
      id: 'bank',
      title: 'Bank Transfer',
      description: 'Transfer directly from your bank account',
      icon: Wallet,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'paystack',
      title: 'Paystack',
      description: 'Pay with card, bank or USSD via Paystack',
      icon: CreditCard,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 'flutterwave',
      title: 'Flutterwave',
      description: 'Pay with multiple payment options via Flutterwave',
      icon: CreditCard,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all ${paymentMethod === option.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
              onClick={() => setPaymentMethod(option.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`${option.iconBg} p-2 rounded-full`}>
                      <Icon className={`h-5 w-5 ${option.iconColor}`} />
                    </div>
                    <CardTitle className="text-base">{option.title}</CardTitle>
                  </div>
                  {paymentMethod === option.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-3 text-sm text-muted-foreground">
                {option.description}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 