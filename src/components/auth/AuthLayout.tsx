
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp } from '@/lib/animations';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-primary">
              Pay<span className="text-blue-500">Mate</span>
            </div>
          </Link>
        </motion.div>
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}
