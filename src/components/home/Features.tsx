
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  BarChart, 
  Users, 
  Phone, 
  Tv, 
  Lightbulb 
} from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: 'Instant Recharge',
    description: 'Get your airtime and data delivered instantly to your phone, no delays.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
    title: 'Secure Transactions',
    description: 'Bank-grade security protocols to keep your money and data safe.',
  },
  {
    icon: <Clock className="h-6 w-6 text-purple-500" />,
    title: '24/7 Availability',
    description: 'Our service is available round the clock, including holidays.',
  },
  {
    icon: <CreditCard className="h-6 w-6 text-orange-500" />,
    title: 'Multiple Payment Options',
    description: 'Pay with your card, bank transfer, or use your VTULink wallet.',
  },
];

const services = [
  {
    icon: <Phone className="h-6 w-6 text-blue-500" />,
    title: 'Airtime Top-up',
    description: 'Recharge airtime for any network - MTN, Airtel, Glo, 9mobile.',
  },
  {
    icon: <Zap className="h-6 w-6 text-green-500" />,
    title: 'Data Bundles',
    description: 'Purchase data plans from all major network providers at great rates.',
  },
  {
    icon: <Tv className="h-6 w-6 text-purple-500" />,
    title: 'Cable TV Subscription',
    description: 'Pay for DSTV, GOTV, and Startimes subscriptions without stress.',
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    title: 'Electricity Bills',
    description: 'Pay electricity bills for all DisCos across Nigeria instantly.',
  },
  {
    icon: <BarChart className="h-6 w-6 text-red-500" />,
    title: 'Usage Analytics',
    description: 'Track your spending and usage patterns with detailed reports.',
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-500" />,
    title: 'Referral Program',
    description: 'Earn commissions when you refer friends to use our service.',
  },
];

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

const Features = () => {
  return (
    <section id="services" className="py-20 md:py-28">
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
            Everything You Need In One Place
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer a comprehensive suite of virtual top-up services designed to make digital payments seamless and convenient.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <GlassCard className="p-6 h-full">
                <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our <span className="text-blue-500">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our range of services designed to make your digital life easier.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <GlassCard
                className="p-6 h-full flex flex-col"
                hoverEffect={true}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="mt-auto">
                  <a href="#" className="text-blue-500 font-medium inline-flex items-center hover:text-blue-600">
                    Learn more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
