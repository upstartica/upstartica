'use client';

import React from 'react';
import { Bell, Mail, MessageSquare, MoreVertical, Plus } from 'lucide-react';
import Image from 'next/image';
import UserProfileClient from '../UserProfileClient';

const RightSidebar = () => {
    return (
        <div className="w-80 h-screen bg-white border-l border-gray-100 flex flex-col fixed right-0 top-0 overflow-y-auto z-50 p-6">
            {/* Profile Section */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-700">Your Profile</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                </button>
            </div>

            <UserProfileClient />

            <div className="flex gap-4 mb-8 justify-center">
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                    <Bell size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                    <Mail size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                    <MessageSquare size={18} />
                </button>
            </div>

            {/* Growth Chart */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-700">Your Growth</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={18} />
                    </button>
                </div>

                {/* Custom CSS Chart */}
                <div className="h-48 flex items-end justify-between gap-2 px-2">
                    {[
                        { h: '30%', color: 'from-cyan-400 to-cyan-300' },
                        { h: '50%', color: 'from-orange-400 to-orange-300' },
                        { h: '40%', color: 'from-cyan-400 to-cyan-300' },
                        { h: '70%', color: 'from-orange-400 to-orange-300' },
                        { h: '55%', color: 'from-cyan-400 to-cyan-300' },
                        { h: '80%', color: 'from-orange-400 to-orange-300' },
                    ].map((bar, i) => (
                        <div key={i} className="relative w-full h-full flex items-end group">
                            <div
                                style={{ height: bar.h }}
                                className={`w-full rounded-t-lg bg-gradient-to-t ${bar.color} opacity-80 group-hover:opacity-100 transition-all duration-300`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Your Mentor */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-700">Your Mentor</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                        <Plus size={18} />
                    </button>
                </div>

                <div className="space-y-6">
                    {[
                        { name: 'Aryan', role: 'Software Developer' },
                        { name: 'Krish', role: 'Software Developer' },
                        { name: 'Prateek', role: 'Software Developer' },
                        { name: 'Hitesh', role: 'Software Developer' },
                    ].map((mentor, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-100">
                                    <Image
                                        src="/images/instructor-mark.png"
                                        alt={mentor.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-800">{mentor.name}</h4>
                                    <p className="text-[10px] text-gray-400">{mentor.role}</p>
                                </div>
                            </div>
                            <button className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-medium rounded-full transition-colors">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-8 py-3 bg-orange-50 rounded-xl text-orange-500 text-sm font-bold hover:bg-orange-100 transition-colors">
                    See All
                </button>
            </div>
        </div>
    );
};

export default RightSidebar;
