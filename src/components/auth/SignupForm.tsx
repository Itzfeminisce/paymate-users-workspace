
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import PasswordToggle from './PasswordToggle';
import FormSubmitButton from './FormSubmitButton';
import { handleAxiosError } from '@/utils/axios-error';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Tooltip } from '../ui/tooltip';
import { InfoIcon } from 'lucide-react';

// Form schema for signup with password confirmation
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  referralCode: z.string().optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Infer the types from the schema
type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  redirectTo: string;
}

export default function SignupForm({ redirectTo }: SignupFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams()

  // Initialize the form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      referralCode: searchParams.get('ref') || '',
      password: '',
      confirmPassword: ''
    }
  });

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);

    try {
      // Use the signup function from AuthContext
      await signup({ name: data.name, email: data.email, password: data.password, referral_code: data.referralCode });
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to PayMate! You are now logged in.',
      });

      // Navigate to redirectTo after successful authentication
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const errorResponse = handleAxiosError(error);
      toast({
        title: errorResponse.title || 'Account creation failed',
        description: errorResponse.message || 'Please check your information and try again.',
        variant: errorResponse.variant || 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordToggle
                    field={field}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordToggle
                    field={field}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Referral Code (Optional)</FormLabel>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-primary/80 cursor-help hover:text-primary transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="z-50 bg-primary/95 p-4 max-w-xs rounded-lg border border-primary/20 shadow-lg"
                    >
                      <div className="space-y-2">
                        <h4 className="font-bold text-white">💰 Double Rewards!</h4>
                        <p className="text-white text-sm">Enter a friend's referral code and you'll both win:</p>
                        <ul className="text-white text-sm list-disc pl-4 space-y-1">
                          <li>You get an instant ₦500 bonus in your account</li>
                          <li>Your friend earns 5% commission on your first transaction</li>
                        </ul>
                        <p className="text-white text-xs italic mt-2">Share your own code after signing up to start earning too!</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter referral code if you have one"
                  className="focus-within:border-primary/50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSubmitButton isLoading={isLoading} label="Create Account" />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}
