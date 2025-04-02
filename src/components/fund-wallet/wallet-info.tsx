import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { UseFormReturn } from "react-hook-form";
import { FundingFormValues } from "./types";

interface WalletInfoProps {
  form: UseFormReturn<FundingFormValues>;
}

export function WalletInfo({ form }: WalletInfoProps) {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-lg font-medium mb-4">Your Wallet</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Balance</span>
            <span className="font-semibold">₦{form.getValues().amount || '0.00'}</span>
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
    </div>
  );
} 