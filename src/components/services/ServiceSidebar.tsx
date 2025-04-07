import React, { memo, useEffect, useCallback } from 'react';
import { CircleDashed } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { useGetProductCategoriesQuery } from '@/hooks/api-hooks';
import { ServiceSidebarProps } from './types';

const ServiceSidebarSkeleton = memo(() => (
  <GlassCard className="p-6 min-h-[200px] w-full md:w-[250px]">
    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>
    <div className="space-y-3">
      {Array(8).fill(0).map((_, index) => (
        <div key={index} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-200 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  </GlassCard>
));

const ServiceSidebar = memo(({ activeCategory, setActiveCategory, setCategories }: ServiceSidebarProps) => {
  const { data: productCategories, isLoading, error } = useGetProductCategoriesQuery();

  // Set categories when data is loaded
  useEffect(() => {
    if (productCategories) {
      setCategories(productCategories);
    }
  }, [productCategories, setCategories]);

  const renderServiceIcon = useCallback((_iconName: string) => {
    try {
      const iconName = _iconName.split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('');

      // @ts-ignore
      const LucideIcon = React.lazy(() => {
        try {
          return import('lucide-react').then(module => ({
            default: module[iconName] || module.CircleDot
          }));
        } catch {
          return import('lucide-react').then(module => ({ default: module.CircleDot }));
        }
      });

      return (
        <React.Suspense fallback={<div className="w-5 h-5 animate-pulse bg-gray-300 rounded-full" />}>
          <LucideIcon className="w-5 h-5" />
        </React.Suspense>
      );
    } catch {
      return <div className="w-5 h-5 rounded-full bg-current" />;
    }
  }, []);

  if (isLoading) return <ServiceSidebarSkeleton />;
  if (error) return <div>Error loading product categories</div>;
  if (!productCategories) return null;

  return (
    <GlassCard className="p-6 min-h-[200px] w-full md:w-[250px]">
      <h3 className="text-lg font-medium mb-4">Select Category</h3>
      <div className="gap-4 grid grid-cols-2 md:flex flex-col">
        {productCategories.sort((a, b) => a.code.localeCompare(b.code)).map((category) => (
          <div
            key={category.id}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center md:gap-3 gap-1 md:px-4 px-0 md:py-2 py-2 rounded-lg transition-colors cursor-pointer shadow-sm ${
              activeCategory?.id === category?.id
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {renderServiceIcon(category.icon)}
            </div>
            <span className="font-semibold">{category.name}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
});

ServiceSidebar.displayName = 'ServiceSidebar';
ServiceSidebarSkeleton.displayName = 'ServiceSidebarSkeleton';

export default ServiceSidebar; 