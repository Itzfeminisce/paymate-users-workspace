
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { SettingsFormValues } from './types';

interface PlatformStatusFieldsProps {
  form: UseFormReturn<SettingsFormValues>;
}

export function PlatformStatusFields({ form }: PlatformStatusFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Platform Status</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="maintenanceMode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Maintenance Mode</FormLabel>
                <FormDescription>
                  Enable maintenance mode to temporarily disable the platform
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allowRegistration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Allow Registration</FormLabel>
                <FormDescription>
                  Allow new users to register on the platform
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
