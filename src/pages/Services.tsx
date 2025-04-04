import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wifi,
  Phone,
  Tv,
  Zap,
  School,
  CreditCard,
  Globe,
  DollarSign,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Container from '@/components/layout/Container';
import Sidebar from '@/components/layout/Sidebar';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';

// --- Shared Constants ---
// Phone validation: exactly 11 digits starting with 0.
const phoneValidation = z
  .string()
  .regex(/^0\d{10}$/, { message: 'Phone number must be 11 digits starting with 0' });

// Shared styling for toggle buttons (modern, clean look)
const toggleClass =
  "flex items-center justify-center h-10 rounded-md border border-gray-300 bg-white px-4 py-6 text-sm font-medium transition-colors hover:bg-gray-50 hover:border-gray-500 cursor-pointer peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white";

// --- Option Arrays ---
const serviceTypesArr = [
  { id: 'data', name: 'Data', icon: <Wifi className="h-5 w-5" /> },
  { id: 'airtime', name: 'Airtime', icon: <Phone className="h-5 w-5" /> },
  { id: 'cable', name: 'Cable TV', icon: <Tv className="h-5 w-5" /> },
  { id: 'electricity', name: 'Electricity', icon: <Zap className="h-5 w-5" /> },
  { id: 'education', name: 'Education', icon: <School className="h-5 w-5" /> },
  { id: 'betting', name: 'Betting', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'internet', name: 'Internet', icon: <Globe className="h-5 w-5" /> },
  { id: 'others', name: 'Others', icon: <DollarSign className="h-5 w-5" /> },
];

const networkProviders = [
  { id: 'mtn', name: 'MTN' },
  { id: 'airtel', name: 'Airtel' },
  { id: '9mobile', name: '9Mobile' },
  { id: 'glo', name: 'Glo' },
];

const cableProviders = [
  { id: 'dstv', name: 'DSTV' },
  { id: 'gotv', name: 'GoTV' },
  { id: 'startimes', name: 'StarTimes' },
  { id: 'showmax', name: 'Showmax' },
];

const electricityProviders = [
  { id: 'ekedc', name: 'Eko Electric (EKEDC)' },
  { id: 'ikedc', name: 'Ikeja Electric (IKEDC)' },
  { id: 'aedc', name: 'Abuja Electric (AEDC)' },
  { id: 'ibedc', name: 'Ibadan Electric (IBEDC)' },
  { id: 'phedc', name: 'Port Harcourt Electric (PHEDC)' },
];

const predefinedAmounts = [
  { value: '100', label: '₦100' },
  { value: '200', label: '₦200' },
  { value: '500', label: '₦500' },
  { value: '1000', label: '₦1,000' },
  { value: 'custom', label: 'Custom Amount' },
];

const dataBundles = [
  { id: '1gb', label: '1GB - ₦300 (30 Days)' },
  { id: '2gb', label: '2GB - ₦500 (30 Days)' },
  { id: '5gb', label: '5GB - ₦1,000 (30 Days)' },
  { id: '10gb', label: '10GB - ₦2,000 (30 Days)' },
];

const cablePackages = [
  { id: 'compact', label: 'DSTV Compact - ₦9,000' },
  { id: 'premium', label: 'DSTV Premium - ₦21,000' },
  { id: 'confam', label: 'GoTV Confam - ₦5,500' },
  { id: 'max', label: 'GoTV Max - ₦4,150' },
];

const meterTypes = [
  { id: 'prepaid', label: 'Prepaid' },
  { id: 'postpaid', label: 'Postpaid' },
];

const examBoards = [
  { id: 'waec', label: 'WAEC' },
  { id: 'jamb', label: 'JAMB' },
  { id: 'neco', label: 'NECO' },
];

const examTypes = [
  { id: 'result', label: 'Result Checker' },
  { id: 'registration', label: 'Registration PIN' },
];

const quantities = [
  { id: '1', label: '1 PIN' },
  { id: '5', label: '5 PINs' },
  { id: '10', label: '10 PINs' },
];

const othersServiceOptions = [
  { id: 'donation', label: 'Donation' },
  { id: 'repair', label: 'Repair' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'misc', label: 'Miscellaneous' },
];

const internetProviders = [
  { id: 'spectranet', label: 'Spectranet' },
  { id: 'smile', label: 'Smile' },
  { id: 'multilinks', label: 'Multilinks' },
  { id: 'ipnx', label: 'IPNX' },
];

const internetPlans = [
  { id: 'basic', label: 'Basic Plan - ₦2,000' },
  { id: 'standard', label: 'Standard Plan - ₦3,500' },
  { id: 'premium', label: 'Premium Plan - ₦5,000' },
];

const bettingPlatforms = [
  { id: 'bet9ja', label: 'Bet9ja' },
  { id: 'sportybet', label: 'SportyBet' },
  { id: 'merrybet', label: 'Merrybet' },
];

// --- Zod Schema ---
// The schema changes based on the active service type.
const getServiceSchema = (serviceType) => {
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

// --- Reusable Components ---

// Left Sidebar: Service Selection
function ServiceSidebar({ activeService, setActiveService }) {
  return (
    <GlassCard className="p-6 min-h-[200px] w-full md:w-[250px]">
      <h3 className="text-lg font-medium mb-4">Select Category</h3>
      <div className="gap-4 grid grid-cols-2 md:flex flex-col ">
        {serviceTypesArr.map((service) => (
          <div
            key={service.id}
            onClick={() => setActiveService(service.id)}
            className={`flex items-center md:gap-3 gap-1  md:px-4 px-0  md:py-2 py-2  rounded-lg transition-colors cursor-pointer shadow-sm ${activeService === service.id
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {service.icon}
            </div>
            <span className="font-semibold">{service.name}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// Middle Column: Service Form
function ServiceForm({ activeService, form, amountType, handleAmountTypeChange }) {
  return (
    <GlassCard className="p-6 min-h-full space-y-6">

      {/* Data Bundle */}
      {activeService === 'data' && (
        <>
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network Provider</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  {networkProviders.map((provider) => (
                    <div key={provider.id}>
                      <RadioGroupItem
                        value={provider.id}
                        id={`data-provider-${provider.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`data-provider-${provider.id}`}
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
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {dataBundles.map((bundle) => (
                    <div key={bundle.id}>
                      <RadioGroupItem
                        value={bundle.id}
                        id={`data-bundle-${bundle.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`data-bundle-${bundle.id}`}
                        className={toggleClass}
                      >
                        {bundle.label}
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

      {/* Airtime */}
      {activeService === 'airtime' && (
        <>
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network Provider</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  {networkProviders.map((provider) => (
                    <div key={provider.id}>
                      <RadioGroupItem
                        value={provider.id}
                        id={`airtime-provider-${provider.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`airtime-provider-${provider.id}`}
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
          <div className="space-y-3">
            <FormLabel>Amount</FormLabel>
            <RadioGroup
              defaultValue={amountType}
              onValueChange={handleAmountTypeChange}
              className="grid grid-cols-2 sm:grid-cols-5 gap-2"
            >
              {predefinedAmounts.map((amount) => (
                <div key={amount.value}>
                  <RadioGroupItem
                    value={amount.value}
                    id={`airtime-amount-${amount.value}`}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`airtime-amount-${amount.value}`}
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
        </>
      )}

      {/* Cable TV */}
      {activeService === 'cable' && (
        <>
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cable TV Provider</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {cableProviders.map((provider) => (
                    <div key={provider.id}>
                      <RadioGroupItem
                        value={provider.id}
                        id={`cable-provider-${provider.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`cable-provider-${provider.id}`}
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
          <FormField
            control={form.control}
            name="smartCardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Smart Card / IUC Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your smart card number" {...field} />
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
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {cablePackages.map((pkg) => (
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
                        {pkg.label}
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

      {/* Electricity Service */}
      {activeService === 'electricity' && (
        <>
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Electricity Provider</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {electricityProviders.map((provider) => (
                    <div key={provider.id}>
                      <RadioGroupItem
                        value={provider.id}
                        id={`elec-provider-${provider.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`elec-provider-${provider.id}`}
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
          <div className="space-y-3">
            <FormLabel>Amount</FormLabel>
            <RadioGroup
              defaultValue={amountType}
              onValueChange={handleAmountTypeChange}
              className="grid grid-cols-2 sm:grid-cols-5 gap-2"
            >
              {predefinedAmounts.map((amount) => (
                <div key={amount.value}>
                  <RadioGroupItem
                    value={amount.value}
                    id={`elec-amount-${amount.value}`}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`elec-amount-${amount.value}`}
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
        </>
      )}

      {/* Education Service */}
      {activeService === 'education' && (
        <>
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Board</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {examBoards.map((board) => (
                    <div key={board.id}>
                      <RadioGroupItem
                        value={board.id}
                        id={`exam-board-${board.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`exam-board-${board.id}`}
                        className={toggleClass}
                      >
                        {board.label}
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

      {/* Betting Service */}
      {activeService === 'betting' && (
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
          <div className="space-y-3">
            <FormLabel>Amount</FormLabel>
            <RadioGroup
              defaultValue={amountType}
              onValueChange={handleAmountTypeChange}
              className="grid grid-cols-2 sm:grid-cols-5 gap-2"
            >
              {predefinedAmounts.map((amount) => (
                <div key={amount.value}>
                  <RadioGroupItem
                    value={amount.value}
                    id={`betting-amount-${amount.value}`}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`betting-amount-${amount.value}`}
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
        </>
      )}

      {/* Internet Service */}
      {activeService === 'internet' && (
        <>
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Internet Provider</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {internetProviders.map((provider) => (
                    <div key={provider.id}>
                      <RadioGroupItem
                        value={provider.id}
                        id={`internet-provider-${provider.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`internet-provider-${provider.id}`}
                        className={toggleClass}
                      >
                        {provider.label}
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

      {/* Others Service */}
      {activeService === 'others' && (
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
          <div className="space-y-3">
            <FormLabel>Amount</FormLabel>
            <RadioGroup
              defaultValue={amountType}
              onValueChange={handleAmountTypeChange}
              className="grid grid-cols-2 sm:grid-cols-5 gap-2"
            >
              {predefinedAmounts.map((amount) => (
                <div key={amount.value}>
                  <RadioGroupItem
                    value={amount.value}
                    id={`others-amount-${amount.value}`}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`others-amount-${amount.value}`}
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
        </>
      )}
    </GlassCard>
  );
}

// Right Column: Summary Panel with Submit Button
function SummaryPanel({ values, handleClearForm }) {
  
  return (
    <GlassCard className="p-6 flex flex-col h-full">
      <h3 className="text-lg font-medium mb-4">Summary</h3>
      <div className="flex-1 overflow-auto">
        {values.length > 0 ? (
          <ul className="space-y-2">
            {values.map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="font-semibold capitalize">{key}</span>
                {/* @ts-ignore */}
                <span className='capitalize'>{value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No data entered yet.</p>
        )}
      </div>
      <div className="mt-4">
        <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white">
          Submit
        </Button>
        

      {/* Clear Button */}
      <Button
        variant='danger'
        type="button"
        onClick={handleClearForm}
        className="mt-2 w-full"
      >
        Clear Form
      </Button>
      </div>
    </GlassCard>
  );
}
// --- Main Component ---
export default function Services() {
  const [activeService, setActiveService] = useState('data');
  const [amountType, setAmountType] = useState('');
  // const { user } = useAuth();

  // Store form state for each service
  const [serviceFormStates, setServiceFormStates] = useState<Record<string, any>>({});

  const form = useForm({
    resolver: zodResolver(getServiceSchema(activeService)),
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

  // Save form state when switching services
  useEffect(() => {
    const currentValues = form.getValues();
    setServiceFormStates((prev) => ({
      ...prev,
      [activeService]: currentValues,
    }));
  }, [activeService, form]);

  // Restore form state when returning to a previously visited service
  useEffect(() => {
    const savedValues = serviceFormStates[activeService];
    if (savedValues) {
      form.reset(savedValues);
    } else {
      form.reset();
    }
  }, [activeService, form, serviceFormStates]);

  // Select Service from URL if provided
  useEffect(() => {
    const serviceFromUrl = new URLSearchParams(window.location.search).get('ref');
    if (serviceFromUrl && serviceTypesArr.find(it => it.name == serviceFromUrl)) {
      setActiveService(serviceTypesArr.find(it => it.name == serviceFromUrl).id);
    }
  }, [setActiveService, window.location.search]);

  function onSubmit(values) {
    console.log(values);
    // Further processing can be done here.
  }

  const handleAmountTypeChange = (value) => {
    setAmountType(value);
    if (value !== 'custom') {
      form.setValue('amount', value);
    } else {
      form.setValue('amount', '');
    }
  };

  // Clear form for the current service
  const handleClearForm = () => {
    form.reset();
    setServiceFormStates((prev) => ({
      ...prev,
      [activeService]: null, // Clear saved state for this service
    }));
  };

  // Watch form values for live summary updates.
  const formValues = form.watch();

  // Filter summary to only show relevant fields
  const getRelevantSummary = (values) => {
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

    const fieldsToShow = relevantFields[activeService] || [];
    return Object.entries(values).filter(([key]) => fieldsToShow.includes(key));
  };

  const relevantSummary = getRelevantSummary(formValues);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <Container description='' title='' className="pt-20 md:pt-0 md:my-5" enableBackButton backButtonLocation={"/dashboard"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left Sidebar (Fixed width) */}
              <div className="col-span-1">
                <ServiceSidebar activeService={activeService} setActiveService={setActiveService} />
              </div>
              {/* Middle Column: Service Form (spanning 2 columns for extra room) */}
              <div className="col-span-1 md:col-span-2">
                <ServiceForm
                  activeService={activeService}
                  form={form}
                  amountType={amountType}
                  handleAmountTypeChange={handleAmountTypeChange}
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
    </div>
  );
}


