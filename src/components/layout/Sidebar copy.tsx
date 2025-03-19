import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { navItems } from '@/lib/configs';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Menu, Moon, Settings, Sun, User, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to the document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  if (!isAuthenticated) return null;

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-10">
        <div className="flex flex-col flex-grow bg-white shadow-md overflow-y-auto dark:bg-gray-900">
          <div className="flex items-center px-4 py-6 border-b dark:border-gray-800">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="bg-primary text-white">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium dark:text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md ${
                  window.location.pathname === item.path
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="px-3 py-4 border-t dark:border-gray-800">
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log out
            </Button>

            {/* Theme Toggle Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  {theme === 'light' ? (
                    <Sun className="h-5 w-5" />
                  ) : theme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Monitor className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toggleTheme('light')}>
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleTheme('dark')}>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleTheme('system')}>
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex items-center px-4 py-6 border-b dark:border-gray-800">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-primary text-white">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground dark:text-gray-400">{user?.email}</p>
              </div>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-md ${
                    window.location.pathname === item.path
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>

            <div className="px-3 py-4 border-t dark:border-gray-800">
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
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

        <h1 className="text-lg font-bold dark:text-white">VTULink</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>No new notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;