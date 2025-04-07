import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles } from 'lucide-react';

interface ReferralCodeInputProps {
  onSubmit: (code: string) => Promise<any>;
}

export const ReferralCodeInput = ({ onSubmit }: ReferralCodeInputProps) => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(code);
      setCode('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-2xl blur-xl opacity-50" />
      
      <div className="relative bg-background/60 backdrop-blur-xl rounded-2xl p-8 border border-primary/10 shadow-lg">
        <div className="grid md:grid-cols-[1fr,auto] gap-8 items-center">
          {/* Left: Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">
                Have a Referral Code?
              </h3>
            </div>
            <p className="text-muted-foreground">
              Enter your friend's referral code and get started with exclusive benefits!
            </p>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:min-w-[280px]">
            <div className="relative flex-1">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                className="bg-background/50 h-11 pr-10 w-full"
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="h-11 px-4 sm:px-8 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⭐</span>
                  <span className="whitespace-nowrap">Applying...</span>
                </>
              ) : (
                <span className="whitespace-nowrap">Apply Code</span>
              )}
            </Button>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
}; 