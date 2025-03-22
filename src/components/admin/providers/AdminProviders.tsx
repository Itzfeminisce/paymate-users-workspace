
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Provider, ProviderFormValues } from '../settings/types';
import { ProviderTable } from './ProviderTable';
import { AddProviderDialog } from './AddProviderDialog';
import { EditProviderDialog } from './EditProviderDialog';
import { DeleteProviderDialog } from './DeleteProviderDialog';

// Mock data for providers
const initialProviders: Provider[] = [
  { id: '1', name: 'MTN Nigeria', logo: 'mtn.png', supportEmail: 'support@mtn.com', supportPhone: '08031234567', status: 'active' },
  { id: '2', name: 'Airtel', logo: 'airtel.png', supportEmail: 'support@airtel.com', supportPhone: '09087654321', status: 'active' },
  { id: '3', name: 'DSTV', logo: 'dstv.png', supportEmail: 'support@dstv.com', supportPhone: '07012345678', status: 'active' },
  { id: '4', name: 'IKEDC', logo: 'ikedc.png', supportEmail: 'support@ikedc.com', supportPhone: '08098765432', status: 'inactive' },
];

export default function AdminProviders() {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const { toast } = useToast();

  const openEditDialog = (provider: Provider) => {
    setCurrentProvider(provider);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (provider: Provider) => {
    setCurrentProvider(provider);
    setIsDeleteDialogOpen(true);
  };

  const onSubmitAdd = (data: ProviderFormValues) => {
    // In a real app, you would make an API call to create a provider
    const newProvider: Provider = {
      id: (providers.length + 1).toString(),
      name: data.name,
      logo: data.logo,
      supportEmail: data.supportEmail,
      supportPhone: data.supportPhone,
      apiKey: data.apiKey,
      status: data.status,
    };
    setProviders([...providers, newProvider]);
    setIsAddDialogOpen(false);
    toast({
      title: "Provider created",
      description: "The provider has been created successfully.",
    });
  };

  const onSubmitEdit = (data: ProviderFormValues) => {
    // In a real app, you would make an API call to update a provider
    if (!currentProvider) return;
    
    const updatedProviders = providers.map((provider) => 
      provider.id === currentProvider.id ? { 
        ...provider, 
        name: data.name,
        logo: data.logo,
        supportEmail: data.supportEmail,
        supportPhone: data.supportPhone,
        apiKey: data.apiKey,
        status: data.status,
      } : provider
    );
    setProviders(updatedProviders);
    setIsEditDialogOpen(false);
    toast({
      title: "Provider updated",
      description: "The provider has been updated successfully.",
    });
  };

  const onDelete = () => {
    // In a real app, you would make an API call to delete a provider
    if (!currentProvider) return;
    
    const filteredProviders = providers.filter((provider) => provider.id !== currentProvider.id);
    setProviders(filteredProviders);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Provider deleted",
      description: "The provider has been deleted successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Providers</CardTitle>
        <AddProviderDialog 
          isOpen={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen} 
          onSubmit={onSubmitAdd} 
        />
      </CardHeader>
      <CardContent>
        <ProviderTable 
          providers={providers} 
          onEdit={openEditDialog} 
          onDelete={openDeleteDialog} 
        />
      </CardContent>

      <EditProviderDialog 
        isOpen={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        onSubmit={onSubmitEdit} 
        currentProvider={currentProvider} 
      />

      <DeleteProviderDialog 
        isOpen={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onDelete={onDelete} 
      />
    </Card>
  );
}
