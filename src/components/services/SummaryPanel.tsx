import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Receipt, RefreshCw } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { SummaryPanelProps } from './types';

const SummaryPanel = memo(({ values, handleClearForm }: SummaryPanelProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <GlassCard className="p-6 flex flex-col h-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Receipt className="w-6 h-6 text-gray-700" />
        <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Transaction Summary
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {values.length > 0 ? (
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {values.map(([key, value]) => (
              <motion.li
                key={key}
                variants={item}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent rounded-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                <div className="relative p-3 rounded-lg transition-all duration-200 group-hover:translate-x-1">
                  <div className="text-sm text-gray-500 capitalize mb-1">{key}</div>
                  <div className="font-medium text-gray-800 uppercase">{value || '-'}</div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center p-6"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <Receipt className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No data entered yet</p>
            <p className="text-sm text-gray-400">Fill in the form to see your transaction summary</p>
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            Proceed to Payment
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>

        <Button
          variant="outline"
          type="button"
          onClick={handleClearForm}
          className="w-full border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset Form
          </span>
        </Button>
      </div>
    </GlassCard>
  );
});

SummaryPanel.displayName = 'SummaryPanel';

export default SummaryPanel; 