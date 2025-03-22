
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { settingsSchema, SettingsFormValues, Category } from './settings/types';
import { SettingsForm } from './SettingsForm';

// Mock data for categories
const initialCategories: Category[] = [
  { id: '1', name: 'Airtime', icon: 'phone', transactionFee: 1.0 },
  { id: '2', name: 'Data', icon: 'wifi', transactionFee: 1.5 },
  { id: '3', name: 'Cable TV', icon: 'tv', transactionFee: 1.0 },
  { id: '4', name: 'Electricity', icon: 'zap', transactionFee: 0.5 },
];

export default function AdminSettings() {
  const { toast } = useToast();
  const [categories] = useState<Category[]>(initialCategories);
  
  // Initialize categoryFees object
  const initialCategoryFees: Record<string, number> = {};
  categories.forEach(category => {
    initialCategoryFees[category.id] = category.transactionFee;
  });
  
  // Initial form values
  const defaultValues: SettingsFormValues = {
    platformName: 'PayMate VTU',
    platformDescription: 'The most reliable VTU platform for all your utility payments',
    platformIcon: '',
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
    categoryFees: initialCategoryFees,
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
        <SettingsForm 
          form={form} 
          onSubmit={onSubmit} 
          categories={categories}
        />
      </CardContent>
    </Card>
  );
}
