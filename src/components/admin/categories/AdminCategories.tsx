
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Category, CategoryFormValues } from '../settings/types';
import { CategoryTable } from './CategoryTable';
import { AddCategoryDialog } from './AddCategoryDialog';
import { EditCategoryDialog } from './EditCategoryDialog';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';

// Mock data for categories
const initialCategories: Category[] = [
  { id: '1', name: 'Airtime', icon: 'phone', transactionFee: 1.0 },
  { id: '2', name: 'Data', icon: 'wifi', transactionFee: 1.5 },
  { id: '3', name: 'Cable TV', icon: 'tv', transactionFee: 1.0 },
  { id: '4', name: 'Electricity', icon: 'zap', transactionFee: 0.5 },
];

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const onSubmitAdd = (data: CategoryFormValues) => {
    // In a real app, you would make an API call to create a category
    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      name: data.name,
      icon: data.icon,
      transactionFee: data.transactionFee || 0,
    };
    setCategories([...categories, newCategory]);
    setIsAddDialogOpen(false);
    toast({
      title: "Category created",
      description: "The category has been created successfully.",
    });
  };

  const onSubmitEdit = (data: CategoryFormValues) => {
    // In a real app, you would make an API call to update a category
    if (!currentCategory) return;
    
    const updatedCategories = categories.map((category) => 
      category.id === currentCategory.id ? { 
        ...category, 
        name: data.name,
        icon: data.icon,
        transactionFee: data.transactionFee || 0,
      } : category
    );
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    toast({
      title: "Category updated",
      description: "The category has been updated successfully.",
    });
  };

  const onDelete = () => {
    // In a real app, you would make an API call to delete a category
    if (!currentCategory) return;
    
    const filteredCategories = categories.filter((category) => category.id !== currentCategory.id);
    setCategories(filteredCategories);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Categories</CardTitle>
        <AddCategoryDialog 
          isOpen={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen} 
          onSubmit={onSubmitAdd} 
        />
      </CardHeader>
      <CardContent>
        <CategoryTable 
          categories={categories} 
          onEdit={openEditDialog} 
          onDelete={openDeleteDialog} 
        />
      </CardContent>

      <EditCategoryDialog 
        isOpen={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        onSubmit={onSubmitEdit} 
        currentCategory={currentCategory} 
      />

      <DeleteCategoryDialog 
        isOpen={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onDelete={onDelete} 
      />
    </Card>
  );
}
