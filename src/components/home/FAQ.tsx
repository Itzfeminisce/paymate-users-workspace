import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      question: "How quickly are transactions processed?",
      answer: "Most transactions are processed instantly. In rare cases, it might take up to 5 minutes. We guarantee 99.9% uptime and real-time processing for all services including airtime, data, and bill payments."
    },
    {
      question: "Is my money safe with PayMate?",
      answer: "Absolutely! We use bank-grade security measures and are fully compliant with CBN regulations. All transactions are encrypted and monitored 24/7. We also implement two-factor authentication and real-time fraud detection systems to ensure your funds are always protected."
    },
    {
      question: "What are your transaction fees?",
      answer: "We maintain transparent and competitive pricing. Basic transactions are charged at 1% with a cap of ₦2000. Premium users enjoy reduced fees of 0.5% and higher transaction limits. Some services like airtime recharge come with zero transaction fees."
    },
    {
      question: "How do I get started with PayMate?",
      answer: "Getting started is simple: 1) Create an account using your email or phone number, 2) Complete the quick verification process, 3) Fund your wallet using your preferred payment method, and 4) Start making transactions. The entire process takes less than 5 minutes."
    },
    {
      question: "What payment methods do you support?",
      answer: "We support multiple payment methods including bank transfers, debit cards (Visa, Mastercard, Verve), USSD, and other digital wallets. You can also receive payments from other PayMate users instantly."
    },
    {
      question: "What should I do if a transaction fails?",
      answer: "Don't worry! For failed transactions, the funds are automatically reversed within 24 hours. You can check the status of any transaction in your dashboard. If you need immediate assistance, our 24/7 support team is available via chat, email, or phone."
    },
    {
      question: "Are there any transaction limits?",
      answer: "Basic accounts have a daily transaction limit of ₦500,000 and monthly limit of ₦5,000,000. Premium users enjoy higher limits of up to ₦5,000,000 daily and ₦50,000,000 monthly. These limits can be increased upon request and additional verification."
    },
    {
      question: "How do I contact customer support?",
      answer: "We offer 24/7 support through multiple channels: Live chat (fastest response), Email support@paymate.ng, Phone: 0800-PAYMATE, and our social media handles. Premium users get priority support with dedicated account managers."
    },
    {
      question: "Can I use PayMate for my business?",
      answer: "Yes! We offer specialized business accounts with features like bulk payments, payment links, automated reconciliation, and detailed transaction analytics. Business accounts also get higher transaction limits and reduced fees."
    },
    {
      question: "What happens if I send money to the wrong account?",
      answer: "For transfers within PayMate, you can cancel the transaction immediately if the recipient hasn't accepted it. For bank transfers, contact our support team immediately, and we'll help you initiate the recovery process with the receiving bank."
    },
    {
      question: "Do you have a referral program?",
      answer: "Yes! Earn up to ₦1,000 for each friend you refer who completes their first transaction. There's no limit to how many friends you can refer. Premium users earn higher referral bonuses and special rewards."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes! Our mobile app is available for both Android and iOS devices. You can download it from the Google Play Store or Apple App Store. The app offers all features available on the web platform, plus exclusive mobile features like fingerprint authentication and QR code payments."
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="faq">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Got questions? We've got answers! If you can't find what you're looking for,
            our support team is always here to help.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-primary/10"
              >
                <AccordionTrigger className="text-lg hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Support CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 