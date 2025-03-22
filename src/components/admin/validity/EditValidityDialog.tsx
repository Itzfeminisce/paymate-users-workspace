
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidityFormFields } from './ValidityFormFields';
import { Validity, validitySchema, ValidityFormValues, Category } from '../settings/types';
import { useEffect } from 'react';

interface EditValidityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ValidityFormValues) => void;
  currentValidity: Validity | null;
  categories: Category[];
}

export function EditValidityDialog({ isOpen, onOpenChange, onSubmit, currentValidity, categories }: EditValidityDialogProps) {
  const form = useForm<ValidityFormValues>({
    resolver: zodResolver(validitySchema),
    defaultValues: {
      name: '',
      duration: 1,
      durationType: 'days',
      applicableToCategories: [],
    },
  });

  useEffect(() => {
    if (currentValidity) {
      form.reset({
        name: currentValidity.name,
        duration: currentValidity.duration,
        durationType: currentValidity.durationType,
        applicableToCategories: currentValidity.applicableToCategories,
      });
    }
  }, [currentValidity, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Validity</DialogTitle>
          <DialogDescription>
            Update the validity period details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ValidityFormFields form={form} categories={categories} />
            <DialogFooter>
              <Button type="submit">Update Validity</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
