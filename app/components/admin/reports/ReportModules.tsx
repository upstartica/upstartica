'use client';

import React from 'react';
import { MessageSquare, User, Bookmark } from 'lucide-react';

interface ReportModulesProps {
    activeModule: string;
    setActiveModule: (module: string) => void;
}

const ReportModules = ({ activeModule, setActiveModule }: ReportModulesProps) => {

    const getCardStyle = (moduleName: string) => {
        const isActive = activeModule === moduleName;
        return `w-48 h-32 rounded-xl flex flex-col items-center justify-center cursor-pointer shadow-sm shrink-0 transition-all ${isActive
                ? 'bg-[#3B82F6] scale-105'
                : 'bg-white hover:bg-gray-50 border border-transparent hover:border-gray-200'
            }`;
    };

    const getIconContainerStyle = (moduleName: string) => {
        const isActive = activeModule === moduleName;
        return isActive ? 'bg-white/20 p-3 rounded-lg mb-3' : 'p-3 mb-3';
    };

    const getIconColor = (moduleName: string) => {
        return activeModule === moduleName ? 'text-white' : 'text-gray-400';
    };

    const getTextColor = (moduleName: string) => {
        return activeModule === moduleName ? 'text-white text-sm' : 'text-gray-800 text-xs';
    };

    return (
        <div className="flex gap-8 mb-16 overflow-x-auto pb-4">
            {/* Mentor Report */}
            <div
                onClick={() => setActiveModule('mentor')}
                className={getCardStyle('mentor')}
            >
                <div className={getIconContainerStyle('mentor')}>
                    <MessageSquare className={`${getIconColor('mentor')} w-8 h-8`} />
                </div>
                <span className={`${getTextColor('mentor')} font-bold`}>Mentor Report</span>
            </div>

            {/* User by role */}
            <div
                onClick={() => setActiveModule('user')}
                className={getCardStyle('user')}
            >
                <div className={getIconContainerStyle('user')}>
                    <User className={`${getIconColor('user')} w-10 h-10`} />
                </div>
                <span className={`${getTextColor('user')} font-bold`}>User report</span>
            </div>

            {/* Bookkeeping report */}
            <div
                onClick={() => setActiveModule('bookkeeping')}
                className={getCardStyle('bookkeeping')}
            >
                <div className={getIconContainerStyle('bookkeeping')}>
                    <Bookmark className={`${getIconColor('bookkeeping')} w-10 h-10`} />
                </div>
                <span className={`${getTextColor('bookkeeping')} font-bold`}>Bookkeeping report</span>
            </div>
        </div>
    );
};

export default ReportModules;
