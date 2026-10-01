'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard,
    MessageSquare,
    Inbox,
    FileText,
    CheckSquare,
    Users,
    Layers,
    Settings,
    LogOut
} from 'lucide-react';
import { handleSignOut } from '@/app/actions/auth';

const Sidebar = () => {
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

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/learner' },
        { name: 'Room', icon: MessageSquare, href: '/learner/room' },
        { name: 'Inbox', icon: Inbox, href: '/learner/inbox' },
        { name: 'Articles', icon: FileText, href: '/learner/articles' },
        { name: 'Task', icon: CheckSquare, href: '/learner/task' },
        { name: 'Community', icon: Users, href: '/learner/community' },
        { name: 'Resources', icon: Layers, href: '/learner/resources' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
            {/* Logo */}
            <div className="p-8">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                    Powerpreneurs
                </h1>
            </div>

            {/* Overview Section */}
            <div className="px-6 mb-8">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Overview</h3>
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'text-orange-500 bg-orange-50'
                                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Friends Section */}
            <div className="px-6 mb-8">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Friends</h3>
                <div className="space-y-4 px-4">
                    {[
                        { name: 'Om', role: 'Software Developer', img: '/images/avatar-1.png' },
                        { name: 'Saraswat', role: 'Product Designer', img: '/images/avatar-2.png' },
                        { name: 'Hitesh', role: 'Product Manager', img: '/images/avatar-3.png' }
                    ].map((friend, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
                                <Image
                                    src="/images/instructor-mark.png"
                                    alt={friend.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-700">{friend.name}</p>
                                <p className="text-[10px] text-gray-400">{friend.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Settings & Logout */}
            <div className="mt-auto px-6 pb-8">
                <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Settings</h3>
                    <Link href="/learner/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors hover:text-orange-500 hover:bg-orange-50">
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

export default Sidebar;
