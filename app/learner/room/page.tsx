'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '../../components/learner/Sidebar';
import { Calendar, Clock, Users, Video, ArrowRight, Shield, Plus, ExternalLink } from 'lucide-react';
import { getMeetingsData } from '@/app/actions/data';

const RoomPage = () => {
    const searchParams = useSearchParams();
    const [meetCode, setMeetCode] = useState('');
    const [password, setPassword] = useState('');
    const [meetings, setMeetings] = useState<any[]>([]);

    useEffect(() => {
        getMeetingsData().then(data => {
            if (data) setMeetings(data);
        });

        // Pre-fill from URL parameters
        const code = searchParams.get('code');
        const pass = searchParams.get('password');
        if (code) setMeetCode(code);
        if (pass) setPassword(pass);
    }, [searchParams]);


    const handleJoinMeeting = (code?: string, pass?: string) => {
        if (code) {
            window.open(`https://meet.google.com/${code}`, '_blank');
        } else if (meetCode) {
            window.open(`https://meet.google.com/${meetCode}`, '_blank');
        }
    };

    const handleQuickJoin = (sessionMeetCode: string) => {
        window.open(`https://meet.google.com/${sessionMeetCode}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8 bg-gray-50/50 min-h-screen">
                {/* Header with Create Button */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Room</h1>
                            <p className="text-gray-500">Join virtual sessions</p>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Join Meeting */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                <Video size={24} />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Session</h1>
                            <p className="text-gray-500 mb-8">Enter your meeting code to connect with mentors and peers.</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Meeting Code</label>
                                    <input
                                        type="text"
                                        placeholder="abc-defg-hij"
                                        value={meetCode}
                                        onChange={(e) => setMeetCode(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-gray-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Password (Optional)</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-gray-800"
                                    />
                                </div>

                                <button
                                    onClick={() => handleJoinMeeting()}
                                    className="w-full bg-[#367c9f] hover:bg-[#2c6684] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
                                >
                                    Join Meeting
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-xs text-gray-400 justify-center">
                                <Shield size={12} />
                                <span>End-to-end encrypted connection</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Upcoming & Graphic */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Decorative / Info Card */}
                        <div className="bg-[#1e293b] rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2">Pro Tip</h3>
                                <p className="text-blue-200 text-sm max-w-sm">
                                    Make sure your camera and microphone are configured before joining a live session for the best experience.
                                </p>
                            </div>
                            {/* Abstract Shapes */}
                            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute left-0 bottom-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                        </div>

                        {/* Schedule */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900 text-lg">Upcoming Sessions</h3>
                                <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">View Calendar</button>
                            </div>

                            <div className="space-y-4">
                                {meetings.map((session, i) => (
                                    <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                                        <div className="w-14 h-14 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-700 font-bold shrink-0">
                                            <span className="text-xs uppercase">{session.scheduledDate?.split(' ')[0]?.substring(0, 3)}</span>
                                            <span className="text-lg leading-none">{session.scheduledDate?.split(' ')[1]?.replace(',', '')}</span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">{session.title}</h4>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {session.scheduledTime}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={12} />
                                                    {session.attendees} Joining
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <code className="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-200 text-blue-600">
                                                    {session.meetCode}
                                                </code>
                                                {session.password && (
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Shield size={10} />
                                                        Protected
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleQuickJoin(session.meetCode)}
                                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center gap-1"
                                        >
                                            Join
                                            <ExternalLink size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    );
};

export default RoomPage;
