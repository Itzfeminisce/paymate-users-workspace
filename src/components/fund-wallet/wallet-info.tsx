import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { UseFormReturn } from "react-hook-form";
import { FundingFormValues } from "./types";
import { useGetWalletQuery } from "@/hooks/api-hooks";
import { formatCurrency } from "@/utils/utils";

interface WalletInfoProps {
  form: UseFormReturn<FundingFormValues>;
}

export function WalletInfo({ form }: WalletInfoProps) {
  const { data: wallet, isLoading } = useGetWalletQuery();

  if (isLoading) {
    return <WalletInfoSkeleton />;
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-lg font-medium mb-4">Your Wallet</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Balance</span>
            <span className="font-semibold">{formatCurrency(wallet?.balance || 0)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Pending</span>
            <span className="font-semibold">{formatCurrency(wallet?.pending || 0)}</span>
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

const WalletInfoSkeleton = () => {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-lg font-medium mb-4">Your Wallet</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Balance</span>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Pending</span>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-medium mb-4">Need Help?</h3>
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
      </GlassCard>
    </div>
  )
}