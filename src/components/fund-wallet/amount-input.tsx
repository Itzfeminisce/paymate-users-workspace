import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GlassCard from "@/components/ui/GlassCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FundingFormValues } from "./types";

interface AmountInputProps {
  form: UseFormReturn<FundingFormValues>;
}

export function AmountInput({ form }: AmountInputProps) {
  return (
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
  );
} 