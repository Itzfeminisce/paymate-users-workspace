
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, PhoneIcon, Zap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth()
  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 -top-[10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl opacity-60" />
        <div className="absolute left-0 top-[30%] w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center px-3 py-1.5 mb-6 text-xs font-medium rounded-full bg-blue-50 text-blue-500 border border-blue-100 shadow-sm">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              The most reliable VTU service provider
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Recharge <span className="text-blue-500">seamlessly</span>. Pay <span className="text-blue-500">effortlessly</span>.
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Experience the fastest and most reliable virtual top-up service for airtime, data bundles, cable TV, and electricity bills.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="group">
                <a href={isAuthenticated ? "/dashboard" : "/sign-up"}>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Get Started
                </a>
              </Button>
              <Button size="lg" asChild variant="outline">
                <a href={"/#services"}>
                  Learn More
                </a>

              </Button>
            </div>

            <div className="mt-12 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Airtime Topup</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Data Bundles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Bill Payments</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <GlassCard className="p-6 md:p-8 relative z-10 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">
                <h3 className="text-xl font-medium mb-1">Wallet Balance</h3>
                <p className="text-3xl font-bold">₦ 25,420.00</p>
                <div className="flex justify-between mt-6">
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    Add Funds
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    Transfer
                  </Button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/70 border border-border">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                      <PhoneIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Airtime</h3>
                      <p className="text-sm text-muted-foreground">Top up any network</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/70 border border-border">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Data Bundle</h3>
                      <p className="text-sm text-muted-foreground">Stay connected online</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/70 border border-border">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Pay Bills</h3>
                      <p className="text-sm text-muted-foreground">Cable TV, Electricity & more</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </GlassCard>

            {/* Decorative elements */}
            <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 -left-10 w-24 h-24 bg-purple-400/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
