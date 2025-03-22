
import { z } from 'zod';

// Form schema
export const settingsSchema = z.object({
  platformName: z.string().min(3, { message: 'Platform name must be at least 3 characters' }),
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
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
