import React from 'react';
import {
    Droplets, CloudRain, Sun, Calendar, Activity, Sprout, Timer, Wind,
    TrendingUp, Award, Zap, ChevronRight, AlertCircle, Bot,
    Satellite, Thermometer, Waves, Globe, BookOpen
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';

// ════ MOCK DATA: MY WATER USAGE vs STANDARD ════
const WATER_USAGE_DATA = [
    { day: 'Mon', myUsage: 12, standard: 18 },
    { day: 'Tue', myUsage: 14, standard: 20 },
    { day: 'Wed', myUsage: 10, standard: 18 },
    { day: 'Thu', myUsage: 15, standard: 22 }, // Peak
    { day: 'Fri', myUsage: 13, standard: 19 },
    { day: 'Sat', myUsage: 11, standard: 17 },
    { day: 'Sun', myUsage: 12, standard: 18 },
];

export default function UnifiedDashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 pb-24">

            {/* ════ HEADER ════ */}
            <header className="flex justify-between items-center mb-8 pt-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A1A1A]">
                        Hello, Yannis! 👋
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Larissa, Thessaly • <span className="text-[#86A789] font-bold">Cotton Field (Block A)</span>
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#86A789] overflow-hidden border border-slate-200 shadow-sm">
                    <img src="https://ui-avatars.com/api/?name=Yannis+P&background=86A789&color=fff" alt="Profile" />
                </div>
            </header>

            {/* ════ 1. HERO: THE DECISION CARD (Refined) ════ */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-green-900/5 border border-slate-100 relative overflow-hidden mb-6">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center">

                        {/* Status & Recommendation */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-100">
                                    <AlertCircle size={14} /> Attention
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                                    <Satellite size={12} className="text-blue-500" /> Source: Copernicus Sentinel-2 & Sensors
                                </div>
                            </div>

                            <div>
                                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight mb-2">
                                    Irrigation <br /><span className="text-amber-500">Needed</span> Today
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed">
                                    Soil moisture dropped to <span className="font-bold text-slate-900">38%</span>. Crop in <span className="font-bold text-[#86A789]">Flowering Phase (Day 45)</span> requires stable water levels.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-xs text-slate-400 font-bold uppercase">Recommendation</div>
                                    <div className="text-xl font-bold text-slate-900">15mm</div>
                                </div>
                                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-xs text-slate-400 font-bold uppercase">Pump Duration</div>
                                    <div className="text-xl font-bold text-slate-900">~2 Hours</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="w-full md:w-auto flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/app/schedule')}
                                className="w-full md:w-64 bg-[#86A789] hover:bg-[#759678] text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-[#86A789]/30 flex items-center justify-center gap-3 transition-transform active:scale-95 group"
                            >
                                <Droplets size={24} className="group-hover:animate-bounce" /> Start Irrigation Now
                            </button>
                            <div className="text-center text-xs text-slate-400 font-medium">
                                Automatically scheduled by RIGA AI
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ════ 2. LIVE TELEMETRY GRID (New System) ════ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                {/* 2.1 Satellite Data */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-colors">
                    <div className="absolute top-2 right-2 text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold">10m ago</div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <Satellite size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase">NDVI Health</span>
                    </div>
                    <div>
                        <div className="text-2xl font-extrabold text-slate-900">0.78</div>
                        <div className="text-xs text-indigo-600 font-bold">Excellent Condition</div>
                    </div>
                </div>

                {/* 2.2 Soil Physics */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-orange-100 transition-colors">
                    <div className="absolute top-2 right-2 text-[10px] bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded font-bold">Real-time</div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                            <Thermometer size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Soil Temp & pH</span>
                    </div>
                    <div>
                        <div className="text-2xl font-extrabold text-slate-900">24°C</div>
                        <div className="text-xs text-slate-500 font-bold">pH 6.5 (Optimal)</div>
                    </div>
                </div>

                {/* 2.3 Water Loss Rate */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
                    <div className="absolute top-2 right-2 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">High</div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                            <Waves size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Evapotranspiration</span>
                    </div>
                    <div>
                        <div className="text-2xl font-extrabold text-slate-900">4.2 <span className="text-sm text-slate-400">mm/d</span></div>
                        <div className="text-xs text-blue-500 font-bold">Water Loss Rate</div>
                    </div>
                </div>

                {/* 2.4 Wind Speed */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-colors">
                    <div className="absolute top-2 right-2 text-[10px] bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded font-bold">Live</div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <Wind size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Wind Speed</span>
                    </div>
                    <div>
                        <div className="text-2xl font-extrabold text-slate-900">12 <span className="text-sm text-slate-400">km/h</span></div>
                        <div className="text-xs text-slate-500 font-bold">Direction: NE ↗</div>
                    </div>
                </div>
            </div>

            {/* ════ 3. KEY METRICS: MY FARM STATS (Condensed) ════ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Card 1: Water Saved */}
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                    <div className="text-xs font-bold text-emerald-600 uppercase mb-1">Water Saved</div>
                    <div className="text-xl font-extrabold text-slate-900">45k L</div>
                    <div className="text-[10px] text-emerald-600/70 font-bold">This Season</div>
                </div>
                {/* Card 2: Next Rain */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                    <div className="text-xs font-bold text-blue-600 uppercase mb-1">Next Rain</div>
                    <div className="text-xl font-extrabold text-slate-900">2 Days</div>
                    <div className="text-[10px] text-blue-600/70 font-bold">Prepare Trenches</div>
                </div>
                {/* Card 3: Land Health */}
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
                    <div className="text-xs font-bold text-amber-600 uppercase mb-1">Moisture</div>
                    <div className="text-xl font-extrabold text-slate-900">Low</div>
                    <div className="text-[10px] text-amber-600/70 font-bold">Needs Attention</div>
                </div>
                {/* Card 4: Rewards */}
                <div onClick={() => navigate('/app/rewards')} className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between cursor-pointer hover:bg-purple-100 transition-colors">
                    <div className="text-xs font-bold text-purple-600 uppercase mb-1">Points</div>
                    <div className="text-xl font-extrabold text-slate-900">1,250</div>
                    <div className="text-[10px] text-purple-600/70 font-bold flex items-center gap-1">Redeem <ChevronRight size={10} /></div>
                </div>
            </div>

            {/* ════ 4. EFFICIENCY CHART ════ */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 mb-20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">Water Usage Efficiency</h3>
                        <p className="text-slate-500 text-sm">
                            You used <span className="text-green-600 font-bold">30% less water</span> compared to regional standard.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-slate-300"></span> Standard
                        </div>
                        <div className="flex items-center gap-1.5 text-[#86A789]">
                            <span className="w-3 h-3 rounded-full bg-[#86A789]"></span> My Usage
                        </div>
                    </div>
                </div>

                <div className="h-[250px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={WATER_USAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                labelStyle={{ color: '#64748B', marginBottom: '0.5rem' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="standard"
                                name="Standard"
                                stroke="#CBD5E1"
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="myUsage"
                                name="My Usage"
                                stroke="#86A789"
                                strokeWidth={4}
                                dot={{ r: 4, fill: '#86A789', strokeWidth: 0 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ════ 5. RIGA AI WIDGET (Fixed Bottom) ════ */}
            <div className="fixed bottom-4 left-4 right-4 md:left-[280px] md:right-8 z-30">
                <div
                    onClick={() => navigate('/app/riga')}
                    className="bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 cursor-pointer hover:bg-slate-800 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#86A789] to-emerald-400 flex items-center justify-center shrink-0 animate-pulse">
                        <Bot size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#86A789] uppercase tracking-wider mb-0.5">RIGA Intelligence</div>
                        <p className="text-sm font-medium truncate">
                            "Please take a photo of your field conditions now."
                        </p>
                    </div>
                    <ChevronRight size={20} className="text-slate-400" />
                </div>
            </div>

        </div>
    );
}
