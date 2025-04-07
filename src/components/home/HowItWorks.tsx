import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { UserPlus, Wallet, ZapIcon, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-blue-500" />,
    title: 'Create an Account',
    description: 'Sign up for free in less than 2 minutes with your basic information.',
    number: '01',
    color: 'from-blue-500/20 to-blue-600/20',
    highlight: 'text-blue-500'
  },
  {
    icon: <Wallet className="h-8 w-8 text-green-500" />,
    title: 'Fund Your Wallet',
    description: 'Add money to your wallet using your debit card or bank transfer.',
    number: '02',
    color: 'from-green-500/20 to-green-600/20',
    highlight: 'text-green-500'
  },
  {
    icon: <ZapIcon className="h-8 w-8 text-purple-500" />,
    title: 'Choose a Service',
    description: 'Select from our range of services including airtime, data, TV, and electricity.',
    number: '03',
    color: 'from-purple-500/20 to-purple-600/20',
    highlight: 'text-purple-500'
  },
  {
    icon: <CreditCard className="h-8 w-8 text-orange-500" />,
    title: 'Complete Transaction',
    description: 'Confirm your order details and the transaction is processed instantly.',
    number: '04',
    color: 'from-orange-500/20 to-orange-600/20',
    highlight: 'text-orange-500'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  },
};

const StepCard = ({ icon, title, description, number, color, highlight, index }) => {
  return (
    <motion.div
      variants={item}
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
      
      <GlassCard className="p-8 h-full z-10 relative backdrop-blur-sm border border-white/10">
        {/* Large step number watermark */}
        <div className="absolute -top-6 -right-6 text-8xl font-bold opacity-10 select-none">
          {number}
        </div>

        <div className="flex flex-col gap-6">
          {/* Icon with animated background */}
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {icon}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${highlight}`}>STEP {number}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-tl-[100px] blur-md`} />
        </div>
      </GlassCard>
      
      {/* Connector */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-8 left-[calc(100%-2rem)] h-0.5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
          <motion.div 
            className="absolute left-0 h-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Started in <span className="text-primary">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the future of digital payments. Quick setup, instant transactions, and seamless service delivery.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              index={index}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary/20 via-primary to-primary/20">
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-background hover:bg-primary text-primary hover:text-white font-medium transition-all duration-300 group"
            >
              Start Your Journey
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
