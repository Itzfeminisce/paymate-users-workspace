
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { settingsSchema, SettingsFormValues } from './settings/types';
import { SettingsForm } from './settings/SettingsForm';

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
        <SettingsForm form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
