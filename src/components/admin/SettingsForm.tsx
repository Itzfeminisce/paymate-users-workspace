
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { SettingsFormValues, Category } from './settings/types';
import { GeneralSettingsFields } from './settings/GeneralSettingsFields';
import { PlatformStatusFields } from './settings/PlatformStatusFields';
import { FeaturesControlFields } from './settings/FeaturesControlFields';
import { PlatformInfoFields } from './settings/PlatformInfoFields';
import { TransactionFeesFields } from './settings/TransactionFeesFields';

interface SettingsFormProps {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: (data: SettingsFormValues) => void;
  categories: Category[];
}

export function SettingsForm({ form, onSubmit, categories }: SettingsFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PlatformInfoFields form={form} />
        
        <Separator />
        
        <GeneralSettingsFields form={form} />
        
        <Separator />
        
        <PlatformStatusFields form={form} />
        
        <Separator />
        
        <FeaturesControlFields form={form} />

        <Separator />

        <TransactionFeesFields form={form} categories={categories} />

        <Button type="submit" className="mt-6">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </form>
    </Form>
  );
}
