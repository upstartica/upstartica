'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '../../components/mentor/Sidebar';
import CreateMeetModal, { MeetData } from '../../components/learner/CreateMeetModal';
import { Video, Calendar, ArrowRight, Lock, Plus, ExternalLink, Clock, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { meetings } from '@/app/data/meetingsData';

export default function MentorRoomPage() {
    const searchParams = useSearchParams();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [meetCode, setMeetCode] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const code = searchParams.get('code');
        const pass = searchParams.get('password');
        if (code) setMeetCode(code);
        if (pass) setPassword(pass);
    }, [searchParams]);

    const handleCreateMeet = (meetData: MeetData) => {
        console.log('Meeting created:', meetData);
    };

    const handleJoinMeeting = () => {
        if (meetCode) {
            window.open(`https://meet.google.com/${meetCode}`, '_blank');
        }
    };

    const handleQuickJoin = (sessionMeetCode: string) => {
        window.open(`https://meet.google.com/${sessionMeetCode}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-white font-sans flex">
            {/* Sidebar */}
            <Sidebar />

            <main className="flex-1 ml-64 p-10">
                {/* Header with Create Button */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Room</h1>
                            <p className="text-gray-500">Join or create virtual sessions with learners</p>
                        </div>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-[#306c88] hover:bg-[#25546b] text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition-all transform active:scale-95"
                        >
                            <Plus size={20} />
                            Create Meeting
                        </button>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto flex gap-8 items-start">

                    {/* Left Column: Join Session */}
                    <div className="w-1/2 bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563eb] mb-6">
                            <Video size={24} />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Session</h1>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Enter your meeting code to connect with mentors and peers.
                        </p>

                        <div className="space-y-6 text-sm">
                            <div>
                                <label className="block font-bold text-gray-700 text-xs mb-2 uppercase tracking-wider">
                                    Meeting Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="abc-defg-hij"
                                    value={meetCode}
                                    onChange={(e) => setMeetCode(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-mono"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 text-xs mb-2 uppercase tracking-wider">
                                    Password (Optional)
                                </label>
                                <input
                                    type="password"
                                    placeholder="........"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-mono"
                                />
                            </div>

                            <button 
                                onClick={handleJoinMeeting}
                                className="w-full bg-[#306c88] hover:bg-[#25546b] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
                            >
                                <span>Join Meeting</span>
                                <ArrowRight size={18} />
                            </button>

                            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-4">
                                <div className="w-2 h-2 rounded-full border border-gray-400" />
                                <span>End-to-end encrypted connection</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info & Calendar */}
                    <div className="w-1/2 flex flex-col gap-6">

                        {/* Pro Tip Banner */}
                        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h2 className="text-xl font-bold mb-2 relative z-10">Pro Tip</h2>
                            <p className="text-blue-100 text-sm leading-relaxed relative z-10 max-w-sm">
                                Make sure your camera and microphone are configured before joining a live session for the best experience.
                            </p>
                        </div>

                        {/* Upcoming Sessions */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-lg font-bold text-gray-900">Upcoming Sessions</h2>
                                <Link href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                    View Calendar
                                </Link>
                            </div>

                            <div className="space-y-6">
                                {meetings.map((session, i) => (
                                    <div key={i} className="group">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-12 h-14 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-600 font-bold leading-none">
                                                <span className="text-[9px] uppercase tracking-wide opacity-70 mb-0.5">
                                                    {session.scheduledDate?.split(' ')[0]?.substring(0, 3)}
                                                </span>
                                                <span className="text-lg">
                                                    {session.scheduledDate?.split(' ')[1]?.replace(',', '')}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate group-hover:text-blue-700 transition-colors">
                                                    {session.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                    <span>{session.scheduledTime}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span>{session.attendees} Joining</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-gray-200 text-blue-600">
                                                        {session.meetCode}
                                                    </code>
                                                    {session.password && (
                                                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                            <Shield size={10} />
                                                            Protected
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleQuickJoin(session.meetCode)}
                                                className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center gap-1"
                                            >
                                                Join
                                                <ExternalLink size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Create Meeting Modal */}
            <CreateMeetModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateMeet={handleCreateMeet}
            />
        </div>
    );
}
