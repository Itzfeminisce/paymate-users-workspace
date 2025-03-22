
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { SettingsFormValues } from './types';

interface GeneralSettingsFieldsProps {
  form: UseFormReturn<SettingsFormValues>;
}

export function GeneralSettingsFields({ form }: GeneralSettingsFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">General Settings</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="platformName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter platform name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supportEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Support email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supportPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Phone</FormLabel>
              <FormControl>
                <Input placeholder="Support phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactionFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Fee (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Fee charged on each transaction
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minimumAccountBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Account Balance (₦)</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Minimum balance users must maintain
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
