import React from 'react';
import {
    TrendingUp, Zap, Droplet, DollarSign, Award, ChevronLeft,
    BarChart3, Leaf, Sprout, ArrowDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// ════ MOCK DATA: COST COMPARISON ════
const COST_DATA = [
    { name: 'Water & Pump', konvensional: 120, irigai: 72 }, // 40% saving
    { name: 'Labor', konvensional: 80, irigai: 50 },  // Automation saving
    { name: 'Fertilizer', konvensional: 60, irigai: 51 }, // 15% saving
];

export default function ResourceEfficiency() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 pb-24">

            {/* ════ HEADER ════ */}
            <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-4 flex items-center justify-between shadow-sm">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <div className="font-heading font-bold text-lg text-slate-900">ROI & Efficiency</div>
                    <div className="text-xs text-slate-500 font-medium">Planting Season 2026</div>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-6">

                {/* 1. HERO SECTION: TOTAL SAVINGS */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-green-900/5 border border-slate-100 relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-[#86A789]"></div>

                    <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4 ring-8 ring-green-50/50">
                        <DollarSign size={32} className="text-green-600" />
                    </div>

                    <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Total Savings This Season</h2>
                    <div className="text-5xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">
                        € 450.00
                    </div>

                    {/* Savings Breakdown Badges */}
                    <div className="flex justify-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                            <Droplet size={12} fill="currentColor" /> Water -30%
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                            <Zap size={12} fill="currentColor" /> Energy -20%
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <Leaf size={12} fill="currentColor" /> Fertilizer -15%
                        </span>
                    </div>
                </div>

                {/* 2. CHART: CAPEX/OPEX KILLER */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <BarChart3 size={20} className="text-slate-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 leading-tight">Operational Cost / Ha</h3>
                            <p className="text-xs text-slate-500">Conventional vs IRIGAI (Save 40%)</p>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={COST_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={6}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="konvensional" name="Conventional" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="irigai" name="IRIGAI" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. PUMP & ENERGY EFFICIENCY GRID */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Pump Runtime */}
                    <div className="bg-[#FFFBF0] p-5 rounded-2xl border border-amber-100 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Zap size={48} />
                        </div>
                        <div className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">Pump<br />Runtime</div>
                        <div>
                            <div className="text-3xl font-extrabold text-slate-900">12 <span className="text-sm">Hours</span></div>
                            <div className="text-xs text-slate-500 font-medium mt-1">
                                <span className="text-green-600 font-bold">Save 6 Hrs</span> vs Avg
                            </div>
                        </div>
                    </div>

                    {/* Water Volume */}
                    <div className="bg-[#EFF6FF] p-5 rounded-2xl border border-blue-100 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Droplet size={48} />
                        </div>
                        <div className="text-blue-800 font-bold text-xs uppercase tracking-wider mb-2">Water<br />Saved</div>
                        <div>
                            <div className="text-2xl font-extrabold text-slate-900">120k <span className="text-sm">L</span></div>
                            <div className="text-xs text-slate-500 font-medium mt-1">
                                Enough for 2 Ha
                            </div>
                        </div>
                    </div>

                    {/* CO2 Reduction (Full Width) */}
                    <div className="col-span-2 bg-[#F0FDF4] p-5 rounded-2xl border border-green-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                                <Leaf size={20} />
                            </div>
                            <div>
                                <div className="text-green-800 font-bold text-sm uppercase">CO2 Reduction</div>
                                <div className="text-xs text-green-600/80 font-medium">Carbon Footprint Reduced</div>
                            </div>
                        </div>
                        <div className="text-2xl font-extrabold text-slate-900">45 <span className="text-sm text-slate-500 font-bold">kg</span></div>
                    </div>
                </div>

                {/* 4. SDG IMPACT BADGE */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-1 shadow-lg">
                    <div className="bg-slate-900 rounded-xl p-5 border border-white/10 flex items-center gap-4 relative overflow-hidden">
                        {/* Gold Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-10"></div>

                        <div className="shrink-0 p-3 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full shadow-lg shadow-amber-500/20 text-white">
                            <Award size={24} fill="currentColor" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-0.5">Water Steward Level 1</h3>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Real contribution to <span className="text-white font-bold">SDG 6.4.2</span> (Water Use Efficiency).
                            </p>
                        </div>
                    </div>
                    <button className="w-full py-3 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
                        Download Certificate
                    </button>
                </div>

            </main>
        </div>
    );
}
