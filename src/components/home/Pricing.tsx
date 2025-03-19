import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, CreditCard, Users, Gift, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
  };

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for beginners to explore VTU services',
      price: billingPeriod === 'monthly' ? '₦0' : '₦0',
      period: 'forever',
      features: [
        { name: 'Access to basic VTU services', included: true },
        { name: 'First-timer signup bonus', included: true },
        { name: 'Buy airtime and data bundles', included: true },
        { name: 'Basic transaction history', included: true },
        { name: 'Referral system access', included: true },
        { name: 'Premium support', included: false },
        { name: 'Monthly usage analytics', included: false },
      ],
      buttonText: 'Get Started',
      popular: false,
      buttonVariant: 'outline' as const,
      icon: <CreditCard className="h-10 w-10 text-primary mb-4" />
    },
    {
      name: 'Premium',
      description: 'Ideal for regular VTU users with more needs',
      price: billingPeriod === 'monthly' ? '₦1,999' : '₦1,499',
      period: billingPeriod === 'monthly' ? '/month' : '/month, billed annually',
      features: [
        { name: 'All Starter features', included: true },
        { name: 'Daily login rewards', included: true },
        { name: 'Cable TV subscriptions', included: true },
        { name: 'Electricity bill payments', included: true },
        { name: 'BVN verification', included: true },
        { name: 'Enhanced referral commission (5%)', included: true },
        { name: 'Monthly usage analytics', included: false },
      ],
      buttonText: 'Upgrade Now',
      popular: true,
      buttonVariant: 'default' as const,
      icon: <Zap className="h-10 w-10 text-primary mb-4" />
    },
    {
      name: 'Enterprise',
      description: 'Complete solution for businesses and resellers',
      price: billingPeriod === 'monthly' ? '₦4,999' : '₦3,999',
      period: billingPeriod === 'monthly' ? '/month' : '/month, billed annually',
      features: [
        { name: 'All Premium features', included: true },
        { name: 'WAEC/JAMB scratch cards', included: true },
        { name: 'Bulk transactions', included: true },
        { name: 'Enhanced referral commission (10%)', included: true },
        { name: 'Detailed monthly usage analytics', included: true },
        { name: 'Priority transaction processing', included: true },
        { name: 'Dedicated account manager', included: true },
      ],
      buttonText: 'Contact Sales',
      popular: false,
      buttonVariant: 'default' as const,
      icon: <Shield className="h-10 w-10 text-primary mb-4" />
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Affordable <span className="text-blue-500">VTU Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose the plan that fits your virtual top-up needs and start saving today.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Label htmlFor="billing-toggle" className={`${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </Label>
            <Switch 
              id="billing-toggle"
              checked={billingPeriod === 'yearly'}
              onCheckedChange={(checked) => setBillingPeriod(checked ? 'yearly' : 'monthly')}
            />
            <div className="flex items-center">
              <Label htmlFor="billing-toggle" className={`${billingPeriod === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </Label>
              <span className="inline-block ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                Save 25%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={item}
              className="flex flex-col h-full"
            >
              <Card className={`
                h-full p-6 flex flex-col
                ${plan.popular ? 'glass-card border-2 border-primary/20 ring-1 ring-primary/10' : 'glass-panel'}
                ${plan.popular ? 'shadow-glass' : 'shadow-subtle'}
              `}>
                {plan.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2">
                    <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col items-center mb-6">
                  {plan.icon}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 text-center">{plan.description}</p>
                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="w-full mt-auto"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            Need a custom solution for your business? <a href="#" className="text-primary hover:underline">Contact our sales team</a> for a personalized quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;