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

// Service items
export const serviceItems = [
  { title: 'Airtime', icon: <Phone className="h-6 w-6" />, color: 'bg-purple-100 text-purple-600' },
  { title: 'Data', icon: <Wifi className="h-6 w-6" />, color: 'bg-blue-100 text-blue-600' },
  { title: 'Cable TV', icon: <Database className="h-6 w-6" />, color: 'bg-orange-100 text-orange-600' },
  { title: 'Electricity', icon: <CreditCard className="h-6 w-6" />, color: 'bg-green-100 text-green-600' },
];

// Navigation items
export const navItems = [
  {
    title: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard'
  },
  {
    title: 'My Profile', icon: <User className="h-5 w-5" />, path: '/profile'
  },
  {
    title: 'Transactions', icon: <CreditCard className="h-5 w-5" />, path: '/transactions'
  },
  {
    title: 'Messages', icon: <MessageSquare className="h-5 w-5" />, path: '/messages'
  },
  { title: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
];
