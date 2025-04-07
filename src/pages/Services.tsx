import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Container from '@/components/layout/Container';
import { ServiceSidebar, ServiceForm, SummaryPanel, getServiceSchema, ServiceFormValues } from '@/components/services';
import { ProductCategory, ProductProvider, ProductService } from '@/hooks/api-hooks';
import { useSearchParams } from 'react-router-dom';
import { formatCurrency } from '@/utils/utils';
import { usePlatformConfig } from '@/context/PlatformConfigContext';



export default function Services() {
  const [amountType, setAmountType] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getConfig } = usePlatformConfig()
  // local formstate handle
  const [activeProvider, setActiveProvider] = useState<ProductProvider | null>(null)
  const [activeService, setActiveService] = useState<ProductService | null>(null)

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(getServiceSchema(activeCategory?.name?.toLowerCase())),
    defaultValues: {
      provider: '',
      phone: '',
      amount: '',
      dataType: '',
      smartCardNumber: '',
      package: '',
      meterNumber: '',
      meterType: '',
      examType: '',
      quantity: '',
      platform: '',
      userId: '',
      planType: '',
      accountNumber: '',
      serviceType: '',
      referenceId: '',
    },
  });

  // Select Service from URL if provided  
  useEffect(() => {
    const categoryFromUrl = searchParams.get('ref');

    if (categoryFromUrl && categories.length > 0) {
      const category = categories.find(it => it.name?.toLowerCase() === categoryFromUrl?.toLowerCase());
      if (category) {
        setActiveCategory(category);
        // Reset the URL after setting the category
        setSearchParams({});
      }
    }
  }, [categories, searchParams, setSearchParams]);

  // clear form when category changes
  useEffect(() => {
    if (activeCategory) {
      handleClearForm()
    }
  }, [activeCategory, form]);

  const handleAmountTypeChange = (value: string) => {
    setAmountType(value);
    if (value !== 'custom') {
      form.setValue('amount', value);
    } else {
      form.setValue('amount', '');
    }
  };

  const handleProviderChange = useCallback((provider: ProductProvider) => {
    setActiveProvider(provider)
  }, [])

  const handleServiceChange = useCallback((service: ProductService) => {
    setActiveService(service)
  }, [])

  const handleClearForm = () => {
    form.reset();
    setActiveProvider(null);
    setActiveService(null);
    setAmountType('');
  };

  const onSubmit = (values: ServiceFormValues) => {
    console.log(values);
    // Further processing can be done here.
  };

  // Watch form values for live summary updates
  const formValues = form.watch();

  // Filter summary to only show relevant fields
  const getRelevantSummary = (values: ServiceFormValues): [string, any][] => {
    const relevantFields = {
      data: ['provider', 'phone', 'dataType'],
      airtime: ['provider', 'phone', 'amount'],
      cable: ['provider', 'smartCardNumber', 'package'],
      electricity: ['provider', 'meterNumber', 'meterType', 'amount'],
      education: ['provider', 'examType', 'quantity'],
      betting: ['platform', 'userId', 'amount'],
      internet: ['provider', 'planType', 'accountNumber'],
      others: ['serviceType', 'referenceId', 'amount'],
    };

    const fieldsToShow = relevantFields[activeCategory?.name?.toLowerCase()] || [];

    const formatServiceName = useCallback((service: ProductService) => {
      if (!service) return '';
      return `${service.name} ${formatCurrency(service.price, getConfig('currency'))} (${service.validity.duration} ${service.validity.duration_type})`
    }, [activeCategory])



    return Object.entries(values)
      .filter(([key]) => fieldsToShow.includes(key))
      .map(([key, value]) => {
        if (key === "provider") {
          return [key, activeProvider?.name || ''];
        }
        if (["dataType", "package"].includes(key)) {
          return [key, formatServiceName(activeService) || ''];
        }
        return [key, value];
      });
  };

  const relevantSummary = getRelevantSummary(formValues);


  return (
    <Container description='' title='' className="pt-20 md:pt-0 md:my-5" enableBackButton backButtonLocation={"/dashboard"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Sidebar (Fixed width) */}
            <div className="col-span-1">
              <ServiceSidebar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setCategories={setCategories}
              />
            </div>
            {/* Middle Column: Service Form (spanning 2 columns for extra room) */}
            <div className="col-span-1 md:col-span-2">
              <ServiceForm
                activeCategory={activeCategory}
                form={form}
                amountType={amountType}
                onAmountTypeChange={handleAmountTypeChange}
                onProviderChange={handleProviderChange}
                onServiceChange={handleServiceChange}
                activeProvider={activeProvider}
              />
            </div>
            {/* Right Column: Summary Panel and Submit Button */}
            <div className="col-span-1">
              <SummaryPanel values={relevantSummary} handleClearForm={handleClearForm} />
            </div>
          </div>
        </form>
      </Form>
    </Container>
  );
} 