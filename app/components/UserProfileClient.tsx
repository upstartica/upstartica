'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export default function UserProfileClient() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/auth/session')
            .then(res => res.json())
            .then(data => {
                if (data?.user) {
                    setUser(data.user);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch session:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center mb-8 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">?</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800">Guest User</h2>
                <p className="text-xs text-gray-500 text-center mt-1 px-4">
                    Please log in to continue
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-orange-400 to-orange-200 mb-4 cursor-pointer relative">
                <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden relative">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || 'User'}
                            fill
                            className="object-cover rounded-full"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    )}
                </div>
            </div>
            <h2 className="text-lg font-bold text-gray-800">
                Good Morning {user.name?.split(' ')[0] || 'User'}
            </h2>
            <p className="text-xs text-gray-500 text-center mt-1 px-4">
                Continue Your Journey And Achieve Your Target
            </p>
        </div>
    );
}
