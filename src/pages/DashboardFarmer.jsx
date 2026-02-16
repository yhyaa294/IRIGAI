import React, { useState } from 'react';
import {
    LayoutDashboard, Droplets, CloudRain, Sun, Calendar, Settings,
    Activity, Sprout, Menu, X, Timer, Wind, Map,
    Leaf, Award, TrendingUp, LogOut, CloudSun
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
} from 'recharts';

// ════ MOCK DATA (Single Field: Cotton) ════
const WATER_EFFICIENCY_DATA = [
    { day: 'Mon', actual: 12, ideal: 15 },
    { day: 'Tue', actual: 18, ideal: 16 },
    { day: 'Wed', actual: 10, ideal: 14 },
    { day: 'Thu', actual: 22, ideal: 18 }, // Over usage spike
    { day: 'Fri', actual: 14, ideal: 15 },
    { day: 'Sat', actual: 9, ideal: 12 },
    { day: 'Sun', actual: 11, ideal: 12 },
];

const MENU_ITEMS = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
    { icon: <Map size={20} />, label: 'Field Map', active: false },
    { icon: <Calendar size={20} />, label: 'Schedule', active: false },
    { icon: <Award size={20} />, label: 'Rewards', active: false },
    { icon: <Settings size={20} />, label: 'Settings', active: false },
];

export default function DashboardFarmer() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle Mobile Sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 flex">

            {/* ════ MOBILE HEADER (Visible < 1024px) ════ */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#FDFBF7] border-b border-slate-200 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-lg">
                        <Menu size={24} />
                    </button>
                    <span className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">IRIGAI</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#86A789] overflow-hidden border border-slate-200">
                    <img src="https://ui-avatars.com/api/?name=Yannis+P&background=86A789&color=fff" alt="Profile" />
                </div>
            </header>

            {/* ════ SIDEBAR (Fixed Desktop / Drawer Mobile) ════ */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#FDFBF7] border-r border-slate-200 transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:h-screen lg:shrink-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col p-6">
                    {/* Logo (Desktop) */}
                    <div className="hidden lg:flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">I</div>
                        <span className="font-heading font-extrabold text-2xl tracking-tight">IRIGAI</span>
                    </div>

                    {/* Mobile Close Button (Inside Drawer) */}
                    <div className="lg:hidden flex justify-between items-center mb-8">
                        <span className="font-bold text-lg">Menu</span>
                        <button onClick={toggleSidebar} className="p-1 text-slate-500">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {MENU_ITEMS.map((item, idx) => (
                            <button
                                key={idx}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                ${item.active
                                        ? 'bg-[#86A789]/15 text-slate-900'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                                {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#86A789]" />}
                            </button>
                        ))}
                    </nav>

                    {/* User Profile (Bottom) */}
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-[#86A789] flex items-center justify-center text-white font-bold text-sm">YP</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold truncate">Yannis P.</div>
                                <div className="text-xs text-slate-500 truncate">Premium Plan</div>
                            </div>
                            <LogOut size={16} className="text-slate-400 cursor-pointer hover:text-red-500" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for Mobile Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* ════ MAIN CONTENT ════ */}
            <main className="flex-1 min-w-0 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto h-screen">
                <div className="max-w-5xl mx-auto space-y-8 pb-12">

                    {/* 1. HERO CARD: THE DAILY RECOMMENDATION */}
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                            {/* Left: Status Alert */}
                            <div className="flex flex-col gap-4">
                                <div className="inline-flex self-start items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full font-bold text-sm border border-amber-100">
                                    <Droplet size={18} fill="currentColor" />
                                    Irrigation Needed Today
                                </div>
                                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
                                    Daily Water <br />Recommendation
                                </h1>
                                <p className="text-slate-500 text-lg">
                                    Soil moisture levels have dropped below 42%. Active action is required to maintain yield.
                                </p>
                            </div>

                            {/* Right: The Action */}
                            <div className="bg-[#Fdfbf7] rounded-3xl p-6 border border-slate-100 flex flex-col items-center text-center space-y-6">
                                <div>
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">Target Volume</div>
                                    <div className="text-5xl font-extrabold text-[#86A789] font-heading">
                                        15mm <span className="text-xl text-slate-400 font-sans font-medium">/ Ha</span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2 font-medium bg-white px-3 py-1 rounded-full inline-block border border-slate-100">
                                        Based on Satellite NDMI & Crop Stage
                                    </div>
                                </div>

                                <button className="w-full bg-[#86A789] hover:bg-[#759678] text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform transform hover:-translate-y-1 shadow-xl shadow-[#86A789]/20 text-lg">
                                    <Timer size={24} />
                                    Start Irrigation Timer
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* 2. GRID: CROP PROFILE & ENVIRONMENT */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Crop Profile Widgets (The Context) */}
                        <div className="md:col-span-1 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-6">
                            <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                                <Sprout size={20} className="text-[#86A789]" /> Crop Profile
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-slate-500 text-sm">Crop</span>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900">Cotton</div>
                                        <div className="text-xs text-slate-400 italic">Gossypium</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-slate-500 text-sm">Stage</span>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900">Flowering</div>
                                        <div className="text-xs text-[#86A789] font-bold">Day 45 of 120</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-slate-500 text-sm">Moisture</span>
                                    <div className="text-right">
                                        <div className="font-bold text-amber-500">42%</div>
                                        <div className="text-xs text-slate-400">Moderate Stress</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Environmental Context Widgets */}
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Card 1: Weather */}
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                                        <Sun size={24} />
                                    </div>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Weather</span>
                                </div>
                                <div>
                                    <div className="text-3xl font-heading font-extrabold text-slate-900">28°C</div>
                                    <div className="text-sm text-slate-500 mt-1 font-medium">No Rain Forecasted</div>
                                </div>
                            </div>

                            {/* Card 2: ETc */}
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
                                        <Wind size={24} />
                                    </div>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Water Loss</span>
                                </div>
                                <div>
                                    <div className="text-3xl font-heading font-extrabold text-slate-900">6.4 <span className="text-base text-slate-400 font-sans font-medium">mm/day</span></div>
                                    <div className="text-sm text-slate-500 mt-1 font-medium">Evapotranspiration (ETc)</div>
                                </div>
                            </div>

                            {/* Card 3: Next Rain (Full Width) */}
                            <div className="sm:col-span-2 bg-[#F0F9FF] rounded-3xl p-5 border border-blue-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-500 shrink-0">
                                    <CloudRain size={24} />
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                    <div>
                                        <div className="text-xs font-bold text-blue-600 uppercase mb-0.5">Forecast</div>
                                        <div className="font-bold text-slate-900 text-lg">Next Rain: 3 Days away</div>
                                    </div>
                                    <div className="hidden sm:block text-sm text-blue-800/60 font-medium">
                                        Prepare irrigation schedule
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. WATER EFFICIENCY CHART (Line Chart) */}
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                            <div>
                                <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">Water Efficiency</h3>
                                <p className="text-slate-500 text-sm">Actual Water Given vs. Ideal Crop Demand</p>
                            </div>
                            <div className="flex items-center gap-2 bg-[#86A789]/10 px-4 py-2 rounded-full text-[#5F7A62] font-semibold text-sm">
                                <TrendingUp size={16} /> Demand-Based Irrigation Savings
                            </div>
                        </div>

                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={WATER_EFFICIENCY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ color: '#64748B', marginBottom: '0.5rem' }}
                                    />
                                    {/* Ideal Demand Line */}
                                    <Line
                                        type="monotone"
                                        dataKey="ideal"
                                        name="Ideal Demand"
                                        stroke="#86A789"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#86A789', strokeWidth: 0 }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                    {/* Actual Usage Line */}
                                    <Line
                                        type="monotone"
                                        dataKey="actual"
                                        name="Actual Given"
                                        stroke="#94A3B8"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={{ r: 3, fill: '#94A3B8', strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

// Icon Helper for Droplet filled
function Droplet({ size = 24, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-droplet ${className}`}
        >
            <path d="M12 22a7 7 0 0 0 7-7c0-2-5-9-5-9s-5 7-5 9a7 7 0 0 0 7 7z" />
        </svg>
    );
}
