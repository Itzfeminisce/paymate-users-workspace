
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { ValidityFormValues, Category } from '../settings/types';

interface ValidityFormFieldsProps {
  form: UseFormReturn<ValidityFormValues>;
  categories: Category[];
}

export function ValidityFormFields({ form, categories }: ValidityFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Validity Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter validity name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input type="number" min="1" placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="applicableToCategories"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Applicable Categories</FormLabel>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={form.watch('applicableToCategories').includes(category.id)}
                    onCheckedChange={(checked) => {
                      const currentValues = form.getValues().applicableToCategories;
                      if (checked) {
                        form.setValue('applicableToCategories', [...currentValues, category.id]);
                      } else {
                        form.setValue(
                          'applicableToCategories', 
                          currentValues.filter((id) => id !== category.id)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
