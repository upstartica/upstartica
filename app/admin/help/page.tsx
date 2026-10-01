'use client';

import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import HelpSearch from '../../components/admin/help/HelpSearch';
import HelpCategories from '../../components/admin/help/HelpCategories';
import FAQSection from '../../components/admin/help/FAQSection';
import ContactSupport from '../../components/admin/help/ContactSupport';

export default function HelpPage() {
    return (
        <div className="flex min-h-screen bg-white">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8 min-w-0">
                <div className="max-w-5xl mx-auto">
                    <HelpSearch />
                    <HelpCategories />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <FAQSection />
                        </div>
                        <div className="lg:col-span-1">
                            {/* Optional Sidebar for recent updates or quick links could go here if needed, keeping it simpler for now by letting Contact span full or be bottom */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
                                <h3 className="font-bold text-blue-800 mb-2">System Status</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-blue-600 font-medium">All systems operational</span>
                                </div>
                                <p className="text-xs text-blue-400">Last updated: Today, 9:00 AM</p>
                            </div>
                        </div>
                    </div>
                    <ContactSupport />
                </div>
            </div>
        </div>
    );
}
