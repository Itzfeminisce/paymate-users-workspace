import React, { memo, useCallback, useState } from 'react';
import { ArrowLeft, CheckCircle, CircleDashed, PackageX } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProductProvider, ProductService, useGetProductProvidersQuery, useGetProductServicesQuery } from '@/hooks/api-hooks';
import { ServiceFormProps } from './types';
import { toggleClass } from './constants';
import {
    networkProviders,
    cableProviders,
    electricityProviders,
    predefinedAmounts,
    dataBundles,
    cablePackages,
    meterTypes,
    examBoards,
    examTypes,
    quantities,
    othersServiceOptions,
    internetProviders,
    internetPlans,
    bettingPlatforms,
} from './constants';
import clsx from 'clsx';
import { usePlatformConfig } from '@/context/PlatformConfigContext';
import { formatCurrency } from '@/utils/utils';
import { Button } from '../ui/button';
import IUCVerificationDialog from './IUCVerificationDialog';

const ServiceFormSkeleton = memo(() => (
    <GlassCard className="p-6 min-h-[400px]">
        <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded mb-6"></div>
        <div className="space-y-6">
            {Array(4).fill(0).map((_, index) => (
                <div key={index} className="space-y-2">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                    {index === 3 && (
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mt-1"></div>
                    )}
                </div>
            ))}
            <div className="mt-8">
                <div className="h-5 w-1/3 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                    {Array(3).fill(0).map((_, index) => (
                        <div key={`option-${index}`} className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    </GlassCard>
));

const CategoryIsNull = memo(() => (
    <GlassCard className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="mb-4">
            <CircleDashed className="w-16 h-16 text-gray-400 mx-auto" />
        </div>
        <h3 className="text-xl font-medium mb-2">No Category Selected</h3>
        <p className="text-gray-500 max-w-md">
            Please select a service category from the sidebar to get started with your transaction.
        </p>
        <div className="mt-6">
            <div className="flex items-center gap-2 text-gray-500 border border-gray-300 rounded-md px-4 py-2 bg-gray-50">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Select a category</span>
            </div>
        </div>
    </GlassCard>
));

const ServicesIsNull = memo(({type}: {type: string}) => (
    <GlassCard className="p-6 flex flex-col items-center justify-center text-center shadow-none w-full col-span-2 mx-auto">
        <div className="mb-4">
            <PackageX className="w-16 h-16 text-gray-400 mx-auto" />
        </div>
        <h3 className="text-xl font-medium mb-2">No {type} available</h3>
        <p className="text-gray-500 max-w-md mx-auto">
            There are no {type} available for the selected provider. Please select a different provider to view available {type}.
        </p>
    </GlassCard>
));




const ServiceForm = memo(({
    form, amountType,
    onAmountTypeChange,
    onProviderChange,
    onServiceChange,
    activeCategory,
    activeProvider,
}: ServiceFormProps) => {
    const { getConfig } = usePlatformConfig()
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationData, setVerificationData] = useState<any>(null);
    const [verificationError, setVerificationError] = useState<string | null>(null);

    const { data: productProviders, isLoading: productProvidersLoading, error: productProvidersError } = useGetProductProvidersQuery(
        activeCategory?.id ? { categoryId: activeCategory.id } : undefined,
    );



    const { data: productServices, isLoading: productServicesLoading, error: productServicesError } = useGetProductServicesQuery({
        categoryId: activeCategory?.id,
        providerIds: activeProvider?.id || (productProviders && productProviders[0]?.id),
    });

    const activeCategoryName = activeCategory?.name?.toLowerCase();


    const getUniqueProvidersByName = useCallback((data: ProductProvider[]) => {
        const uniqueProviders: ProductProvider[] = [];
        const seenNames = new Set();

        data.forEach(item => {
            const provider = item;
            if (!seenNames.has(provider.name)) {
                seenNames.add(provider.name);
                uniqueProviders.push(item);
            }
        });

        return uniqueProviders;
    }, []);

    const renderProviderOptions = useCallback((providers: ProductProvider[], type: string, setActiveProvider: (provider: ProductProvider) => void) => (
        <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{type} Provider</FormLabel>
                    <RadioGroup
                        value={field.value}
                        onValueChange={(evt) => {
                            field.onChange(evt)
                            setActiveProvider(providers.find(it => it.id === evt))
                        }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                    >
                        {getUniqueProvidersByName(providers).map((provider) => (
                            <div key={provider.id}>
                                <RadioGroupItem
                                    value={provider.id}
                                    id={`${type}-provider-${provider.id}`}
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor={`${type}-provider-${provider.id}`}
                                    className={toggleClass}
                                >
                                    {provider.name}
                                </label>
                            </div>
                        ))}
                    </RadioGroup>
                    <FormMessage />
                </FormItem>
            )}
        />
    ), [form.control]);

    const renderAmountSelector = useCallback((type: string) => (
        <div className="space-y-3">
            <FormLabel>Amount</FormLabel>
            <RadioGroup
                defaultValue={amountType}
                onValueChange={onAmountTypeChange}
                className="grid grid-cols-2 sm:grid-cols-5 gap-2"
            >
                {predefinedAmounts.map((amount) => (
                    <div key={amount.value}>
                        <RadioGroupItem
                            value={amount.value}
                            id={`${type}-amount-${amount.value}`}
                            className="peer sr-only"
                        />
                        <label
                            htmlFor={`${type}-amount-${amount.value}`}
                            className={toggleClass}
                        >
                            {amount.label}
                        </label>
                    </div>
                ))}
            </RadioGroup>
            {amountType === 'custom' && (
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    ), [amountType, form.control, onAmountTypeChange]);

    const handleIUCVerification = useCallback(async (iucNumber: string) => {
        setIsVerifying(true);
        setVerificationError(null);
        setVerificationData(null);

        try {
            // TODO: Replace with actual API call
            // Simulating API call with timeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulated response
            setVerificationData({
                customerName: "John Doe",
                address: "123 Main Street, Lagos",
                district: "Victoria Island",
                status: "active",
                lastPayment: {
                    amount: 5000,
                    date: "2024-03-15"
                }
            });
        } catch (error) {
            setVerificationError("Failed to verify IUC number. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    }, []);

    if (!activeCategory) return <CategoryIsNull />;
    if (productProvidersLoading || productServicesLoading) return <ServiceFormSkeleton />;
    if (productProvidersError || productServicesError) return <div>Error loading product providers or services</div>;



    return (
        <GlassCard className="p-6 min-h-full space-y-6">
            {activeCategoryName === 'data' && (
                <>
                    {renderProviderOptions(productProviders, 'Network', onProviderChange)}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 08012345678" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dataType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Bundle</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={(evt) => {
                                        field.onChange(evt)
                                        onServiceChange(productServices.find(it => it.id === evt))
                                    }}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {
                                        productServices.length === 0 ? <ServicesIsNull type={activeCategoryName}/> :
                                            productServices.map((bundle) => (
                                                <div key={bundle.id}>
                                                    <RadioGroupItem
                                                        value={bundle.id}
                                                        id={`data-bundle-${bundle.id}`}
                                                        className="peer sr-only"
                                                    />
                                                    <label
                                                        htmlFor={`data-bundle-${bundle.id}`}
                                                        className={clsx(toggleClass, 'capitalize')}
                                                    >
                                                        {`${bundle.name} ${formatCurrency(bundle.price, getConfig('currency'))} (${bundle.validity.duration} ${bundle.validity.duration_type})`}
                                                    </label>
                                                </div>
                                            ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}

            {activeCategoryName === 'airtime' && (
                <>
                    {renderProviderOptions(productProviders, 'Network', onProviderChange)}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 08012345678" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {renderAmountSelector('airtime')}
                </>
            )}

            {activeCategoryName === 'cable' && (
                <>
                    {renderProviderOptions(productProviders, 'Cable TV', onProviderChange)}
                    <FormField
                        control={form.control}
                        name="smartCardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Smart Card / IUC Number</FormLabel>
                                <FormControl>
                                    <div className="relative group">
                                        <Input placeholder="Enter your smart card number" {...field} />
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="icon"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 transition-all"
                                            onClick={() => {
                                                if (field.value) {
                                                    handleIUCVerification(field.value);
                                                }
                                            }}
                                            aria-label="Verify smart card number"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                            <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 -left-1/2 transform -translate-x-1/2 w-max after:content-[''] after:absolute -after:left-1/3 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800 z-10">
                                                Click to verify smart card number
                                            </span>
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="package"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Package</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={evt => {
                                        field.onChange(evt)
                                        onServiceChange(productServices.find(it => it.id === evt))
                                    }}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {productServices.map((pkg) => (
                                        <div key={pkg.id}>
                                            <RadioGroupItem
                                                value={pkg.id}
                                                id={`cable-package-${pkg.id}`}
                                                className="peer sr-only"
                                            />
                                            <label
                                                htmlFor={`cable-package-${pkg.id}`}
                                                className={toggleClass}
                                            >
                                                {`${pkg.name} ${formatCurrency(pkg.price, getConfig('currency'))} (${pkg.validity.duration} ${pkg.validity.duration_type})`}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}

            {activeCategoryName === 'electricity' && (
                <>
                    {renderProviderOptions(productProviders, 'Electricity', onProviderChange)}
                    <FormField
                        control={form.control}
                        name="meterType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meter Type</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {meterTypes.map((meter) => (
                                        <div key={meter.id}>
                                            <RadioGroupItem
                                                value={meter.id}
                                                id={`meter-type-${meter.id}`}
                                                className="peer sr-only"
                                            />
                                            <label
                                                htmlFor={`meter-type-${meter.id}`}
                                                className={toggleClass}
                                            >
                                                {meter.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="meterNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meter Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your meter number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {renderAmountSelector('elec')}
                </>
            )}

            {activeCategoryName === 'education' && (
                <>
                    {renderProviderOptions(examBoards, 'Exam Board', onProviderChange)}
                    <FormField
                        control={form.control}
                        name="examType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exam Type</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {examTypes.map((type) => (
                                        <div key={type.id}>
                                            <RadioGroupItem
                                                value={type.id}
                                                id={`exam-type-${type.id}`}
                                                className="peer sr-only"
                                            />
                                            <label
                                                htmlFor={`exam-type-${type.id}`}
                                                className={toggleClass}
                                            >
                                                {type.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-3 gap-2"
                                >
                                    {quantities.map((qty) => (
                                        <div key={qty.id}>
                                            <RadioGroupItem
                                                value={qty.id}
                                                id={`quantity-${qty.id}`}
                                                className="peer sr-only"
                                            />
                                            <label
                                                htmlFor={`quantity-${qty.id}`}
                                                className={toggleClass}
                                            >
                                                {qty.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}

            {activeCategoryName === 'betting' && (
                <>
                    <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Betting Platform</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {bettingPlatforms.map((platform) => (
                                        <div key={platform.id}>
                                            <RadioGroupItem
                                                value={platform.id}
                                                id={`betting-platform-${platform.id}`}
                                                className="peer sr-only"
                                            />
                                            <label
                                                htmlFor={`betting-platform-${platform.id}`}
                                                className={toggleClass}
                                            >
                                                {platform.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your betting user ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {renderAmountSelector('betting')}
                </>
            )}

            {activeCategoryName === 'internet' && (
                <>
                    {renderProviderOptions(internetProviders, 'Internet', onProviderChange)}
                    <FormField
                        control={form.control}
                        name="planType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plan</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {internetPlans.map((plan) => (
                                        <div key={plan.id}>
                                            <RadioGroupItem
                                                value={plan.id}
                                                id={`internet-plan-${plan.id}`}
                                                className="peer sr-only"
                                            />
                                            <label
                                                htmlFor={`internet-plan-${plan.id}`}
                                                className={toggleClass}
                                            >
                                                {plan.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your account number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}

            {activeCategoryName === 'others' && (
                <>
                    <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service Type</FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {othersServiceOptions.map((opt) => (
                                        <div key={opt.id}>
                                            <RadioGroupItem
                                                value={opt.id}
                                                id={`others-service-${opt.id}`}
                                                className="peer sr-only"
                                            />
                                            <label
                                                htmlFor={`others-service-${opt.id}`}
                                                className={toggleClass}
                                            >
                                                {opt.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="referenceId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reference ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter reference ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {renderAmountSelector('others')}
                </>
            )}

            <IUCVerificationDialog
                isOpen={isVerifying || !!verificationData || !!verificationError}
                onClose={() => {
                    setIsVerifying(false);
                    setVerificationData(null);
                    setVerificationError(null);
                }}
                isLoading={isVerifying}
                data={verificationData}
                error={verificationError || undefined}
            />
        </GlassCard>
    );
});

ServiceForm.displayName = 'ServiceForm';
ServiceFormSkeleton.displayName = 'ServiceFormSkeleton';
CategoryIsNull.displayName = 'CategoryIsNull';

export default ServiceForm; 