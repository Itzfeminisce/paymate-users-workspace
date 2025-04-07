import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { navItems } from '@/lib/configs';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Menu, ShieldCheck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { User } from '@/hooks/api-hooks';

// Reusable user profile component
const UserProfile = ({ user, size = "large" }) => {
    const avatarSize = size === "large" ? "h-12 w-12" : "h-10 w-10";
    
    return (
        <div className="flex items-center">
            <Avatar className={avatarSize}>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-primary text-white">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
        </div>
    );
};

// Reusable navigation component
const Navigation = ({ items, onItemClick = () => {} }) => {
    const location = useLocation();
    return (
        <nav className="flex-1 px-2 py-4 space-y-1">
            {items.map((item) => (
                <Link
                    key={item.title}
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm rounded-md ${
                        location.pathname === item.path
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={onItemClick}
                >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                </Link>
            ))}
        </nav>
    );
};

// Reusable logout button component
const LogoutButton = ({ onLogout, className = "" }) => (
    <Button
        variant="outline"
        className={`w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 ${className}`}
        onClick={onLogout}
    >
        <LogOut className="h-5 w-5 mr-2" />
        Log out
    </Button>
);

// Desktop sidebar component
const DesktopSidebar = ({ user, logout }: { user: User, logout: () => void }) => (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-10">
        <div className="flex flex-col flex-grow bg-white shadow-md overflow-y-auto">
            <div className="px-4 py-6 border-b">
                <UserProfile user={user} size="large" />
            </div>

            <Navigation items={navItems} />

            <div className="px-3 py-4 border-t">
                <LogoutButton onLogout={logout} />
                {/* <div className="mt-3">
                    <ThemeToggle />
                </div> */}
            </div>
        </div>
    </div>
);

// Mobile sidebar component
const MobileSidebar = ({ user, logout, isOpen, setIsOpen }) => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <div className="flex items-center px-4 py-6 border-b">
                <UserProfile user={user} size="small" />
            </div>

            <Navigation 
                items={navItems} 
                onItemClick={() => setIsOpen(false)} 
            />

            <div className="px-3 py-4 border-t">
                <LogoutButton 
                    onLogout={() => {
                        logout();
                        setIsOpen(false);
                    }} 
                />
            </div>
        </SheetContent>
    </Sheet>
);

// Notifications dropdown component
const NotificationsDropdown = () => (
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
);

const Sidebar = () => {
    const { user, logout } = useAuth();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div>
            {/* Desktop Sidebar */}
            <DesktopSidebar user={user} logout={logout} />

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 inset-x-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b">
                <MobileSidebar 
                    user={user} 
                    logout={logout} 
                    isOpen={isMobileSidebarOpen} 
                    setIsOpen={setIsMobileSidebarOpen} 
                />

                <h1 className="text-lg font-bold">VTULink</h1>
                
                <NotificationsDropdown />
            </div>
        </div>
    )
}

export default Sidebar
