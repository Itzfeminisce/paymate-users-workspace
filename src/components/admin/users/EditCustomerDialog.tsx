
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerFormFields } from './CustomerFormFields';
import { Customer, customerSchema, CustomerFormValues } from './types';
import { useEffect } from 'react';

interface EditCustomerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CustomerFormValues) => void;
  currentCustomer: Customer | null;
}

export function EditCustomerDialog({ isOpen, onOpenChange, onSubmit, currentCustomer }: EditCustomerDialogProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      balance: 0,
      status: 'active',
    },
  });

  useEffect(() => {
    if (currentCustomer) {
      form.reset({
        name: currentCustomer.name,
        email: currentCustomer.email,
        phone: currentCustomer.phone,
        balance: currentCustomer.balance,
        status: currentCustomer.status,
      });
    }
  }, [currentCustomer, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Update the customer details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomerFormFields form={form} />
            <DialogFooter>
              <Button type="submit">Update Customer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
