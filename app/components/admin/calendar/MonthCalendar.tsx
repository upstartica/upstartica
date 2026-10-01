'use client';

import React from 'react';

interface MonthCalendarProps {
    monthIndex: number; // 0-11
    year: number;
    workingDays: number;
    nonWorkingDays: number;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ monthIndex, year, workingDays, nonWorkingDays }) => {
    const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });

    // tailored simple calendar logic
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay(); // 0 = Sunday, 1 = Monday...

    // Adjust start day so Monday is 0, Sunday is 6 (standard European/Business calendar)
    // JS getDay(): Su=0, Mo=1, Tu=2, We=3, Th=4, Fr=5, Sa=6
    // Desired: Mo=0, Tu=1, We=2, Th=3, Fr=4, Sa=5, Su=6
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days: (number | null)[] = [];
    // Padding for empty start slots
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];
    days.forEach((day, index) => {
        week.push(day);
        if ((index + 1) % 7 === 0 || index === days.length - 1) {
            weeks.push(week);
            week = [];
        }
    });

    return (
        <div className="flex flex-col">
            <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">{monthName}</h3>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
                    <div key={d} className={`text-center text-[10px] font-medium ${i >= 5 ? 'text-gray-400' : 'text-gray-400'}`}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1">
                {weeks.map((week, wIndex) => (
                    <div key={wIndex} className="grid grid-cols-7 mb-2">
                        {/* Fill potentially missing days in the last week if logic above pushed incomplete week */}
                        {Array.from({ length: 7 }).map((_, dIndex) => {
                            const day = week[dIndex];
                            // Weekend check (indices 5 and 6 in our Monday-start array logic effectively, 
                            // but here we just iterate the week array. 
                            // Need to track global index to know column?). 
                            // EASIER: The grid columns are fixed. 
                            const isWeekend = dIndex >= 5;
                            // Dummy highlighting for demo (e.g. Jan 22)
                            const isSelected = monthIndex === 0 && day === 22;

                            return (
                                <div key={dIndex} className="flex justify-center items-center h-6">
                                    {day ? (
                                        <span
                                            className={`
                                                text-[11px] w-6 h-6 flex items-center justify-center rounded-full
                                                ${isSelected ? 'bg-blue-600 text-white' : ''}
                                                ${!isSelected && isWeekend ? 'text-red-400' : 'text-gray-700'}
                                            `}
                                        >
                                            {day}
                                        </span>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-2 border rounded-md overflow-hidden text-[10px]">
                <div className="flex justify-between px-2 py-1 bg-white border-b border-gray-100">
                    <span className="text-gray-500">Working days:</span>
                    <span className="text-gray-800 font-medium">{workingDays}</span>
                </div>
                <div className="flex justify-between px-2 py-1 bg-white">
                    <span className="text-red-400">Non-working days:</span>
                    <span className="text-red-400 font-medium">{nonWorkingDays}</span>
                </div>
            </div>
        </div>
    );
};

export default MonthCalendar;
