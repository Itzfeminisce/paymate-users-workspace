
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServiceFormFields } from './ServiceFormFields';
import { Service, serviceSchema, ServiceFormValues } from './types';
import { useEffect } from 'react';

interface EditServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ServiceFormValues) => void;
  currentService: Service | null;
}

export function EditServiceDialog({ isOpen, onOpenChange, onSubmit, currentService }: EditServiceDialogProps) {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      discount: 0,
      status: 'active',
    },
  });

  useEffect(() => {
    if (currentService) {
      form.reset({
        name: currentService.name,
        category: currentService.category,
        price: currentService.price,
        discount: currentService.discount,
        status: currentService.status,
      });
    }
  }, [currentService, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the service details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ServiceFormFields form={form} />
            <DialogFooter>
              <Button type="submit">Update Service</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
