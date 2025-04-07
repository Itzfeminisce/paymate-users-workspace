import { ProductCategory, ProductProvider, ProductService } from '@/hooks/api-hooks';
import { UseFormReturn } from 'react-hook-form';

export interface ServiceSidebarProps {
  activeCategory: ProductCategory | null;
  setActiveCategory: (category: ProductCategory) => void;
  setCategories: (categories: ProductCategory[]) => void;
}

export interface ServiceFormProps {
  activeCategory: ProductCategory | null;
  form: UseFormReturn<any>;
  amountType: string;
  onAmountTypeChange: (value: string) => void;
  onProviderChange: (value: ProductProvider) => void;
  onServiceChange: (value: ProductService) => void;
  activeProvider: ProductProvider | null;
}

export interface SummaryPanelProps {
  values: [string, any][];
  handleClearForm: () => void;
}

export interface ServiceFormValues {
  provider: string;
  phone: string;
  amount: string;
  dataType: string;
  smartCardNumber: string;
  package: string;
  meterNumber: string;
  meterType: string;
  examType: string;
  quantity: string;
  platform: string;
  userId: string;
  planType: string;
  accountNumber: string;
  serviceType: string;
  referenceId: string;
} 