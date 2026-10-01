'use client';

import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import CompanyFactsChart from '../components/admin/dashboard/CompanyFactsChart';
import CompanyFactsBarChart from '../components/admin/dashboard/CompanyFactsBarChart';
import ProjectsByAccountChart from '../components/admin/dashboard/ProjectsByAccountChart';
import RegionDistributionChart from '../components/admin/dashboard/RegionDistributionChart';
import CompletionChart from '../components/admin/dashboard/CompletionChart';
import UserActivityChart from '../components/admin/dashboard/UserActivityChart';

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8">
                <div className="flex justify-end mb-8">
                    <button className="bg-[#22C55E] hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
                        + Add widget
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Top Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 h-[350px]">
                            <CompanyFactsChart />
                        </div>
                        <div className="lg:col-span-1 h-[350px]">
                            <ProjectsByAccountChart />
                        </div>
                        <div className="lg:col-span-1 h-[350px]">
                            <RegionDistributionChart />
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 h-[350px]">
                            <CompanyFactsBarChart />
                        </div>
                        <div className="lg:col-span-1 h-[350px]">
                            <UserActivityChart />
                        </div>
                        <div className="lg:col-span-1 h-[350px]">
                            <CompletionChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
