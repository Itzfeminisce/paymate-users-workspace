
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import PasswordToggle from './PasswordToggle';
import FormSubmitButton from './FormSubmitButton';

// Form schema for signup with password confirmation
const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
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
  
  // Initialize the form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  });
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    
    try {
      // Use the signup function from AuthContext
      await signup(data.email, data.password);
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to PayMate! You are now logged in.',
      });
      
      // Navigate to redirectTo after successful authentication
      navigate(redirectTo);
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: 'Account creation failed',
        description: 'Please check your information and try again.',
        variant: 'destructive',
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
