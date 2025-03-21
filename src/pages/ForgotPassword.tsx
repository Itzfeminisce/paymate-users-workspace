
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: EmailFormValues) {
    setIsLoading(true);
    try {
      await requestPasswordReset(data.email);
      toast({
        title: 'Recovery email sent',
        description: 'Please check your email for the OTP code',
      });
      navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.error('Password reset request error:', error);
      toast({
        title: 'Failed to send recovery email',
        description: 'Please try again later or contact support',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a password reset code"
    >
      <div className="w-full max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-muted-foreground">
                        <Mail size={16} />
                      </div>
                      <Input 
                        placeholder="your.email@example.com" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Recovery Email'
              )}
            </Button>
            
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-sm" 
                onClick={() => navigate('/sign-in')}
              >
                Back to Sign In
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
