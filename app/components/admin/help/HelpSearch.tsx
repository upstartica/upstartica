'use client';
import { Search } from 'lucide-react';

export default function HelpSearch() {
    return (
        <div className="bg-[#3B82F6] rounded-2xl p-8 mb-12 text-center text-white relative overflow-hidden">
            <h1 className="text-3xl font-bold mb-4 relative z-10">How can we help you?</h1>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
                Search our knowledge base for answers to common questions about managing users, projects, and reports.
            </p>

            <div className="relative max-w-2xl mx-auto z-10">
                <input
                    type="text"
                    placeholder="Search for articles, guides, or troubleshooting..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-4 focus:ring-blue-400/30 shadow-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>

            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
        </div>
    );
}
