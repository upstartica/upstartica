'use client';

import React, { useState } from 'react';
import { X, Video, Calendar, Clock, Users, Lock, Copy, Check } from 'lucide-react';

interface CreateMeetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMeet: (meetData: MeetData) => void;
}

export interface MeetData {
  title: string;
  date: string;
  time: string;
  duration: string;
  password?: string;
  description?: string;
}

const CreateMeetModal: React.FC<CreateMeetModalProps> = ({ isOpen, onClose, onCreateMeet }) => {
  const [formData, setFormData] = useState<MeetData>({
    title: '',
    date: '',
    time: '',
    duration: '60',
    password: '',
    description: ''
  });
  const [copied, setCopied] = useState(false);
  const [meetCreated, setMeetCreated] = useState(false);
  const [generatedMeetCode, setGeneratedMeetCode] = useState('');

  const generateMeetCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const part1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const part3 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${part1}-${part2}-${part3}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meetCode = generateMeetCode();
    setGeneratedMeetCode(meetCode);
    setMeetCreated(true);
    onCreateMeet(formData);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedMeetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://meet.google.com/${generatedMeetCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setMeetCreated(false);
    setGeneratedMeetCode('');
    setFormData({
      title: '',
      date: '',
      time: '',
      duration: '60',
      password: '',
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Video size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {meetCreated ? 'Meeting Created!' : 'Create Google Meet Session'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!meetCreated ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Session Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced React Workshop"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock size={16} className="inline mr-1" />
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock size={16} className="inline mr-1" />
                  Password (Optional)
                </label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Leave empty for no password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add session details..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#367c9f] hover:bg-[#2c6684] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform active:scale-95"
              >
                Create Meeting
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="text-green-600" size={24} />
                </div>
                <p className="text-green-800 font-semibold">
                  Your meeting has been created successfully!
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Meeting Code
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg font-mono text-lg font-bold text-blue-600">
                      {generatedMeetCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Meeting Link
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`https://meet.google.com/${generatedMeetCode}`}
                      className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                {formData.password && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <code className="block px-4 py-3 bg-white border border-gray-200 rounded-lg font-mono text-sm font-bold text-gray-700">
                      {formData.password}
                    </code>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-2">{formData.title}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📅 {formData.date}</p>
                  <p>🕐 {formData.time}</p>
                  <p>⏱️ {formData.duration} minutes</p>
                  {formData.description && <p className="mt-2">{formData.description}</p>}
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMeetModal;
