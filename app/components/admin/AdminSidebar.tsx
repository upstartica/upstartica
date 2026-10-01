'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Calendar,
    BookOpen,
    ClipboardList,
    BarChart2,
    HelpCircle,
    Settings,
    LogOut
} from 'lucide-react';
import { handleSignOut } from '@/app/actions/auth';

const AdminSidebar = () => {
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await handleSignOut();
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoggingOut(false);
        }
    };

    const adminItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'People', icon: Users, href: '/admin/people' },
        { name: 'Calendar', icon: Calendar, href: '/admin/calendar' },
        { name: 'Courses', icon: BookOpen, href: '/admin/courses' },
        { name: 'Timesheet', icon: ClipboardList, href: '/admin/timesheet' },
        { name: 'Reports', icon: BarChart2, href: '/admin/reports' },
        { name: 'Help', icon: HelpCircle, href: '/admin/help' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 overflow-y-auto z-50 shadow-sm">
            {/* Logo */}
            <div className="p-8">
                <h1 className="text-2xl font-bold text-[#4F86F7]">
                    Powerpreneurs
                </h1>
            </div>

            {/* Admin Section */}
            <div className="px-6 mb-8">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 px-4">ADMIN</h3>
                <nav className="space-y-1">
                    {adminItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'text-[#FF6B35]'
                                    : 'text-gray-500 hover:text-[#FF6B35] hover:bg-orange-50'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Settings Section */}
            <div className="px-6 pb-8 mt-auto">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 px-4">SETTINGS</h3>
                <div className="space-y-1">
                    <Link
                        href="/admin/settings"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin/settings'
                            ? 'text-[#FF6B35]'
                            : 'text-gray-500 hover:text-[#FF6B35] hover:bg-orange-50'
                            }`}
                    >
                        <Settings size={20} />
                        <span className="font-medium text-sm">Settings</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <LogOut size={20} />
                        <span className="font-medium text-sm">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
