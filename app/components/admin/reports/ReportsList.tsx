'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const ReportLink = ({ label }: { label: string }) => (
    <div className="flex items-center justify-between py-1.5 cursor-pointer group">
        <span className="text-gray-600 text-sm group-hover:text-blue-500 transition-colors">{label}</span>
        <ArrowRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
);

const ReportsList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-12">

            {/* Public Reports Column */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-6">Public reports</h2>

                <div className="font-semibold text-xs text-gray-800 mb-3">Full list of reports</div>
                <ReportLink label="Full list of reports" />

                <div className="font-semibold text-xs text-gray-800 mt-6 mb-3">Calendar reports</div>
                <ReportLink label="Company calendar" />
                <ReportLink label="Working days count" />
                <ReportLink label="Vacation report" />

                <div className="font-semibold text-xs text-gray-800 mt-6 mb-3">Consultancy reports</div>
                <ReportLink label="Project registry" />
                <ReportLink label="Active account and projects" />
                <ReportLink label="People and assignments" />
                <ReportLink label="People grades" />

                <div className="font-semibold text-xs text-gray-800 mt-6 mb-3">Employee capability profile</div>
                <ReportLink label="Capability profiles - status" />
            </div>

            {/* Restricted Reports Column */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-6">Restricted reports</h2>

                <div className="font-semibold text-xs text-gray-800 mb-3">Full list of reports</div>
                <ReportLink label="Full list of reports" />

                <div className="font-semibold text-xs text-gray-800 mt-6 mb-3">Time reports</div>
                <ReportLink label="Detailed timesheet" />
                <ReportLink label="Hours approved" />
                <ReportLink label="Lost hours" />

                <div className="font-semibold text-xs text-gray-800 mt-6 mb-3">Consultancy cost & expense reports</div>
                <ReportLink label="Consultancy costs and expenses" />
                <ReportLink label="Consultancy expenses" />

                <div className="font-semibold text-xs text-gray-800 mt-6 mb-3">Allocation and forecast reports</div>
                <ReportLink label="Staff allocation" />
                <ReportLink label="Resource forecast" />
            </div>
        </div>
    );
};

export default ReportsList;
