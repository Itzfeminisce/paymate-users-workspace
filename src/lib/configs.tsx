import {
  Bell,
  CreditCard,
  Database,
  GalleryVerticalEnd,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontalIcon,
  Phone,
  Settings,
  Smartphone,
  User,
  Users,
  Wallet,
  Wifi
} from 'lucide-react';

// Service items
export const serviceItems = [
  { title: 'Airtime', value: "airtime", icon: <Phone className="h-6 w-6" />, color: 'bg-purple-100 text-purple-600' },
  { title: 'Data', value: "data", icon: <Wifi className="h-6 w-6" />, color: 'bg-blue-100 text-blue-600' },
  { title: 'Cable TV', value: "cable", icon: <Database className="h-6 w-6" />, color: 'bg-orange-100 text-orange-600' },
  { title: 'Electricity', value: "electricity", icon: <CreditCard className="h-6 w-6" />, color: 'bg-green-100 text-green-600' },
  { title: 'More', value: "more", icon: <MoreHorizontalIcon className="h-6 w-6" />, color: 'bg-red-100 text-red-600' },
];

// Navigation items
export const navItems = [
  {
    title: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard'
  },
  {
    title: 'Services', icon: <GalleryVerticalEnd className="h-5 w-5" />, path: '/services'
  },
  {
    title: 'Fund Wallet', icon: <Wallet className="h-5 w-5" />, path: '/fund-wallet'
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
  {
    title: 'Referrals', icon: <Users className="h-5 w-5" />, path: '/referrals'
  },
  { title: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
];
