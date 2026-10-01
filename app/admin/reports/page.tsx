'use client';

import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ReportsList from '../../components/admin/reports/ReportsList';
import ReportModules from '../../components/admin/reports/ReportModules';
import ReportsFilter from '../../components/admin/reports/ReportsFilter';

export default function ReportsPage() {
    const [activeModule, setActiveModule] = React.useState('bookkeeping');

    return (
        <div className="flex min-h-screen bg-white">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8 min-w-0">
                <ReportModules activeModule={activeModule} setActiveModule={setActiveModule} />
                <ReportsFilter activeModule={activeModule} />
                <div className="my-12"></div>
                <ReportsList />
            </div>
        </div>
    );
}
