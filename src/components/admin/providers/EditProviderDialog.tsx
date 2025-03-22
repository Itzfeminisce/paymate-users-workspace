
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProviderFormFields } from './ProviderFormFields';
import { Provider, providerSchema, ProviderFormValues } from '../settings/types';
import { useEffect } from 'react';

interface EditProviderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProviderFormValues) => void;
  currentProvider: Provider | null;
}

export function EditProviderDialog({ isOpen, onOpenChange, onSubmit, currentProvider }: EditProviderDialogProps) {
  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: '',
      logo: '',
      supportEmail: '',
      supportPhone: '',
      apiKey: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (currentProvider) {
      form.reset({
        name: currentProvider.name,
        logo: currentProvider.logo || '',
        supportEmail: currentProvider.supportEmail || '',
        supportPhone: currentProvider.supportPhone || '',
        apiKey: currentProvider.apiKey || '',
        status: currentProvider.status,
      });
    }
  }, [currentProvider, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Provider</DialogTitle>
          <DialogDescription>
            Update the provider details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProviderFormFields form={form} />
            <DialogFooter>
              <Button type="submit">Update Provider</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
