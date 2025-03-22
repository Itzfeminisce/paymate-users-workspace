
import { z } from 'zod';

// Define service interface
export interface Service {
  id: string;
  name: string;
  category: string;
  providerId?: string;
  validityId?: string;
  price: number;
  discount: number;
  status: 'active' | 'inactive';
}

// Form schema
export const serviceSchema = z.object({
  name: z.string().min(3, { message: 'Service name must be at least 3 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  providerId: z.string().optional(),
  validityId: z.string().optional(),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  discount: z.coerce.number().min(0, { message: 'Discount must be a positive number or zero' }),
  status: z.enum(['active', 'inactive'], { message: 'Status must be either active or inactive' }),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
