
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { SettingsFormValues } from './types';

interface PlatformInfoFieldsProps {
  form: UseFormReturn<SettingsFormValues>;
}

export function PlatformInfoFields({ form }: PlatformInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Platform Information</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="platformName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform Name</FormLabel>
              <FormControl>
                <Input placeholder="PayMate VTU" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platformIcon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform Icon URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/icon.png" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="platformDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platform Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="A comprehensive VTU platform for all your utility payments" 
                className="resize-none" 
                rows={3} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
