
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidityFormFields } from './ValidityFormFields';
import { validitySchema, ValidityFormValues, Category } from '../settings/types';

interface AddValidityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ValidityFormValues) => void;
  categories: Category[];
}

export function AddValidityDialog({ isOpen, onOpenChange, onSubmit, categories }: AddValidityDialogProps) {
  const form = useForm<ValidityFormValues>({
    resolver: zodResolver(validitySchema),
    defaultValues: {
      name: '',
      duration: 1,
      durationType: 'days',
      applicableToCategories: [],
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Validity
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Validity</DialogTitle>
          <DialogDescription>
            Add a new validity period for services on your VTU platform.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ValidityFormFields form={form} categories={categories} />
            <DialogFooter>
              <Button type="submit">Add Validity</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
