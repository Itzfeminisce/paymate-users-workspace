
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { CategoryFormValues } from '../settings/types';

interface CategoryFormFieldsProps {
  form: UseFormReturn<CategoryFormValues>;
}

export function CategoryFormFields({ form }: CategoryFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter category name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon Name (Lucide)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., phone, wifi, tv" {...field} value={field.value || ''} />
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
              <Input type="number" min="0" step="0.1" placeholder="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
