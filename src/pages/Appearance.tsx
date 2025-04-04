
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { ArrowLeft, Sun, Moon, Monitor, CheckCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import NavigateBack from '@/components/ui/navigate-back';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';

export default function Appearance() {
  const { toast } = useToast();
  const [theme, setTheme] = useState<string>("light");
  const [fontSize, setFontSize] = useState<string>("medium");
  const [colorScheme, setColorScheme] = useState<string>("blue");


  const handleThemeChange = (value: string) => {
    if (value) {
      setTheme(value);
      toast({
        title: "Theme updated",
        description: `Theme has been set to ${value} mode.`,
      });
    }
  };

  const handleFontSizeChange = (value: string) => {
    if (value) {
      setFontSize(value);
      toast({
        title: "Font size updated",
        description: `Font size has been set to ${value}.`,
      });
    }
  };

  const handleColorSchemeChange = (value: string) => {
    if (value) {
      setColorScheme(value);
      toast({
        title: "Color scheme updated",
        description: `Color scheme has been set to ${value}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">
      {/* Sidebar */}
      <Sidebar />

      <Container enableBackButton title='Appearance' description='Customize how the application looks and feels'>
        {/* Theme Selection */}
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-6">Theme Mode</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Light mode option */}
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => handleThemeChange('light')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Sun className="h-5 w-5 text-yellow-500" />
                  </div>
                  {theme === 'light' && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <h4 className="font-medium">Light Mode</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  A bright theme for daytime use
                </p>
              </div>

              {/* Dark mode option */}
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => handleThemeChange('dark')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center shadow-sm">
                    <Moon className="h-5 w-5 text-gray-100" />
                  </div>
                  {theme === 'dark' && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Easier on the eyes in low-light environments
                </p>
              </div>

              {/* System mode option */}
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => handleThemeChange('system')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                    <Monitor className="h-5 w-5 text-gray-700" />
                  </div>
                  {theme === 'system' && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <h4 className="font-medium">System Default</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Follows your device's theme settings
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Font Size */}
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Font Size</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Adjust the size of text throughout the application
            </p>

            <ToggleGroup
              type="single"
              value={fontSize}
              onValueChange={handleFontSizeChange}
              className="justify-start"
            >
              <ToggleGroupItem value="small" className="px-4">Small</ToggleGroupItem>
              <ToggleGroupItem value="medium" className="px-4">Medium</ToggleGroupItem>
              <ToggleGroupItem value="large" className="px-4">Large</ToggleGroupItem>
            </ToggleGroup>

            <div className="mt-6 p-4 border rounded-lg">
              <p className={`${fontSize === 'small' ? 'text-sm' :
                fontSize === 'large' ? 'text-lg' : 'text-base'
                }`}>
                This is a preview of how text will appear in your selected size.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Color Scheme */}
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Color Scheme</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose a color scheme for buttons and interactive elements
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <button
                onClick={() => handleColorSchemeChange('blue')}
                className={`w-full h-10 rounded-md flex items-center justify-center ${colorScheme === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                style={{ backgroundColor: '#3B82F6' }}
              >
                {colorScheme === 'blue' && <CheckCircle className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={() => handleColorSchemeChange('green')}
                className={`w-full h-10 rounded-md flex items-center justify-center ${colorScheme === 'green' ? 'ring-2 ring-offset-2 ring-green-500' : ''
                  }`}
                style={{ backgroundColor: '#10B981' }}
              >
                {colorScheme === 'green' && <CheckCircle className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={() => handleColorSchemeChange('purple')}
                className={`w-full h-10 rounded-md flex items-center justify-center ${colorScheme === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                  }`}
                style={{ backgroundColor: '#8B5CF6' }}
              >
                {colorScheme === 'purple' && <CheckCircle className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={() => handleColorSchemeChange('red')}
                className={`w-full h-10 rounded-md flex items-center justify-center ${colorScheme === 'red' ? 'ring-2 ring-offset-2 ring-red-500' : ''
                  }`}
                style={{ backgroundColor: '#EF4444' }}
              >
                {colorScheme === 'red' && <CheckCircle className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={() => handleColorSchemeChange('orange')}
                className={`w-full h-10 rounded-md flex items-center justify-center ${colorScheme === 'orange' ? 'ring-2 ring-offset-2 ring-orange-500' : ''
                  }`}
                style={{ backgroundColor: '#F97316' }}
              >
                {colorScheme === 'orange' && <CheckCircle className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={() => handleColorSchemeChange('pink')}
                className={`w-full h-10 rounded-md flex items-center justify-center ${colorScheme === 'pink' ? 'ring-2 ring-offset-2 ring-pink-500' : ''
                  }`}
                style={{ backgroundColor: '#EC4899' }}
              >
                {colorScheme === 'pink' && <CheckCircle className="h-5 w-5 text-white" />}
              </button>
            </div>

            <div className="mt-6">
              <Button
                className={`${colorScheme === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                  colorScheme === 'green' ? 'bg-green-500 hover:bg-green-600' :
                    colorScheme === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                      colorScheme === 'red' ? 'bg-red-500 hover:bg-red-600' :
                        colorScheme === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
                          colorScheme === 'pink' ? 'bg-pink-500 hover:bg-pink-600' : ''
                  }`}
              >
                Sample Button
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Button className="mt-4" onClick={() => toast({
            title: "Settings saved",
            description: "Your appearance settings have been saved.",
          })}>
            Save Settings
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}
