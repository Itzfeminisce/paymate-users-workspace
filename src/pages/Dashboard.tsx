
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  CreditCard, 
  Database, 
  Home, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Phone, 
  Settings, 
  Smartphone, 
  User, 
  Wifi 
} from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  // Generate user avatar initials
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  // Service items
  const serviceItems = [
    { title: 'Airtime', icon: <Phone className="h-6 w-6" />, color: 'bg-purple-100 text-purple-600' },
    { title: 'Data', icon: <Wifi className="h-6 w-6" />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Cable TV', icon: <Database className="h-6 w-6" />, color: 'bg-orange-100 text-orange-600' },
    { title: 'Electricity', icon: <CreditCard className="h-6 w-6" />, color: 'bg-green-100 text-green-600' },
  ];

  // Navigation items
  const navItems = [
    { title: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard' },
    { title: 'My Profile', icon: <User className="h-5 w-5" />, path: '/profile' },
    { title: 'Transactions', icon: <CreditCard className="h-5 w-5" />, path: '/transactions' },
    { title: 'Messages', icon: <MessageSquare className="h-5 w-5" />, path: '/messages' },
    { title: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-10">
        <div className="flex flex-col flex-grow bg-white shadow-md pt-16 overflow-y-auto">
          <div className="flex items-center px-4 py-6 border-b">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md ${
                  window.location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>
          
          <div className="px-3 py-4 border-t">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b">
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex items-center px-4 py-6 border-b">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-md ${
                    window.location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
            
            <div className="px-3 py-4 border-t">
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  logout();
                  setIsMobileSidebarOpen(false);
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Log out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <h1 className="text-lg font-bold">VTULink</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              No new notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Main Content */}
      <div className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.name || 'User'}!</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your account, top-up, and view your transaction history.
                  </p>
                </div>
                
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user?.profilePicture} />
                          <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={fadeUp} className="md:col-span-2">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-medium mb-4">Account Balance</h3>
                  <p className="text-3xl font-bold">₦0.00</p>
                  <div className="mt-4">
                    <Button>Fund Wallet</Button>
                  </div>
                </GlassCard>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No recent transactions</p>
                  </div>
                  <Link to="/transactions">
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View All Transactions
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            </div>
            
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-medium mb-4">Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {serviceItems.map((service) => (
                  <GlassCard key={service.title} className="p-4 cursor-pointer hover:scale-105 transition-transform">
                    <div className="flex flex-col items-center">
                      <div className={`${service.color} p-3 rounded-full mb-3`}>
                        {service.icon}
                      </div>
                      <h4 className="text-sm font-medium">{service.title}</h4>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Refer & Earn</h3>
                <p className="text-muted-foreground mb-4">
                  Share your referral link with friends and earn bonuses when they sign up!
                </p>
                <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  https://vtulink.com/ref/{user?.id || '123456'}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">Copy Link</Button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
