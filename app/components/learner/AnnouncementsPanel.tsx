'use client';

import React from 'react';
import { Bell, Video, Lock, ExternalLink } from 'lucide-react';
import { announcements } from '@/app/data/meetingsData';

interface AnnouncementsPanelProps {
  onJoinMeeting?: (meetCode: string, password?: string) => void;
}

const AnnouncementsPanel: React.FC<AnnouncementsPanelProps> = ({ onJoinMeeting }) => {
  const handleJoinClick = (meetCode?: string, password?: string, meetLink?: string) => {
    if (meetLink) {
      window.open(meetLink, '_blank');
    } else if (meetCode && onJoinMeeting) {
      onJoinMeeting(meetCode, password);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-gray-800">Announcements</h3>
        </div>
        <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`p-4 rounded-xl border transition-all ${
              announcement.type === 'meeting'
                ? 'bg-blue-50 border-blue-100'
                : announcement.type === 'urgent'
                ? 'bg-red-50 border-red-100'
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-gray-900 text-sm">{announcement.title}</h4>
              {announcement.type === 'meeting' && (
                <Video className="text-blue-600 shrink-0" size={16} />
              )}
            </div>
            
            <p className="text-xs text-gray-600 mb-3">{announcement.message}</p>
            
            {announcement.meetCode && (
              <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">Meeting Code</span>
                  {announcement.meetPassword && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Lock size={12} />
                      <span>Protected</span>
                    </div>
                  )}
                </div>
                <code className="text-sm font-mono font-bold text-blue-600">
                  {announcement.meetCode}
                </code>
                {announcement.meetPassword && (
                  <div className="mt-2">
                    <span className="text-xs font-semibold text-gray-500">Password: </span>
                    <code className="text-sm font-mono font-bold text-gray-700">
                      {announcement.meetPassword}
                    </code>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-400">
                <span className="font-medium">{announcement.author}</span> • {announcement.date}
              </div>
              
              {announcement.meetCode && (
                <button
                  onClick={() => handleJoinClick(
                    announcement.meetCode,
                    announcement.meetPassword,
                    announcement.meetLink
                  )}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Join Now
                  <ExternalLink size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPanel;
