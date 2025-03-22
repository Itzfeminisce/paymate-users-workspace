
import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

// Form schema
const settingsSchema = z.object({
  platformName: z.string().min(3, { message: 'Platform name must be at least 3 characters' }),
  supportEmail: z.string().email({ message: 'Please enter a valid email address' }),
  supportPhone: z.string().min(11, { message: 'Phone number must be at least 11 characters' }),
  maintenanceMode: z.boolean().default(false),
  allowRegistration: z.boolean().default(true),
  enableAirtimePurchase: z.boolean().default(true),
  enableDataPurchase: z.boolean().default(true),
  enableCableTVPayment: z.boolean().default(true),
  enableElectricityPayment: z.boolean().default(true),
  transactionFee: z.coerce.number().min(0, { message: 'Transaction fee cannot be negative' }),
  minimumAccountBalance: z.coerce.number().min(0, { message: 'Minimum account balance cannot be negative' }),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function AdminSettings() {
  const { toast } = useToast();
  
  // Initial form values
  const defaultValues: SettingsFormValues = {
    platformName: 'PayMate VTU',
    supportEmail: 'support@paymatevtu.com',
    supportPhone: '08012345678',
    maintenanceMode: false,
    allowRegistration: true,
    enableAirtimePurchase: true,
    enableDataPurchase: true,
    enableCableTVPayment: true,
    enableElectricityPayment: true,
    transactionFee: 1.5,
    minimumAccountBalance: 100,
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const onSubmit = (data: SettingsFormValues) => {
    // In a real app, you would make an API call to save settings
    console.log('Saving settings:', data);
    toast({
      title: "Settings saved",
      description: "Your platform settings have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Settings</CardTitle>
        <CardDescription>
          Configure your VTU platform's general settings and features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Separator />

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

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features Control</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="enableAirtimePurchase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Enable Airtime Purchase</FormLabel>
                        <FormDescription>
                          Allow users to purchase airtime on the platform
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enableDataPurchase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Enable Data Purchase</FormLabel>
                        <FormDescription>
                          Allow users to purchase data on the platform
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enableCableTVPayment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Enable Cable TV Payments</FormLabel>
                        <FormDescription>
                          Allow users to make Cable TV payments
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enableElectricityPayment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Enable Electricity Payments</FormLabel>
                        <FormDescription>
                          Allow users to make electricity bill payments
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="mt-6">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
