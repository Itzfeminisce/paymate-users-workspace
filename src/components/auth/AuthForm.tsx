
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { fadeUp } from '@/lib/animations';
import { SocialAuthButtons } from './SocialAuthButtons';

interface AuthFormProps {
  type: 'login' | 'signup';
  redirectTo?: string;
}

export function AuthForm({ type, redirectTo = '/' }: AuthFormProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <GlassCard className="p-6 md:p-8 space-y-4">
        {/* Google Auth Button */}
        <SocialAuthButtons redirectTo={redirectTo}/>


        {type === 'login' ? (
          <LoginForm redirectTo={redirectTo} />
        ) : (
          <SignupForm redirectTo={redirectTo} />
        )}
      </GlassCard>
    </motion.div>
  );
}
