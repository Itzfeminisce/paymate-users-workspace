
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Service, ServiceFormValues } from './services/types';
import { ServiceTable } from './services/ServiceTable';
import { AddServiceDialog } from './services/AddServiceDialog';
import { EditServiceDialog } from './services/EditServiceDialog';
import { DeleteServiceDialog } from './services/DeleteServiceDialog';

// Mock data for services
const initialServices: Service[] = [
  { id: '1', name: 'MTN Airtime', category: 'Airtime', price: 100, discount: 2, status: 'active' },
  { id: '2', name: 'Airtel Data 1GB', category: 'Data', price: 300, discount: 1, status: 'active' },
  { id: '3', name: 'DSTV Subscription', category: 'Cable TV', price: 2000, discount: 0.5, status: 'active' },
  { id: '4', name: 'PHCN Electricity', category: 'Electricity', price: 1000, discount: 0, status: 'inactive' },
];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const { toast } = useToast();

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const onSubmitAdd = (data: ServiceFormValues) => {
    // In a real app, you would make an API call to create a service
    const newService: Service = {
      id: (services.length + 1).toString(),
      ...data,
    };
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
    toast({
      title: "Service created",
      description: "The service has been created successfully.",
    });
  };

  const onSubmitEdit = (data: ServiceFormValues) => {
    // In a real app, you would make an API call to update a service
    if (!currentService) return;
    
    const updatedServices = services.map((service) => 
      service.id === currentService.id ? { ...service, ...data } : service
    );
    setServices(updatedServices);
    setIsEditDialogOpen(false);
    toast({
      title: "Service updated",
      description: "The service has been updated successfully.",
    });
  };

  const onDelete = () => {
    // In a real app, you would make an API call to delete a service
    if (!currentService) return;
    
    const filteredServices = services.filter((service) => service.id !== currentService.id);
    setServices(filteredServices);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Service deleted",
      description: "The service has been deleted successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>VTU Services</CardTitle>
        <AddServiceDialog 
          isOpen={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen} 
          onSubmit={onSubmitAdd} 
        />
      </CardHeader>
      <CardContent>
        <ServiceTable 
          services={services} 
          onEdit={openEditDialog} 
          onDelete={openDeleteDialog} 
        />
      </CardContent>

      <EditServiceDialog 
        isOpen={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        onSubmit={onSubmitEdit} 
        currentService={currentService} 
      />

      <DeleteServiceDialog 
        isOpen={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onDelete={onDelete} 
      />
    </Card>
  );
}
