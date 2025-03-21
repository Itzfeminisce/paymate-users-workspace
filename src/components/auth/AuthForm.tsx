
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { fadeUp } from '@/lib/animations';

// Form schema for login
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Form schema for signup with password confirmation
const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Infer the types from the schemas
type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  type: 'login' | 'signup';
  redirectTo?: string;
}

export function AuthForm({ type, redirectTo = '/' }: AuthFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, signup, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Initialize the form with the appropriate schema based on type
  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(type === 'login' ? loginSchema : signupSchema),
    defaultValues: type === 'login' 
      ? { email: '', password: '' } 
      : { email: '', password: '', confirmPassword: '' }
  });
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  async function onSubmit(data: LoginFormValues | SignupFormValues) {
    setIsLoading(true);
    
    try {
      if (type === 'login') {
        // Use the login function from AuthContext
        await login(data.email, data.password);
        toast({
          title: 'Successfully logged in!',
          description: 'Welcome back to PayMate.',
        });
      } else {
        // Use the signup function from AuthContext
        await signup(data.email, data.password);
        toast({
          title: 'Account created successfully!',
          description: 'Welcome to PayMate! You are now logged in.',
        });
      }
      
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
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <GlassCard className="p-6 md:p-8">
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
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={togglePasswordVisibility}
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {type === 'login' && (
              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}
            
            {type === 'signup' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={togglePasswordVisibility}
                          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {type === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
            
            {type === 'login' ? (
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link 
                  to="/sign-up" 
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/sign-in" 
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            )}
          </form>
        </Form>
      </GlassCard>
    </motion.div>
  );
}
