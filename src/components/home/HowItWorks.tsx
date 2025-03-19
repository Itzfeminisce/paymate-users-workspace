
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
  },
  {
    icon: <Wallet className="h-8 w-8 text-green-500" />,
    title: 'Fund Your Wallet',
    description: 'Add money to your wallet using your debit card or bank transfer.',
    number: '02',
  },
  {
    icon: <ZapIcon className="h-8 w-8 text-purple-500" />,
    title: 'Choose a Service',
    description: 'Select from our range of services including airtime, data, TV, and electricity.',
    number: '03',
  },
  {
    icon: <CreditCard className="h-8 w-8 text-orange-500" />,
    title: 'Complete Transaction',
    description: 'Confirm your order details and the transaction is processed instantly.',
    number: '04',
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

const StepCard = ({ icon, title, description, number, index }) => {
  return (
    <motion.div
      variants={item}
      className="relative"
    >
      <GlassCard className="p-6 md:p-8 h-full z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <span className="block text-sm font-medium text-blue-500 mb-1">Step {number}</span>
            <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </GlassCard>
      
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-8 left-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0"></div>
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-transparent to-blue-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How It <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with PayMate is simple. Follow these quick steps to enjoy our seamless services.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16"
        >
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              number={step.number}
              index={index}
            />
          ))}
        </motion.div>

        {/* Extra Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-foreground mb-6">
            Ready to experience the fastest VTU service?
          </p>
          <a
            href="#"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
