
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Validity, ValidityFormValues, Category } from '../settings/types';
import { ValidityTable } from './ValidityTable';
import { AddValidityDialog } from './AddValidityDialog';
import { EditValidityDialog } from './EditValidityDialog';
import { DeleteValidityDialog } from './DeleteValidityDialog';

// Mock data for categories (should ideally come from a categories context or API)
const mockCategories: Category[] = [
  { id: '1', name: 'Airtime', icon: 'phone', transactionFee: 1.0 },
  { id: '2', name: 'Data', icon: 'wifi', transactionFee: 1.5 },
  { id: '3', name: 'Cable TV', icon: 'tv', transactionFee: 1.0 },
  { id: '4', name: 'Electricity', icon: 'zap', transactionFee: 0.5 },
];

// Mock data for validities
const initialValidities: Validity[] = [
  { id: '1', name: 'Daily', duration: 1, durationType: 'days', applicableToCategories: ['1', '2'] },
  { id: '2', name: 'Weekly', duration: 1, durationType: 'weeks', applicableToCategories: ['2'] },
  { id: '3', name: 'Monthly', duration: 1, durationType: 'months', applicableToCategories: ['2', '3'] },
  { id: '4', name: 'Yearly', duration: 1, durationType: 'years', applicableToCategories: ['3'] },
];

export default function AdminValidity() {
  const [validities, setValidities] = useState<Validity[]>(initialValidities);
  const [categories] = useState<Category[]>(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentValidity, setCurrentValidity] = useState<Validity | null>(null);
  const { toast } = useToast();

  const openEditDialog = (validity: Validity) => {
    setCurrentValidity(validity);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (validity: Validity) => {
    setCurrentValidity(validity);
    setIsDeleteDialogOpen(true);
  };

  const onSubmitAdd = (data: ValidityFormValues) => {
    // In a real app, you would make an API call to create a validity
    const newValidity: Validity = {
      id: (validities.length + 1).toString(),
      name: data.name,
      duration: data.duration,
      durationType: data.durationType,
      applicableToCategories: data.applicableToCategories,
    };
    setValidities([...validities, newValidity]);
    setIsAddDialogOpen(false);
    toast({
      title: "Validity created",
      description: "The validity period has been created successfully.",
    });
  };

  const onSubmitEdit = (data: ValidityFormValues) => {
    // In a real app, you would make an API call to update a validity
    if (!currentValidity) return;
    
    const updatedValidities = validities.map((validity) => 
      validity.id === currentValidity.id ? { 
        ...validity, 
        name: data.name,
        duration: data.duration,
        durationType: data.durationType,
        applicableToCategories: data.applicableToCategories,
      } : validity
    );
    setValidities(updatedValidities);
    setIsEditDialogOpen(false);
    toast({
      title: "Validity updated",
      description: "The validity period has been updated successfully.",
    });
  };

  const onDelete = () => {
    // In a real app, you would make an API call to delete a validity
    if (!currentValidity) return;
    
    const filteredValidities = validities.filter((validity) => validity.id !== currentValidity.id);
    setValidities(filteredValidities);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Validity deleted",
      description: "The validity period has been deleted successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Validity Periods</CardTitle>
        <AddValidityDialog 
          isOpen={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen} 
          onSubmit={onSubmitAdd}
          categories={categories}
        />
      </CardHeader>
      <CardContent>
        <ValidityTable 
          validities={validities} 
          categories={categories}
          onEdit={openEditDialog} 
          onDelete={openDeleteDialog} 
        />
      </CardContent>

      <EditValidityDialog 
        isOpen={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        onSubmit={onSubmitEdit} 
        currentValidity={currentValidity}
        categories={categories}
      />

      <DeleteValidityDialog 
        isOpen={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onDelete={onDelete} 
      />
    </Card>
  );
}
