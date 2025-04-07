import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Navigation items configuration
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '/contact' },
];

// Animation variants for reuse
const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
};

const fadeInY = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

// Navigation components
const NavLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <motion.div
      {...fadeInScale}
      transition={{ duration: 0.5 }}
      className="font-bold text-2xl text-primary"
    >
      Pay<span className="text-blue-500">Mate</span>
    </motion.div>
  </Link>
);

// const DesktopNavItems = () => (
//   <nav className="hidden md:flex items-center space-x-8">
//     {navItems.map((item, i) => (
//       <motion.div
//         key={item.name}
//         {...fadeInY}
//         transition={{ duration: 0.3, delay: 0.1 * i }}
//       >
//         <Link
//           to={item.href}
//           className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
//         >
//           {item.name}
//         </Link>
//       </motion.div>
//     ))}
//   </nav>
// );

const DesktopNavItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Function to handle all navigation
  const handleNavigation = (e, href) => {
    e.preventDefault();
    
    // Check if it's a hash link
    if (href.includes('#')) {
      const hash = href.substring(href.indexOf('#'));
      
      // If we're already on the home page, just scroll
      if (location.pathname === '/' || location.pathname === '') {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on another page, navigate to home first, then scroll
        navigate('/', { state: { scrollTo: hash } });
      }
    } else {
      // Regular page navigation
      navigate(href);
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item, i) => (
        <motion.div
          key={item.name}
          {...fadeInY}
          transition={{ duration: 0.3, delay: 0.1 * i }}
        >
          <a
            href={item.href}
            className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
            onClick={(e) => handleNavigation(e, item.href)}
          >
            {item.name}
          </a>
        </motion.div>
      ))}
    </nav>
  );
};

const MobileNavItems = ({ onItemClick }: { onItemClick: () => void }) => (
  <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
    {navItems.map((item, i) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.05 * i }}
      >
        <a
          href={item.href}
          className="block py-2 text-base font-medium text-foreground/90 hover:text-primary"
          onClick={onItemClick}
        >
          {item.name}
        </a>
      </motion.div>
    ))}
  </div>
);

const UserMenu = ({ user, onLogout }: { user?: { name?: string }, onLogout: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <User size={14} />
        {user?.name || 'Account'}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to="/dashboard">Dashboard</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/profile">Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout} className="text-destructive">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const AuthButtons = ({ isMobile = false, onItemClick = () => { } }) => (
  <div className="flex gap-x-2">
    <Button variant="outline" size="sm" asChild>
      <Link to="/sign-in" onClick={onItemClick}>
        Log In
      </Link>
    </Button>
    <Button size="sm" asChild>
      <Link to="/sign-up" onClick={onItemClick}>
        Get Started
      </Link>
    </Button>
  </div>
);

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileMenuAnimation = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLogo />
        <DesktopNavItems />

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <motion.div
              {...fadeInScale}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <UserMenu user={user} onLogout={handleLogout} />
            </motion.div>
          ) : (
            <>
              <motion.div
                {...fadeInScale}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <AuthButtons />
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            {...mobileMenuAnimation}
            className="md:hidden bg-white/95 backdrop-blur-md"
          >
            <MobileNavItems onItemClick={closeMobileMenu} />
            <div className="container mx-auto px-4 pt-4 flex flex-col space-y-3">
              {isAuthenticated ? (
                <div className="flex gap-x-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard" onClick={closeMobileMenu}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <AuthButtons isMobile onItemClick={closeMobileMenu} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
