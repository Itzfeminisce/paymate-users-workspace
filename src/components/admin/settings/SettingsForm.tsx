
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { SettingsFormValues } from './types';
import { GeneralSettingsFields } from './GeneralSettingsFields';
import { PlatformStatusFields } from './PlatformStatusFields';
import { FeaturesControlFields } from './FeaturesControlFields';

interface SettingsFormProps {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: (data: SettingsFormValues) => void;
}

export function SettingsForm({ form, onSubmit }: SettingsFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <GeneralSettingsFields form={form} />
        
        <Separator />
        
        <PlatformStatusFields form={form} />
        
        <Separator />
        
        <FeaturesControlFields form={form} />

        <Button type="submit" className="mt-6">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </form>
    </Form>
  );
}
