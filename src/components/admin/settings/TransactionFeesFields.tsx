
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { SettingsFormValues, Category } from './types';

interface TransactionFeesFieldsProps {
  form: UseFormReturn<SettingsFormValues>;
  categories: Category[];
}

export function TransactionFeesFields({ form, categories }: TransactionFeesFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Transaction Fees</h3>
      <FormField
        control={form.control}
        name="transactionFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Default Transaction Fee (%)</FormLabel>
            <FormControl>
              <Input type="number" step="0.1" min="0" placeholder="1.5" {...field} />
            </FormControl>
            <FormMessage />
            <p className="text-sm text-muted-foreground">
              This fee will be applied to all transactions unless a category-specific fee is set.
            </p>
          </FormItem>
        )}
      />
      
      <div className="space-y-3 mt-4">
        <h4 className="text-md font-medium">Category-Specific Fees</h4>
        {categories.map((category) => (
          <FormField
            key={category.id}
            control={form.control}
            name={`categoryFees.${category.id}`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-sm">{category.name} Fee (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      min="0" 
                      className="w-24 text-right" 
                      placeholder={form.getValues().transactionFee.toString()}
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? '' : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <p className="text-xs text-muted-foreground mt-2">
          Leave empty to use the default transaction fee for that category.
        </p>
      </div>
    </div>
  );
}
