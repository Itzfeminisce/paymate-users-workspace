import { Category, Provider, Validity } from "../settings/types";

// Mock data for the form fields
export const categories: Category[] = [
  { id: 'airtime', name: 'Airtime', transactionFee: 1.0 },
  { id: 'data', name: 'Data', transactionFee: 1.5 },
  { id: 'cable-tv', name: 'Cable TV', transactionFee: 1.0 },
  { id: 'electricity', name: 'Electricity', transactionFee: 0.5 },
];

export const providers: Provider[] = [
  { id: 'mtn', name: 'MTN', status: 'active' },
  { id: 'airtel', name: 'Airtel', status: 'active' },
  { id: 'glo', name: 'Glo', status: 'active' },
  { id: '9mobile', name: '9Mobile', status: 'active' },
];

export const validities: Validity[] = [
  { id: 'daily', name: 'Daily', duration: 1, durationType: 'days', applicableToCategories: ['data'] },
  { id: 'weekly', name: 'Weekly', duration: 7, durationType: 'days', applicableToCategories: ['data'] },
  { id: 'monthly', name: 'Monthly', duration: 1, durationType: 'months', applicableToCategories: ['data', 'cable-tv'] },
  { id: 'yearly', name: 'Yearly', duration: 1, durationType: 'years', applicableToCategories: ['data', 'cable-tv'] },
];
