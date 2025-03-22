
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

// Form schema for login
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Infer the types from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  redirectTo: string;
}

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Initialize the form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    
    try {
      // Use the login function from AuthContext
      await login(data.email, data.password);
      toast({
        title: 'Successfully logged in!',
        description: 'Welcome back to PayMate.',
      });
      
      // Navigate to redirectTo after successful authentication
      navigate(redirectTo);
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: 'Authentication failed',
        description: 'Please check your credentials and try again.',
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
        
        <div className="flex justify-end">
          <Link 
            to="/forgot-password" 
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        
        <FormSubmitButton isLoading={isLoading} label="Sign In" />
        
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            to="/sign-up" 
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
