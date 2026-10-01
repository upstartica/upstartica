'use client';
import { Users, Calendar, FileText, ClipboardList, Briefcase, Settings } from 'lucide-react';

const categories = [
    { title: 'People Management', icon: Users, desc: 'Adding users, assigning roles, and managing profiles.' },
    { title: 'Calendar & Events', icon: Calendar, desc: 'Scheduling events, holidays, and company timeline.' },
    { title: 'Project Tracking', icon: Briefcase, desc: 'Project creation, assignment, and status updates.' },
    { title: 'Courses & exams', icon: ClipboardList, desc: 'Managing courses, quizzes, and registrations.' },
    { title: 'Reports & Analytics', icon: FileText, desc: 'Generating capability, timesheet, and financial reports.' },
    { title: 'Account Settings', icon: Settings, desc: 'Password reset, notification preferences, and security.' },
];

export default function HelpCategories() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((cat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <cat.icon size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{cat.title}</h3>
                    <p className="text-sm text-gray-500">{cat.desc}</p>
                </div>
            ))}
        </div>
    );
}
