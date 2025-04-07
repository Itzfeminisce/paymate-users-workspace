import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { GridPattern } from '../illustrations/GridPattern';
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
import { GlassWave } from '../illustrations/GlassWave';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: 'Lightning Fast Delivery',
    description: 'Get instant delivery on all transactions. No delays, no waiting - experience the fastest service in Nigeria.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
    title: 'Bank-Grade Security',
    description: 'Your transactions are protected by enterprise-level security. We use the latest encryption technology to keep your data safe.',
  },
  {
    icon: <CreditCard className="h-6 w-6 text-orange-500" />,
    title: 'Best Market Rates',
    description: 'Enjoy the most competitive rates in the market. Save up to 5% on every transaction with our premium plans.',
  },
  {
    icon: <Clock className="h-6 w-6 text-purple-500" />,
    title: 'Always Available',
    description: '24/7 service availability with real-time transaction monitoring and instant support when you need it.',
  },
];

const services = [
  {
    icon: <Phone className="h-6 w-6 text-blue-500" />,
    title: 'Smart Airtime Top-up',
    description: 'Recharge any network instantly with our smart top-up system. Get bonus on every recharge.',
    action: 'Top up now',
    link: '/dashboard/airtime'
  },
  {
    icon: <Zap className="h-6 w-6 text-green-500" />,
    title: 'Affordable Data Bundles',
    description: 'Get more data for less. Save up to 10% on data bundles across all networks.',
    action: 'Buy data',
    link: '/dashboard/data'
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

// Add new geometric shapes component
const GeometricShapes = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Gradient orbs */}
    <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
    
    {/* Animated dots */}
    <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-300" />
    
    {/* Background patterns */}
    <GridPattern />
    <GridPattern />
  </div>
);

// Update the feature card design
const FeatureCard = ({ feature, index }) => (
  <motion.div variants={item}>
    <GlassCard className="p-6 h-full relative overflow-hidden group">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon container with animated border */}
      <div className="relative">
        <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <div className="absolute inset-0 border border-primary/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
      
      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary/5">
          <path d="M100 0v100H0C0 44.8 44.8 0 100 0z" fill="currentColor" />
        </svg>
      </div>
    </GlassCard>
  </motion.div>
);

// Update the service card design
const ServiceCard = ({ service, index }) => (
  <motion.div variants={item}>
    <GlassCard
      className="p-6 h-full flex flex-col relative overflow-hidden group"
      hoverEffect={true}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 transform group-hover:rotate-12 transition-transform duration-300">
          {service.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
        <p className="text-muted-foreground mb-4">{service.description}</p>
      </div>
      
      {/* Action button */}
      {service.action && (
        <div className="mt-auto relative z-10">
          <a href={service.link} className="inline-flex items-center px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            {service.action}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </GlassCard>
  </motion.div>
);

// Add more testimonials with images
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Business Owner",
    content: "PayMate has transformed how I handle utility payments for my business. The rates are unbeatable and the service is incredibly reliable.",
    avatar: "https://img.freepik.com/free-photo/headshot-lovely-satisfied-religious-muslim-woman-with-gentle-smile-dark-healthy-skin-wears-scarf-head-isolated-white-background_1157-48176.jpg?ga=GA1.1.2129623714.1743743991&semt=ais_hybrid&w=740", // Add these images to your public folder
    rating: 5
  },
  {
    name: "Michael Chen",
    title: "Tech Entrepreneur",
    content: "The platform's security features give me peace of mind. I've been using PayMate for over a year, and it's been flawless.",
    avatar: "https://img.freepik.com/free-photo/close-up-happy-man-spending-free-time-clothing-store-handsome-african-man-waiting-consultant-posing-camera-near-hangers-with-shirts-clothes-business-male-fashion-shopping-concept_74855-21495.jpg?ga=GA1.1.2129623714.1743743991&semt=ais_hybrid&w=740",
    rating: 5
  },
  {
    name: "Aisha Patel",
    title: "Store Manager",
    content: "Customer support is exceptional. Any issues are resolved quickly, and the platform is very user-friendly.",
    avatar: "https://img.freepik.com/free-photo/medium-shot-woman-wearing-halal-outdoors_23-2150701555.jpg?ga=GA1.1.2129623714.1743743991&semt=ais_hybrid&w=740",
    rating: 5
  }
];

// Add a star rating component
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Update the testimonial card design
const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    }}
    className="relative"
  >
    <div className="relative group">
      {/* Glowing background effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      {/* Card content */}
      <div className="relative bg-background/80 backdrop-blur-xl rounded-xl p-8 ring-1 ring-primary/10">
        {/* Quote icon */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10.5h-.5a2.5 2.5 0 1 0 2.5 2.5v-7.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10.5h-.5a2.5 2.5 0 1 0 2.5 2.5v-7.5" />
          </svg>
        </div>

        {/* Star rating */}
        <StarRating rating={testimonial.rating} />
        
        {/* Testimonial content */}
        <p className="text-muted-foreground mb-6 relative line-clamp-3">
          {testimonial.content}
        </p>
        
        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full ring-2 ring-background flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  </motion.div>
);

// Add this new component for animated counter
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(0);
  const valueNum = parseInt(value.replace(/[^0-9]/g, ''));

  React.useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      countRef.current = Math.floor(progress * valueNum);
      setCount(countRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [valueNum, duration]);

  return value.replace(/[0-9]+/, count.toString());
};

// Add this new component for metric card
const MetricCard = ({ metric, index }) => {
  const colors = [
    'from-blue-500/20 via-blue-400/10 to-transparent',
    'from-green-500/20 via-green-400/10 to-transparent',
    'from-purple-500/20 via-purple-400/10 to-transparent',
    'from-orange-500/20 via-orange-400/10 to-transparent',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300`} />
      
      <div className="relative bg-background/50 backdrop-blur-md rounded-xl border border-white/10 p-8 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id={`grid-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M.5 20V.5H20" fill="none" stroke="currentColor" strokeWidth=".5"/>
            </pattern>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            <AnimatedCounter value={metric.value} />
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium">
            {metric.label}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-300" />
        
        {/* Floating icons */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          {metric.icon}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent blur" />
      </div>
    </motion.div>
  );
};

// Update the trust metrics data with icons
const trustMetrics = [
  { 
    value: '₦500M+', 
    label: 'Processed Monthly',
    icon: <BarChart className="w-8 h-8" />
  },
  { 
    value: '50K+', 
    label: 'Active Users',
    icon: <Users className="w-8 h-8" />
  },
  { 
    value: '99.9%', 
    label: 'Success Rate',
    icon: <ShieldCheck className="w-8 h-8" />
  },
  { 
    value: '24/7', 
    label: 'Customer Support',
    icon: <Clock className="w-8 h-8" />
  },
];

const Features = () => {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <GlassWave />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose <span className="text-blue-500">PayMate</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who trust PayMate for their daily transactions. Experience the difference today.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Services grid */}
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
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>

        {/* Update testimonials section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-32 relative"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our <span className="text-primary">Users</span> Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about their experience with PayMate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Enhanced trust metrics section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 relative"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-50 -translate-y-1/2" />
          </div>

          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-primary">Impact</span> in Numbers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by thousands of users across Nigeria, delivering reliable services with exceptional performance.
              </p>
            </motion.div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {trustMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} index={index} />
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
