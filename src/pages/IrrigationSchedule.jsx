import React, { useState } from 'react';
import {
    Calendar, Clock, Droplets, CheckCircle, Sun, CloudRain, Play,
    MoreHorizontal, ArrowRight, Zap, Settings, Bell, ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ════ MOCK DATA: SCHEDULE ════
const SCHEDULE_DATA = [
    {
        id: 1,
        time: '06:00',
        zone: 'Block B (Corn)',
        amount: '8mm',
        status: 'completed', // completed, pending, skipped
        weatherIcon: <Sun size={16} className="text-amber-500" />,
        weatherText: 'Clear 24°C',
        note: 'Routine Morning'
    },
    {
        id: 2,
        time: '16:00',
        zone: 'Block A (Cotton)',
        amount: '15mm',
        status: 'pending',
        isNext: true, // The Hero Item
        weatherIcon: <Sun size={16} className="text-red-500 animate-pulse" />,
        weatherText: 'Scorching 34°C',
        aiNote: 'Adjusted +10% due to heat',
        urgent: true
    },
    {
        id: 3,
        time: 'Tomorrow, 06:00',
        zone: 'Block C (Tomatoes)',
        amount: '10mm',
        status: 'upcoming',
        weatherIcon: <CloudRain size={16} className="text-blue-500" />,
        weatherText: 'Light Rain',
        skipped: true, // AI Suggests skipping
        aiNote: 'AI suggests SKIP due to rain forecast'
    }
];

export default function IrrigationSchedule() {
    const navigate = useNavigate();
    const [automationEnabled, setAutomationEnabled] = useState(false);

    const nextTask = SCHEDULE_DATA.find(t => t.isNext);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 pb-24">

            {/* ════ HEADER ════ */}
            <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-4 flex items-center justify-between shadow-sm">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <div className="font-heading font-bold text-lg text-slate-900">Irrigation Schedule</div>
                <button className="p-2 -mr-2 text-slate-500 hover:bg-slate-50 rounded-full">
                    <Bell size={20} />
                </button>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-6">

                {/* 1. HERO CARD: NEXT ACTION */}
                {nextTask && (
                    <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-green-900/5 border border-slate-100 relative overflow-hidden">
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700">
                                    <Clock size={12} /> Next Watering
                                </span>
                                {nextTask.urgent && (
                                    <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
                                )}
                            </div>

                            <div className="mb-6">
                                <h1 className="text-4xl font-heading font-extrabold text-slate-900 mb-1">
                                    {nextTask.time} <span className="text-lg text-slate-400 font-sans font-medium">(This Afternoon)</span>
                                </h1>
                                <div className="text-lg text-slate-600 font-medium flex items-center gap-2">
                                    <span className="font-bold text-slate-900">{nextTask.zone}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-600">Target: {nextTask.amount}</span>
                                </div>
                            </div>

                            {/* AI Context Badge */}
                            {nextTask.aiNote && (
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6 flex gap-3 items-start">
                                    <Zap size={16} className="text-amber-500 mt-0.5 shrink-0" fill="currentColor" />
                                    <p className="text-xs text-amber-700 font-semibold leading-relaxed">
                                        {nextTask.aiNote}
                                    </p>
                                </div>
                            )}

                            {/* Main Action Button */}
                            <button className="w-full bg-[#86A789] hover:bg-[#759678] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#86A789]/30 flex items-center justify-center gap-2 transition-transform active:scale-95">
                                <Play size={20} fill="currentColor" />
                                Start Now
                            </button>
                        </div>
                    </div>
                )}

                {/* 2. AUTOMATION TOGGLE */}
                <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-5 text-white flex items-center justify-between shadow-lg">
                    <div className="flex gap-3 items-center">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Zap size={20} className="text-[#86A789]" fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white leading-tight">Auto Mode (Aura AI)</h3>
                            <p className="text-xs text-slate-400">Let AI manage the schedule.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={automationEnabled}
                            onChange={() => setAutomationEnabled(!automationEnabled)}
                        />
                        <div className="w-12 h-7 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#86A789]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#86A789]"></div>
                    </label>
                </div>

                {/* 3. WEEKLY TIMELINE */}
                <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 mb-4 px-2">Today & Tomorrow</h3>
                    <div className="relative pl-4 space-y-8">
                        {/* Timeline Line */}
                        <div className="absolute top-2 bottom-2 left-[27px] w-0.5 bg-slate-200 z-0"></div>

                        {SCHEDULE_DATA.map((item) => (
                            <div key={item.id} className={`relative z-10 flex gap-4 ${item.isNext ? 'opacity-50 blur-[1px]' : ''}`}> {/* Blur the hero item in list to emphasize card */}

                                {/* Timeline Node */}
                                <div className={`w-6 h-6 rounded-full border-4 shrink-0 mt-1 z-10 bg-white
                                    ${item.status === 'completed' ? 'border-green-500' :
                                        item.status === 'pending' || item.isNext ? 'border-[#86A789]' :
                                            'border-slate-300'}
                                `}></div>

                                {/* Card Content */}
                                <div className={`flex-1 bg-white rounded-2xl p-4 border shadow-sm
                                    ${item.skipped ? 'border-slate-100 bg-slate-50' : 'border-slate-100'}`}>

                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold text-lg ${item.skipped ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{item.time}</span>
                                            {item.skipped && <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full uppercase">Skipped</span>}
                                        </div>
                                        {item.status === 'completed' && <CheckCircle size={18} className="text-green-500" />}
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="font-semibold text-slate-700 text-sm mb-1">{item.zone}</div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                {item.weatherIcon} {item.weatherText}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-400 font-bold uppercase">Volume</div>
                                            <div className={`font-bold ${item.skipped ? 'text-slate-400' : 'text-[#86A789]'}`}>{item.amount}</div>
                                        </div>
                                    </div>

                                    {item.status === 'completed' && (
                                        <div className="mt-3 pt-3 border-t border-slate-50 text-xs text-slate-400 flex items-center gap-1">
                                            <CheckCircle size={12} /> Finished: 06:15
                                        </div>
                                    )}

                                    {item.aiNote && !item.isNext && ( // Show note for non-hero items
                                        <div className="mt-3 bg-blue-50 text-blue-600 text-xs p-2 rounded-lg font-medium">
                                            {item.aiNote}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
