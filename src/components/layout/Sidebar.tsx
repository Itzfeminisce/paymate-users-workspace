import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { navItems } from '@/lib/configs';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Menu, Monitor, Moon, Settings, Sun, User, } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from "@/components/ui/theme-toggle"


const Sidebar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    if (!isAuthenticated) return null
    return (
        <div>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-10">
                <div className="flex flex-col flex-grow bg-white shadow-md overflow-y-auto">
                    <div className="flex items-center px-4 py-6 border-b">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user?.profilePicture} />
                            <AvatarFallback className="bg-primary text-white">{getInitials(user.name)}</AvatarFallback>
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
                                className={`flex items-center px-4 py-3 text-sm rounded-md ${window.location.pathname === item.path
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

                        {/* Theme Toggle Dropdown */}
                        {/* <ThemeToggle /> */}
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
                                <AvatarFallback className="bg-primary text-white">{getInitials(user.name)}</AvatarFallback>
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
                                    className={`flex items-center px-4 py-3 text-sm rounded-md ${window.location.pathname === item.path
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

        </div>
    )
}

export default Sidebar