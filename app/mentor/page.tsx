'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/mentor/Sidebar';
import RightSidebar from '../components/mentor/RightSidebar';
import AnnouncementsPanel from '../components/mentor/AnnouncementsPanel';
import CandidatesAttendanceChart from '../components/mentor/CandidatesAttendanceChart';
import TopPerformersChart from '../components/mentor/TopPerformersChart';
import { PanelRightOpen, PanelRightClose, MoreHorizontal, Filter } from 'lucide-react';
import Image from 'next/image';

export default function MentorDashboard() {
    const [isProfileOpen, setIsProfileOpen] = useState(true);
    const router = useRouter();

    const handleJoinFromAnnouncement = (meetCode: string, password?: string) => {
        router.push(`/mentor/room?code=${meetCode}${password ? `&password=${password}` : ''}`);
    };

    const handleCreateAnnouncement = () => {
        router.push('/mentor/room');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <Sidebar />

            {/* Main Content */}
            <main className={`flex-1 ml-64 p-8 transition-all duration-300 ${isProfileOpen ? 'mr-80' : ''}`}>

                {/* Top Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="text-xs font-medium">Filter stats</span>
                            <Filter size={16} />
                        </div>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-100 hover:text-[#2c6684] hover:bg-blue-50 transition-colors text-sm font-medium"
                        >
                            {isProfileOpen ? (
                                <>
                                    <span>Hide Profile</span>
                                    <PanelRightClose size={18} />
                                </>
                            ) : (
                                <>
                                    <span>View Profile</span>
                                    <PanelRightOpen size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Welcome Banner */}
                <div className="w-full h-40 rounded-3xl bg-[#2c6684] relative overflow-hidden mb-8 shadow-lg shadow-blue-900/10 p-8 flex flex-col justify-center">
                    {/* Background decor */}
                    <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                        </svg>
                    </div>

                    <div className="relative z-10 text-white">
                        <p className="text-[10px] font-medium tracking-wide uppercase opacity-90 mb-2">
                            YOU HAVE 27 NEW STUDENT ADDED TO YOUR DOMAIN. PLEASE REACH OUT TO THE ADMIN IF YOU WANT THEM EXCLUDED FROM YOUR DOMAIN.
                        </p>
                        <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>

                        <button className="bg-gray-900 hover:bg-black text-white text-xs px-4 py-1.5 rounded-full flex items-center gap-2 w-fit">
                            Join
                            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-[8px]">›</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-8">

                    {/* Candidates Attendance (Line Chart) */}
                    <div className="col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-700">Candidates attendance</h3>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <div><span className="text-gray-400 mr-1">from</span> August 2025</div>
                                <div><span className="text-gray-400 mr-1">to</span> May 2025</div>
                            </div>
                        </div>

                        {/* Chart Component */}
                        <div className="h-64 w-full mt-4">
                            <CandidatesAttendanceChart />
                        </div>
                    </div>

                    {/* Top Performers (Bar Chart) */}
                    <div className="col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="text-lg font-bold text-gray-700 leading-tight">Top <br /> performers</h3>
                            </div>
                            <div className="text-right text-[10px] text-gray-400">
                                September <br /> 2019
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-1 w-full min-h-[200px]">
                            <TopPerformersChart />
                        </div>

                        {/* Legend / List */}
                        <div className="mt-4 space-y-2">
                            {[
                                { city: 'Copenhagen, Denmark', pct: '81.57%', color: 'border-blue-600' },
                                { city: 'Berlin, Germany', pct: '63.25%', color: 'border-purple-500' },
                                { city: 'Belgrade, Serbia', pct: '52.95%', color: 'border-yellow-400' },
                                { city: 'Paris, France', pct: '47.29%', color: 'border-green-500' },
                            ].map((loc, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px]">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full border-2 bg-white ${loc.color}`} />
                                        <span className="text-gray-500 font-medium">{loc.city}</span>
                                    </div>
                                    <span className="font-bold text-gray-700">{loc.pct}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentor Stat (Row 2, Left) */}
                    <div className="col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-700">Mentor Stat</h3>
                            <button className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-lg">for <span className="text-gray-700 ml-1">August 2019</span></button>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-100">
                                <Image
                                    src="/images/instructor-mark.png"
                                    alt="Mentor"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-800">Elliot Mller</h4>
                                        <p className="text-[10px] text-gray-400">Copenhagen, Denmark</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative pt-2">
                                    <div className="flex justify-between text-[10px] font-bold text-gray-600 mb-1">
                                        <span>Professional Level 15</span>
                                        <span>4723 Points</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-3/5 h-full bg-emerald-400 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Announcements Section */}
                    <div className="col-span-12 mt-8">
                        <AnnouncementsPanel 
                            onJoinMeeting={handleJoinFromAnnouncement}
                            onCreateAnnouncement={handleCreateAnnouncement}
                        />
                    </div>

                </div>

            </main>

            {isProfileOpen && <RightSidebar />}
        </div>
    );
}
