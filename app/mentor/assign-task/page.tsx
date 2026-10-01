'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/mentor/Sidebar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Target, Edit2, Trash2, X } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    description: string;
    assignTo: string;
    assignType: 'mentee' | 'batch';
    deadline: string;
    status: string;
    createdAt: string;
}

export default function MentorAssignTaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignTo: '',
        assignType: 'mentee' as 'mentee' | 'batch',
        deadline: ''
    });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) {
                console.error('Failed to fetch tasks:', response.status, response.statusText);
                return;
            }
            const data = await response.json();
            console.log('Fetched tasks:', data);
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title || !formData.assignTo || !formData.deadline) {
            alert('Please fill all required fields');
            return;
        }

        try {
            const url = editingTask ? '/api/tasks' : '/api/tasks';
            const method = editingTask ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingTask ? { ...formData, id: editingTask.id } : formData)
            });

            if (response.ok) {
                await fetchTasks();
                resetForm();
                alert(editingTask ? 'Task updated successfully!' : 'Task assigned successfully!');
            }
        } catch (error) {
            console.error('Failed to save task:', error);
            alert('Failed to save task');
        }
    };

    const handleDelete = async (taskId: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            const response = await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });
            if (response.ok) {
                await fetchTasks();
                alert('Task deleted successfully!');
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description,
            assignTo: task.assignTo,
            assignType: task.assignType,
            deadline: task.deadline
        });
        setSelectedDate(new Date(task.deadline));
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            assignTo: '',
            assignType: 'mentee',
            deadline: ''
        });
        setEditingTask(null);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setFormData({ ...formData, deadline: date.toISOString().split('T')[0] });
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="flex min-h-screen bg-gray-50/50 font-sans">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
                            <p className="text-slate-500 text-sm">Assign new work and track deadlines.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 shadow-sm">
                            <CalendarIcon size={18} className="text-blue-600" />
                            <span className="font-medium">{currentMonthYear}</span>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-12 gap-8">

                        {/* Left Column: Create/Edit Task form */}
                        <div className="col-span-12 lg:col-span-5 h-full">
                            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingTask ? 'Edit Task' : 'New Task'}
                                    </h2>
                                    {editingTask && (
                                        <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Task Name *</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. Market Research Phase 1"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
                                        <textarea
                                            rows={6}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Enter detailed task requirements..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Assign Type *</label>
                                        <select 
                                            value={formData.assignType}
                                            onChange={(e) => setFormData({ ...formData, assignType: e.target.value as 'mentee' | 'batch' })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                        >
                                            <option value="mentee">Individual Mentee</option>
                                            <option value="batch">Entire Batch</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
                                            {formData.assignType === 'mentee' ? 'Assign to Mentee *' : 'Assign to Batch *'}
                                        </label>
                                        <select 
                                            value={formData.assignTo}
                                            onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                            required
                                        >
                                            <option value="">Select {formData.assignType === 'mentee' ? 'Mentee' : 'Batch'}</option>
                                            {formData.assignType === 'mentee' ? (
                                                <>
                                                    <option>Ethan Carter</option>
                                                    <option>Olivia Bennett</option>
                                                    <option>Noah Thompson</option>
                                                    <option>Sarah Miller</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option>Batch 1 </option>
                                                    <option>Batch 2</option>
                                                    <option>Batch 3</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Deadline *</label>
                                        <input
                                            type="date"
                                            value={formData.deadline}
                                            onChange={(e) => {
                                                setFormData({ ...formData, deadline: e.target.value });
                                                setSelectedDate(new Date(e.target.value));
                                            }}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                            required
                                        />
                                        {selectedDate && (
                                            <p className="text-xs text-gray-500">
                                                Selected: {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-6 mt-auto flex gap-3">
                                        {editingTask && (
                                            <button 
                                                type="button"
                                                onClick={resetForm}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-all text-sm"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        <button 
                                            type="submit"
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2"
                                        >
                                            <Target size={18} />
                                            {editingTask ? 'Update Task' : 'Assign Task'}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>

                        {/* Right Column: Calendar & Task List */}
                        <div className="col-span-12 lg:col-span-7 space-y-6">

                            {/* Task Calendar */}
                            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold text-gray-900">Task Calendar</h2>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => navigateMonth('prev')}
                                            className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <span className="text-sm font-bold text-gray-700 w-32 text-center">{monthYear}</span>
                                        <button 
                                            onClick={() => navigateMonth('next')}
                                            className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 text-center mb-4">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                        <div key={i} className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}
                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                        const isSelected = selectedDate && 
                                            date.toDateString() === selectedDate.toDateString();
                                        const isToday = date.toDateString() === new Date().toDateString();
                                        
                                        return (
                                            <button
                                                key={day}
                                                onClick={() => handleDateSelect(date)}
                                                className={`aspect-square flex items-center justify-center rounded-xl transition-all font-medium text-sm
                                                    ${isSelected
                                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                        : isToday
                                                        ? 'bg-blue-50 text-blue-600 font-bold'
                                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Assigned Tasks List */}
                            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-900">Assigned Tasks</h2>
                                    <span className="text-xs text-gray-500">{tasks.length} tasks</span>
                                </div>

                                <div className="overflow-x-auto">
                                    {tasks.length === 0 ? (
                                        <div className="p-12 text-center text-gray-400">
                                            <Target size={48} className="mx-auto mb-4 opacity-20" />
                                            <p>No tasks assigned yet</p>
                                        </div>
                                    ) : (
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50/50">
                                                <tr>
                                                    <th className="py-3 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Task</th>
                                                    <th className="py-3 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Assigned To</th>
                                                    <th className="py-3 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Deadline</th>
                                                    <th className="py-3 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {tasks.map((task) => (
                                                    <tr key={task.id} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="py-4 px-6">
                                                            <span className="block text-sm font-semibold text-gray-900">{task.title}</span>
                                                            <span className="text-xs text-gray-500">{task.description?.substring(0, 50)}{task.description?.length > 50 ? '...' : ''}</span>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className="text-xs font-medium text-gray-600">{task.assignTo}</span>
                                                            <span className="block text-[10px] text-gray-400 uppercase">{task.assignType}</span>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center gap-2 text-gray-500">
                                                                <Clock size={14} />
                                                                <span className="text-xs font-medium">
                                                                    {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => handleEdit(task)}
                                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                    title="Edit task"
                                                                >
                                                                    <Edit2 size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(task.id)}
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Delete task"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
