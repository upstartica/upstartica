'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/mentor/Sidebar';
import {
    User,
    Lock,
    Bell,
    Globe,
    Clock,
    HelpCircle,
    Mail,
    FileText,
    Shield,
    ChevronRight,
    LogOut,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import Image from 'next/image';

const SettingsPage = () => {
    const [notificationsData, setNotificationsData] = useState({
        newTask: true,
        deadlines: false,
    });

    const toggleNotification = (key: keyof typeof notificationsData) => {
        setNotificationsData(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-64 p-8 transition-all duration-300">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

                    <div className="space-y-8">

                        {/* Account Section */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Account</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <User size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Profile Information</h3>
                                            <p className="text-sm text-gray-500">Update your photo and personal details</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <Lock size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Password</h3>
                                            <p className="text-sm text-gray-500">Change your password</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </button>
                            </div>
                        </section>

                        {/* Notifications Section */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Notifications</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                            <Bell size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">New Task Notifications</h3>
                                            <p className="text-sm text-gray-500">Receive alerts when new tasks are assigned</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleNotification('newTask')}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center ${notificationsData.newTask ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    >
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${notificationsData.newTask ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Deadline Reminders</h3>
                                            <p className="text-sm text-gray-500">Get notified before tasks are due</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleNotification('deadlines')}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center ${notificationsData.deadlines ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    >
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${notificationsData.deadlines ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Preferences Section */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Preferences</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                            <Globe size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Language</h3>
                                            <p className="text-sm text-gray-500">Choose your preferred language</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                        English
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </div>
                                </button>
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                            <Clock size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Time Zone</h3>
                                            <p className="text-sm text-gray-500">Select your local time zone</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                        (GMT-5:00) Eastern Time (US & Canada)
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* Support Section */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Support</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                                            <HelpCircle size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Help Center</h3>
                                            <p className="text-sm text-gray-500">Get help and support articles</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                                            <Mail size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Contact Us</h3>
                                            <p className="text-sm text-gray-500">Reach out for assistance</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </button>
                            </div>
                        </section>

                        {/* Legal Section */}
                        <section>
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Legal</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                                            <FileText size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Terms of Service</h3>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                                            <Shield size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Privacy Policy</h3>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </button>
                            </div>
                        </section>

                        {/* Logout Button */}
                        <button className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-2xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                            <LogOut size={20} />
                            Log Out
                        </button>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
