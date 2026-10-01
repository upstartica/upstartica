'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/learner/Sidebar';
import RightSidebar from '../components/learner/RightSidebar';
import AnnouncementsPanel from '../components/learner/AnnouncementsPanel';
import { Play, MoreVertical, Bell, PanelRightOpen, PanelRightClose } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getDashboardData } from '@/app/actions/data';

export default function LearnerDashboard() {
    const [isProfileOpen, setIsProfileOpen] = useState(true);
    const router = useRouter();

    const [dashboardData, setDashboardData] = useState<{
        featuredCourses: string[],
        continueWatching: any[],
        mentors: any[]
    }>({
        featuredCourses: [],
        continueWatching: [],
        mentors: []
    });

    useEffect(() => {
        getDashboardData().then(data => {
            if (data) setDashboardData(data);
        });
    }, []);

    const handleJoinFromAnnouncement = (meetCode: string, password?: string) => {
        // Navigate to room page with pre-filled code
        router.push(`/learner/room?code=${meetCode}${password ? `&password=${password}` : ''}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            {/* Main Content */}
            <main className={`flex-1 ml-64 p-8 transition-all duration-300 ${isProfileOpen ? 'mr-80' : ''}`}>

                {/* Header / Toggle Button */}
                <div className="flex justify-end mb-4">
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

                {/* Banner */}
                <div className="w-full h-64 rounded-3xl bg-gradient-to-r from-[#2c6684] to-[#367c9f] relative overflow-hidden mb-8 shadow-lg shadow-blue-900/10">
                    <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                        {/* Decorative Star/Sparkle pattern would go here via SVG or Image */}
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                        </svg>
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
                        <span className="text-xs font-medium tracking-wider mb-2 opacity-80">ONLINE COURSE</span>
                        <h1 className="text-3xl font-bold mb-6 max-w-lg leading-tight">
                            Sharpen Your Skills With Professional Online Courses
                        </h1>
                        <button className="w-fit bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2">
                            Join Now
                            <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[10px]">
                                <Play size={8} fill="currentColor" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                    {dashboardData.featuredCourses.map((course, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                    <Bell size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">2/8 Watched</p>
                                    <h4 className="text-sm font-bold text-gray-800">{course}</h4>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Continue Watching */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Continue Watching</h3>
                        <div className="flex gap-2">
                            {/* Pagination buttons */}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {dashboardData.continueWatching.map((item, i) => (
                            <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="h-32 bg-gray-200 relative overflow-hidden">
                                    <Image
                                        src="/images/creative-arts-course.png"
                                        alt="Course Thumbnail"
                                        layout="fill"
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {i % 2 === 0 && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 z-10">
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded mb-2">{item.category || 'FRONTEND'}</span>
                                    <h4 className="text-sm font-bold text-gray-800 mb-3 line-clamp-2">
                                        {item.title}
                                    </h4>
                                    {/* Progress Line */}
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-3">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden relative border border-gray-100">
                                            <Image
                                                src="/images/instructor-mark.png"
                                                alt="Instructor"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-700">{item.instructor || 'Aryan'}</p>
                                            <p className="text-[9px] text-gray-400">Software Developer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Announcements Section */}
                <div className="mb-10">
                    <AnnouncementsPanel onJoinMeeting={handleJoinFromAnnouncement} />
                </div>

                {/* Your Mentor Table */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Your Mentor</h3>
                        <button className="text-blue-500 text-sm font-semibold hover:underline">See All</button>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Instructor Name & Date</th>
                                    <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Course Type</th>
                                    <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Course Title</th>
                                    <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.mentors.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-100">
                                                    <Image
                                                        src="/images/instructor-mark.png"
                                                        alt={row.name}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{row.name}</p>
                                                    <p className="text-xs text-gray-400">{row.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">
                                                {row.category || 'FRONTEND'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm text-gray-600 font-medium">{row.course || 'Understanding Concept Of React'}</p>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg hover:bg-blue-100 transition-colors">
                                                SHOW DETAILS
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>

            {isProfileOpen && <RightSidebar />}
        </div>
    );
}
