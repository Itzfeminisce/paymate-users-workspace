
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function SignUp() {
  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Join VTULink for quick and easy recharge services"
    >
      <AuthForm type="signup" redirectTo="/dashboard" />
    </AuthLayout>
  );
}
