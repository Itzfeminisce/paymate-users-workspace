import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Mail,
    MessageSquare,
    Phone,
    MapPin,
    Send,
    Linkedin,
    Twitter,
    Facebook,
    Instagram
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const contactMethods = [
    {
        icon: <Phone className="h-6 w-6" />,
        title: 'Phone',
        description: 'Mon-Fri from 8am to 5pm.',
        value: '+234 (800) PAYMATE',
        color: 'from-green-500/20 via-green-500/5 to-transparent',
        highlight: 'text-green-500'
    },
    {
        icon: <Mail className="h-6 w-6" />,
        title: 'Email',
        description: '24/7 support available',
        value: 'support@paymate.ng',
        color: 'from-blue-500/20 via-blue-500/5 to-transparent',
        highlight: 'text-blue-500'
    },
    {
        icon: <MapPin className="h-6 w-6" />,
        title: 'Office',
        description: 'Come say hello!',
        value: 'Lagos, Nigeria',
        color: 'from-purple-500/20 via-purple-500/5 to-transparent',
        highlight: 'text-purple-500'
    },
];

const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
];

const ContactMethod = ({ method, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300`} />

        <div className="relative bg-background/50 backdrop-blur-md rounded-xl border border-white/10 p-6 overflow-hidden">
            <div className="relative z-10">
                <div className={`h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 ${method.highlight} group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                <p className={`font-medium ${method.highlight}`}>{method.value}</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-300" />
        </div>
    </motion.div>
);

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <AnimatePresence mode="wait">
            <Navbar />

            <main className="flex-grow">
                <div className="min-h-screen py-20 relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                        {/* Animated dots */}
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
                        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300" />

                        {/* Grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    </div>

                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Get in <span className="text-primary">Touch</span>
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                            {contactMethods.map((method, index) => (
                                <ContactMethod key={index} method={method} index={index} />
                            ))}
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur opacity-75" />

                                <div className="relative bg-background/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Name</label>
                                                <Input
                                                    required
                                                    placeholder="Your name"
                                                    className="bg-background/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Email</label>
                                                <Input
                                                    required
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="bg-background/50"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Subject</label>
                                            <Input
                                                required
                                                placeholder="How can we help?"
                                                className="bg-background/50"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Message</label>
                                            <Textarea
                                                required
                                                placeholder="Your message..."
                                                className="bg-background/50 min-h-[150px]"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Send Message
                                                    <Send className="h-4 w-4" />
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-12 text-center"
                            >
                                <p className="text-muted-foreground mb-4">Follow us on social media</p>
                                <div className="flex justify-center gap-4">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </AnimatePresence>
    );
};

export default Contact; 