
import { z } from 'zod';

// Form schema
export const settingsSchema = z.object({
  platformName: z.string().min(3, { message: 'Platform name must be at least 3 characters' }),
  platformDescription: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  platformIcon: z.string().optional(),
  supportEmail: z.string().email({ message: 'Please enter a valid email address' }),
  supportPhone: z.string().min(11, { message: 'Phone number must be at least 11 characters' }),
  maintenanceMode: z.boolean().default(false),
  allowRegistration: z.boolean().default(true),
  enableAirtimePurchase: z.boolean().default(true),
  enableDataPurchase: z.boolean().default(true),
  enableCableTVPayment: z.boolean().default(true),
  enableElectricityPayment: z.boolean().default(true),
  transactionFee: z.coerce.number().min(0, { message: 'Transaction fee cannot be negative' }),
  minimumAccountBalance: z.coerce.number().min(0, { message: 'Minimum account balance cannot be negative' }),
  categoryFees: z.record(z.string(), z.coerce.number().min(0)),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

// Category schema
export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Category name must be at least 2 characters' }),
  icon: z.string().optional(),
  transactionFee: z.coerce.number().min(0, { message: 'Transaction fee cannot be negative' }).default(0),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

// Provider schema
export const providerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Provider name must be at least 2 characters' }),
  logo: z.string().optional(),
  supportEmail: z.string().email({ message: 'Please enter a valid email address' }).optional(),
  supportPhone: z.string().min(11, { message: 'Phone number must be at least 11 characters' }).optional(),
  apiKey: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type ProviderFormValues = z.infer<typeof providerSchema>;

// Validity schema
export const validitySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Validity name must be at least 2 characters' }),
  duration: z.coerce.number().min(1, { message: 'Duration must be at least 1' }),
  durationType: z.enum(['days', 'weeks', 'months', 'years']),
  applicableToCategories: z.array(z.string()),
});

export type ValidityFormValues = z.infer<typeof validitySchema>;

// Interfaces for actual data
export interface Category {
  id: string;
  name: string;
  icon?: string;
  transactionFee: number;
} 

export interface Provider {
  id: string;
  name: string;
  logo?: string;
  supportEmail?: string;
  supportPhone?: string;
  apiKey?: string;
  status: 'active' | 'inactive';
}

export interface Validity {
  id: string;
  name: string;
  duration: number;
  durationType: 'days' | 'weeks' | 'months' | 'years';
  applicableToCategories: string[];
}
