
import { useState } from 'react';
import { Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super admin' | 'admin' | 'support';
  lastLogin: string;
}

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

// Form schema for customers
const customerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(11, { message: 'Phone number must be at least 11 characters' }),
  balance: z.coerce.number().min(0, { message: 'Balance cannot be negative' }),
  status: z.enum(['active', 'inactive'], { message: 'Status must be either active or inactive' }),
});

// Form schema for admins
const adminSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.enum(['super admin', 'admin', 'support'], { message: 'Please select a valid role' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type CustomerFormValues = z.infer<typeof customerSchema>;
type AdminFormValues = z.infer<typeof adminSchema>;

type CurrentItem = (Customer | Admin) & { type?: 'customer' | 'admin' };

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("customers");
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CurrentItem | null>(null);
  const { toast } = useToast();

  const customerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      balance: 0,
      status: 'active',
    },
  });

  const adminForm = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'admin',
      password: '',
    },
  });

  const editCustomerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      balance: 0,
      status: 'active',
    },
  });

  const openAddCustomerDialog = () => {
    customerForm.reset();
    setIsCustomerDialogOpen(true);
  };

  const openAddAdminDialog = () => {
    adminForm.reset();
    setIsAdminDialogOpen(true);
  };

  const openEditCustomerDialog = (customer: Customer) => {
    setCurrentItem(customer);
    editCustomerForm.reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      balance: customer.balance,
      status: customer.status,
    });
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
      ...data,
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
      customer.id === currentItem.id ? { ...customer, ...data } : customer
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Balance (₦)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.balance}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditCustomerDialog(customer)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(customer, 'customer')}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="admins">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {admin.role}
                      </span>
                    </TableCell>
                    <TableCell>{admin.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(admin, 'admin')}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Add Customer Dialog */}
      <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new customer.
            </DialogDescription>
          </DialogHeader>
          <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(onSubmitCustomer)} className="space-y-4">
              <FormField
                control={customerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customerForm.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customerForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add Customer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Admin Dialog */}
      <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new admin user.
            </DialogDescription>
          </DialogHeader>
          <Form {...adminForm}>
            <form onSubmit={adminForm.handleSubmit(onSubmitAdmin)} className="space-y-4">
              <FormField
                control={adminForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={adminForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={adminForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="admin">Admin</option>
                        <option value="super admin">Super Admin</option>
                        <option value="support">Support</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={adminForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add Admin</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update the customer details.
            </DialogDescription>
          </DialogHeader>
          <Form {...editCustomerForm}>
            <form onSubmit={editCustomerForm.handleSubmit(onSubmitEditCustomer)} className="space-y-4">
              <FormField
                control={editCustomerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editCustomerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editCustomerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editCustomerForm.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editCustomerForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Update Customer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {currentItem?.type === 'customer' ? 'Customer' : 'Admin'}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {currentItem?.type === 'customer' ? 'customer' : 'admin'}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
