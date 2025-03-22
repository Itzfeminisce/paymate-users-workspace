
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryFormFields } from './CategoryFormFields';
import { Category, categorySchema, CategoryFormValues } from '../settings/types';
import { useEffect } from 'react';

interface EditCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryFormValues) => void;
  currentCategory: Category | null;
}

export function EditCategoryDialog({ isOpen, onOpenChange, onSubmit, currentCategory }: EditCategoryDialogProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      icon: '',
      transactionFee: 0,
    },
  });

  useEffect(() => {
    if (currentCategory) {
      form.reset({
        name: currentCategory.name,
        icon: currentCategory.icon || '',
        transactionFee: currentCategory.transactionFee,
      });
    }
  }, [currentCategory, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CategoryFormFields form={form} />
            <DialogFooter>
              <Button type="submit">Update Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
