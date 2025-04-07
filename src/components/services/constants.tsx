import { Wifi, Phone, Tv, Zap, School, CreditCard, Globe, DollarSign } from 'lucide-react';
import * as z from 'zod';

// Phone validation: exactly 11 digits starting with 0.
export const phoneValidation = z
  .string()
  .regex(/^0\d{10}$/, { message: 'Phone number must be 11 digits starting with 0' });

// Shared styling for toggle buttons
export const toggleClass =
  "flex items-center justify-center h-10 rounded-md border border-gray-300 bg-white px-4 py-6 text-sm font-medium transition-colors hover:bg-gray-50 hover:border-gray-500 cursor-pointer peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white";

// Service Types
export const serviceTypesArr = [
  { id: 'data', name: 'Data', icon: <Wifi className="h-5 w-5" /> },
  { id: 'airtime', name: 'Airtime', icon: <Phone className="h-5 w-5" /> },
  { id: 'cable', name: 'Cable TV', icon: <Tv className="h-5 w-5" /> },
  { id: 'electricity', name: 'Electricity', icon: <Zap className="h-5 w-5" /> },
  { id: 'education', name: 'Education', icon: <School className="h-5 w-5" /> },
  { id: 'betting', name: 'Betting', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'internet', name: 'Internet', icon: <Globe className="h-5 w-5" /> },
  { id: 'others', name: 'Others', icon: <DollarSign className="h-5 w-5" /> },
];

// Providers and Options
export const networkProviders = [
  { id: 'mtn', name: 'MTN' },
  { id: 'airtel', name: 'Airtel' },
  { id: '9mobile', name: '9Mobile' },
  { id: 'glo', name: 'Glo' },
];

export const cableProviders = [
  { id: 'dstv', name: 'DSTV' },
  { id: 'gotv', name: 'GoTV' },
  { id: 'startimes', name: 'StarTimes' },
  { id: 'showmax', name: 'Showmax' },
];

export const electricityProviders = [
  { id: 'ekedc', name: 'Eko Electric (EKEDC)' },
  { id: 'ikedc', name: 'Ikeja Electric (IKEDC)' },
  { id: 'aedc', name: 'Abuja Electric (AEDC)' },
  { id: 'ibedc', name: 'Ibadan Electric (IBEDC)' },
  { id: 'phedc', name: 'Port Harcourt Electric (PHEDC)' },
];

export const predefinedAmounts = [
  { value: '100', label: '₦100' },
  { value: '200', label: '₦200' },
  { value: '500', label: '₦500' },
  { value: '1000', label: '₦1,000' },
  { value: 'custom', label: 'Custom Amount' },
];

export const dataBundles = [
  { id: '1gb', label: '1GB - ₦300 (30 Days)' },
  { id: '2gb', label: '2GB - ₦500 (30 Days)' },
  { id: '5gb', label: '5GB - ₦1,000 (30 Days)' },
  { id: '10gb', label: '10GB - ₦2,000 (30 Days)' },
];

export const cablePackages = [
  { id: 'compact', label: 'DSTV Compact - ₦9,000' },
  { id: 'premium', label: 'DSTV Premium - ₦21,000' },
  { id: 'confam', label: 'GoTV Confam - ₦5,500' },
  { id: 'max', label: 'GoTV Max - ₦4,150' },
];

export const meterTypes = [
  { id: 'prepaid', label: 'Prepaid' },
  { id: 'postpaid', label: 'Postpaid' },
];

export const examBoards = [
  { id: 'waec', label: 'WAEC' },
  { id: 'jamb', label: 'JAMB' },
  { id: 'neco', label: 'NECO' },
];

export const examTypes = [
  { id: 'result', label: 'Result Checker' },
  { id: 'registration', label: 'Registration PIN' },
];

export const quantities = [
  { id: '1', label: '1 PIN' },
  { id: '5', label: '5 PINs' },
  { id: '10', label: '10 PINs' },
];

export const othersServiceOptions = [
  { id: 'donation', label: 'Donation' },
  { id: 'repair', label: 'Repair' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'misc', label: 'Miscellaneous' },
];

export const internetProviders = [
  { id: 'spectranet', label: 'Spectranet' },
  { id: 'smile', label: 'Smile' },
  { id: 'multilinks', label: 'Multilinks' },
  { id: 'ipnx', label: 'IPNX' },
];

export const internetPlans = [
  { id: 'basic', label: 'Basic Plan - ₦2,000' },
  { id: 'standard', label: 'Standard Plan - ₦3,500' },
  { id: 'premium', label: 'Premium Plan - ₦5,000' },
];

export const bettingPlatforms = [
  { id: 'bet9ja', label: 'Bet9ja' },
  { id: 'sportybet', label: 'SportyBet' },
  { id: 'merrybet', label: 'Merrybet' },
]; 