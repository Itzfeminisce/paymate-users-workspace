
import { z } from 'zod';

// Define interfaces
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  status: 'active' | 'inactive';
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super admin' | 'admin' | 'support';
  lastLogin: string;
}

export type CurrentUser = (Customer | Admin) & { type?: 'customer' | 'admin' };

// Form schema for customers
export const customerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(11, { message: 'Phone number must be at least 11 characters' }),
  balance: z.coerce.number().min(0, { message: 'Balance cannot be negative' }),
  status: z.enum(['active', 'inactive'], { message: 'Status must be either active or inactive' }),
});

// Form schema for admins
export const adminSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.enum(['super admin', 'admin', 'support'], { message: 'Please select a valid role' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
export type AdminFormValues = z.infer<typeof adminSchema>;
