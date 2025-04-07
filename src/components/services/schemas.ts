import * as z from 'zod';
import { phoneValidation } from './constants';

export const getServiceSchema = (serviceType: string) => {
  const baseSchema = {
    provider: z.string().min(1, { message: 'Please select a provider' }),
  };

  const specificSchemas = {
    data: z.object({
      ...baseSchema,
      phone: phoneValidation,
      dataType: z.string().min(1, { message: 'Please select a data bundle' }),
    }),
    airtime: z.object({
      ...baseSchema,
      phone: phoneValidation,
      amount: z.string().regex(/^\d+$/, { message: 'Amount must be a number' }),
    }),
    cable: z.object({
      ...baseSchema,
      smartCardNumber: z.string().min(1, { message: 'Please enter a valid smart card number' }),
      package: z.string().min(1, { message: 'Please select a package' }),
    }),
    electricity: z.object({
      ...baseSchema,
      meterNumber: z.string().min(1, { message: 'Please enter a valid meter number' }),
      meterType: z.string().min(1, { message: 'Please select a meter type' }),
      amount: z.string().regex(/^\d+$/, { message: 'Amount must be a number' }),
    }),
    education: z.object({
      ...baseSchema,
      examType: z.string().min(1, { message: 'Please select exam type' }),
      quantity: z.string().min(1, { message: 'Please select quantity' }),
    }),
    betting: z.object({
      platform: z.string().min(1, { message: 'Please select a betting platform' }),
      userId: z.string().min(1, { message: 'Please enter your user ID' }),
      amount: z.string().regex(/^\d+$/, { message: 'Amount must be a number' }),
    }),
    internet: z.object({
      ...baseSchema,
      planType: z.string().min(1, { message: 'Please select a plan' }),
      accountNumber: z.string().min(1, { message: 'Please enter account number' }),
    }),
    others: z.object({
      serviceType: z.string().min(1, { message: 'Please select a service type' }),
      referenceId: z.string().min(1, { message: 'Please enter reference ID' }),
      amount: z.string().regex(/^\d+$/, { message: 'Amount must be a number' }),
    }),
  };

  return specificSchemas[serviceType] || z.object({});
}; 