
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Airtime Top-up', href: '#' },
      { name: 'Data Bundles', href: '#' },
      { name: 'Cable TV', href: '#' },
      { name: 'Electricity', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
    }
  },
};

const Footer = () => {
  return (
    <footer className="bg-secondary/50 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand and contact info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="font-bold text-2xl text-primary">
              VTU<span className="text-blue-500">Link</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              The fastest and most reliable VTU service provider for all your virtual top-up needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <PhoneIcon className="h-4 w-4 text-primary/80" />
                <span>+234 800 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MailIcon className="h-4 w-4 text-primary/80" />
                <span>support@vtulink.com</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPinIcon className="h-4 w-4 text-primary/80 mt-0.5" />
                <span>123 Innovation Drive, Lagos, Nigeria</span>
              </div>
            </div>
          </motion.div>

          {/* Footer links */}
          {footerLinks.map((group) => (
            <motion.div variants={fadeInUp} key={group.title} className="space-y-4">
              <h3 className="font-medium text-primary">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
        >
          <p>© 2023 VTULink. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
