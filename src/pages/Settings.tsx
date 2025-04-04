
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, CreditCard, Moon, Sun } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import NavigateBack from '@/components/ui/navigate-back';
import Container from '@/components/layout/Container';

export default function Settings() {

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">
      {/* Desktop Sidebar */}
      <Sidebar />

      <Container description='Manage your application preferences and account settings' title='Settings'>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <motion.div variants={fadeUp}>
              <GlassCard className="p-4">
                <nav className="space-y-1">
                  <button className="w-full flex items-center px-3 py-2 text-sm rounded-md bg-primary/10 text-primary">
                    <Bell className="h-5 w-5 mr-3" />
                    Notifications
                  </button>
                  <Link to="/payment-methods" className='w-full flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100'>
                    <CreditCard className="h-5 w-5 mr-3" />
                    Payment Methods
                  </Link>

                  <Link to="/appearance" className='w-full flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100'>
                    <Sun className="h-5 w-5 mr-3" />
                    Appearance
                  </Link>

                </nav>
              </GlassCard>
            </motion.div>
          </div>

          <div className="md:col-span-2">
            <motion.div variants={fadeUp}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h4 className="text-sm font-medium">Email Notifications</h4>
                      <p className="text-xs text-muted-foreground">Receive email updates about your account activity</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h4 className="text-sm font-medium">SMS Notifications</h4>
                      <p className="text-xs text-muted-foreground">Receive SMS alerts for transactions and account updates</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h4 className="text-sm font-medium">Marketing Emails</h4>
                      <p className="text-xs text-muted-foreground">Receive promotional offers and updates about our services</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-sm font-medium">Security Alerts</h4>
                      <p className="text-xs text-muted-foreground">Receive alerts about suspicious activity on your account</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>Save Preferences</Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </Container>


    </div>
  );
}
