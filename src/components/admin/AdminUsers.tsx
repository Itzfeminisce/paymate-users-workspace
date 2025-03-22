
import { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { 
  Customer, 
  Admin, 
  CustomerFormValues, 
  AdminFormValues,
  CurrentUser
} from './users/types';
import { CustomerTable } from './users/CustomerTable';
import { AdminTable } from './users/AdminTable';
import { AddCustomerDialog } from './users/AddCustomerDialog';
import { AddAdminDialog } from './users/AddAdminDialog';
import { EditCustomerDialog } from './users/EditCustomerDialog';
import { DeleteUserDialog } from './users/DeleteUserDialog';

// Mock data
const initialCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '08012345678', balance: 5000, status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '08087654321', balance: 2500, status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '07056781234', balance: 0, status: 'inactive' },
];

const initialAdmins: Admin[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'super admin', lastLogin: '2023-10-15' },
  { id: '2', name: 'Support Staff', email: 'support@example.com', role: 'support', lastLogin: '2023-10-14' },
];

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("customers");
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CurrentUser | null>(null);
  const { toast } = useToast();

  const openAddCustomerDialog = () => {
    setIsCustomerDialogOpen(true);
  };

  const openAddAdminDialog = () => {
    setIsAdminDialogOpen(true);
  };

  const openEditCustomerDialog = (customer: Customer) => {
    setCurrentItem(customer);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: Customer | Admin, type: 'customer' | 'admin') => {
    setCurrentItem({ ...item, type });
    setIsDeleteDialogOpen(true);
  };

  const onSubmitCustomer = (data: CustomerFormValues) => {
    // In a real app, you would make an API call to create a customer
    const newCustomer: Customer = {
      id: (customers.length + 1).toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      balance: data.balance,
      status: data.status
    };
    setCustomers([...customers, newCustomer]);
    setIsCustomerDialogOpen(false);
    toast({
      title: "Customer created",
      description: "The customer has been created successfully.",
    });
  };

  const onSubmitAdmin = (data: AdminFormValues) => {
    // In a real app, you would make an API call to create an admin
    const newAdmin: Admin = {
      id: (admins.length + 1).toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      lastLogin: 'Never',
      // password would be hashed and sent to the backend
    };
    setAdmins([...admins, newAdmin]);
    setIsAdminDialogOpen(false);
    toast({
      title: "Admin created",
      description: "The admin has been created successfully.",
    });
  };

  const onSubmitEditCustomer = (data: CustomerFormValues) => {
    // In a real app, you would make an API call to update a customer
    if (!currentItem) return;
    
    const updatedCustomers = customers.map((customer) => 
      customer.id === currentItem.id ? {
        ...customer,
        name: data.name,
        email: data.email,
        phone: data.phone,
        balance: data.balance,
        status: data.status
      } : customer
    );
    setCustomers(updatedCustomers);
    setIsEditDialogOpen(false);
    toast({
      title: "Customer updated",
      description: "The customer has been updated successfully.",
    });
  };

  const onDelete = () => {
    // In a real app, you would make an API call to delete a user
    if (!currentItem || !currentItem.type) return;
    
    if (currentItem.type === 'customer') {
      const filteredCustomers = customers.filter((customer) => customer.id !== currentItem.id);
      setCustomers(filteredCustomers);
      toast({
        title: "Customer deleted",
        description: "The customer has been deleted successfully.",
      });
    } else {
      const filteredAdmins = admins.filter((admin) => admin.id !== currentItem.id);
      setAdmins(filteredAdmins);
      toast({
        title: "Admin deleted",
        description: "The admin has been deleted successfully.",
      });
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <div className="flex space-x-2">
          {activeTab === "customers" ? (
            <Button onClick={openAddCustomerDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          ) : (
            <Button onClick={openAddAdminDialog}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customers">
            <CustomerTable 
              customers={customers} 
              onEdit={openEditCustomerDialog} 
              onDelete={(customer) => openDeleteDialog(customer, 'customer')} 
            />
          </TabsContent>
          
          <TabsContent value="admins">
            <AdminTable 
              admins={admins} 
              onDelete={(admin) => openDeleteDialog(admin, 'admin')} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Dialogs */}
      <AddCustomerDialog 
        isOpen={isCustomerDialogOpen} 
        onOpenChange={setIsCustomerDialogOpen} 
        onSubmit={onSubmitCustomer} 
      />
      
      <AddAdminDialog 
        isOpen={isAdminDialogOpen} 
        onOpenChange={setIsAdminDialogOpen} 
        onSubmit={onSubmitAdmin} 
      />
      
      <EditCustomerDialog 
        isOpen={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        onSubmit={onSubmitEditCustomer} 
        currentCustomer={currentItem as Customer | null} 
      />
      
      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onDelete={onDelete} 
        userType={currentItem?.type || null} 
      />
    </Card>
  );
}
