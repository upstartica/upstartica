'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import PeopleFilter from '../../components/admin/people/PeopleFilter';
import AllPeopleView from '../../components/admin/people/AllPeopleView';
import { Search, Users } from 'lucide-react';

export default function PeoplePage() {
    const [activeTab, setActiveTab] = useState<'find' | 'all'>('find');

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8 min-w-0">

                {/* Top Tabs */}
                <div className="flex items-center gap-12 mb-8 ml-4">
                    {/* Find Person Tab */}
                    <div
                        className={`flex flex-col items-center gap-2 cursor-pointer group transition-opacity ${activeTab === 'find' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        onClick={() => setActiveTab('find')}
                    >
                        <div className={`w-[180px] h-[100px] rounded-xl flex flex-col items-center justify-center transition-all ${activeTab === 'find' ? 'bg-[#3B82F6] shadow-lg scale-105' : 'bg-transparent'}`}>
                            <Search className={`w-8 h-8 mb-2 ${activeTab === 'find' ? 'text-white' : 'text-gray-600'}`} />
                            <span className={`font-bold text-sm ${activeTab === 'find' ? 'text-white' : 'text-gray-800'}`}>Find person</span>
                        </div>
                    </div>

                    {/* All People Tab */}
                    <div
                        className={`flex flex-col items-center gap-2 cursor-pointer group transition-opacity ${activeTab === 'all' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        onClick={() => setActiveTab('all')}
                    >
                        <div className={`w-[180px] h-[100px] rounded-xl flex flex-col items-center justify-center transition-all ${activeTab === 'all' ? 'bg-[#3B82F6] shadow-lg scale-105' : 'bg-transparent'}`}>
                            <Users className={`w-8 h-8 mb-2 ${activeTab === 'all' ? 'text-white' : 'text-gray-600'}`} />
                            <span className={`font-bold text-sm ${activeTab === 'all' ? 'text-white' : 'text-gray-800'}`}>All people</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'find' ? <PeopleFilter /> : <AllPeopleView />}
            </div>
        </div>
    );
}
