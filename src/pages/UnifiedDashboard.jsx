import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    CloudSun, Droplets, Leaf, Activity, AlertTriangle,
    Users, Map, Sparkles, Globe, TrendingUp, DollarSign
} from 'lucide-react';

const MOISTURE_DATA = [
    { day: 'Mon', sat: 30, ai: 45 },
    { day: 'Tue', sat: 45, ai: 50 },
    { day: 'Wed', sat: 55, ai: 58 },
    { day: 'Thu', sat: 40, ai: 52 },
    { day: 'Fri', sat: 65, ai: 68 },
    { day: 'Sat', sat: 58, ai: 62 },
    { day: 'Sun', sat: 72, ai: 70 },
];

const WATER_DATA = [
    { name: 'Used', value: 6500 },
    { name: 'Remaining', value: 3500 },
];

const COLORS = ['#86A789', '#E2E8F0']; // Sage Green, Light Gray

const TASKS = [
    { id: 1, sector: 'Sektor B', task: 'Irigasi dibutuhkan dalam 4 jam.', urgency: 'High', time: '10:00 AM' },
    { id: 2, sector: 'Sektor A', task: 'Deteksi awal hama teridentifikasi. Cek segera.', urgency: 'Critical', time: '09:30 AM' },
    { id: 3, sector: 'Sektor C', task: 'Pemupukan NPK disarankan besok pagi.', urgency: 'Medium', time: 'Yesterday' },
];

export default function UnifiedDashboard() {
    return (
        <div className="pb-10 max-w-7xl mx-auto px-4 md:px-8 bg-[#FDFBF7] min-h-screen">

            {/* Header: Greeting & Weather */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pt-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-1 font-heading">
                        Pinios Basin Intelligence
                    </h1>
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                        <Map size={16} /> Thessaly, Greece • <span className="text-[#86A789] font-semibold">Demand-Based Precision Irrigation</span>
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-white p-3 px-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-2">
                        <Users size={20} className="text-blue-500" />
                        <div>
                            <div className="font-extrabold text-sm text-[#1A1A1A]">1,505</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wide">Active Farmers</div>
                        </div>
                    </div>
                    <div className="bg-white p-3 px-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-2">
                        <Activity size={20} className="text-amber-500" />
                        <div>
                            <div className="font-extrabold text-sm text-[#1A1A1A]">Moderate</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wide">Drought Risk</div>
                        </div>
                    </div>
                    <div className="bg-white p-3 px-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 w-full md:w-auto">
                        <CloudSun size={32} color="#F59E0B" />
                        <div>
                            <div className="font-extrabold text-xl text-[#1A1A1A]">28°C</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Leaf size={12} /> Larissa, Thessaly
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════ HERO GRID (Desktop: 12 Cols / Mobile: Stack) ════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

                {/* 1. Moisture Trend Chart (8 Cols) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1 lg:col-span-8 flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row justify-between mb-6 gap-2">
                        <div>
                            <h3 className="text-lg font-bold text-[#1A1A1A] font-heading">Soil Moisture Analysis</h3>
                            <div className="text-xs text-slate-500">Last 7 Days • <span className="text-blue-500 font-semibold">Sentinel-2 Data</span> vs AI Prediction</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <div className="w-2 h-2 rounded-full bg-[#86A789]" /> AI Predicted
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <div className="w-2 h-2 rounded-full bg-slate-300" /> Historical
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOISTURE_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    cursor={{ stroke: '#E2E8F0' }}
                                />
                                <Line type="monotone" dataKey="sat" name="Historical" stroke="#CBD5E1" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="ai" name="AI Predicted" stroke="#86A789" strokeWidth={4} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Water Allocation Gauge (4 Cols) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1 lg:col-span-4 flex flex-col items-center justify-center relative">
                    <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-blue-100">
                        Powered by Sentinel-2
                    </div>
                    <h3 className="w-full text-lg font-bold text-[#1A1A1A] mb-2 text-left font-heading">Water Saved</h3>
                    <div className="w-full h-[220px] relative flex justify-center items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={WATER_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                    cornerRadius={10}
                                >
                                    {WATER_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-3xl font-extrabold text-[#1A1A1A]">1.2M</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">LITERS SAVED</div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between pt-4 border-t border-slate-50 mt-2">
                        <div>
                            <div className="text-xs text-slate-500">Target</div>
                            <div className="font-bold text-sm text-[#86A789]">1.5M Liters</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-500">Monitored Area</div>
                            <div className="font-bold text-sm text-slate-700">5,620 ha</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════ DATA WIDGETS (Grid 12) ════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

                {/* 3. SDG Impact Tracker (4 Cols) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1 lg:col-span-4 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-[#1A1A1A] font-heading">SDG Impact</h3>
                        <Globe size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-6 flex-1 flex flex-col justify-center">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-slate-700">SDG 6.4.2</span>
                                <span className="text-blue-600 font-bold">Level 1 Stress ↓</span>
                            </div>
                            <div className="w-full bg-blue-50 rounded-full h-3 overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full w-[75%] transition-all duration-1000"></div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Reduction in Water Stress (Thessaly Basin)</p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-slate-700">SDG 2.4.1</span>
                                <span className="text-green-600 font-bold">Sustainable Ag ↑</span>
                            </div>
                            <div className="w-full bg-green-50 rounded-full h-3 overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full w-[60%] transition-all duration-1000"></div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Area under Productive & Sustainable Ag</p>
                        </div>
                    </div>
                </div>

                {/* 4. ROI Comparison (4 Cols) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1 lg:col-span-4">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-[#1A1A1A] font-heading">CAPEX Efficiency</h3>
                        <DollarSign size={20} className="text-green-600" />
                    </div>

                    <div className="flex items-end gap-4 h-[180px] mb-4">
                        {/* Bar 1: Legacy */}
                        <div className="w-1/2 flex flex-col justify-end h-full gap-2 group">
                            <div className="flex justify-center"><span className="text-xs font-bold text-slate-400">€200</span></div>
                            <div className="bg-slate-200 rounded-t-xl w-full h-[80%] flex items-end justify-center pb-2 text-[10px] text-slate-500 font-bold group-hover:bg-slate-300 transition-colors">
                                Legacy IoT
                            </div>
                        </div>
                        {/* Bar 2: IRIGAI */}
                        <div className="w-1/2 flex flex-col justify-end h-full gap-2 group">
                            <div className="flex justify-center"><span className="text-xs font-bold text-green-600">€0</span></div>
                            <div className="bg-[#86A789] rounded-t-xl w-full h-[5%] flex items-end justify-center pb-2 text-[10px] text-white font-bold relative group-hover:bg-[#759678] transition-colors">
                                <span className="absolute -top-6 text-green-700 font-extrabold text-sm">~99%</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-xs text-slate-500">
                        Zero Hardware Installation Cost vs Traditional Sensors.
                    </p>
                </div>

                {/* 5. Health Heatmap (4 Cols) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1 lg:col-span-4">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-bold text-[#1A1A1A] font-heading">Field Health</h3>
                        <Activity size={20} className="text-slate-500" />
                    </div>
                    {/* Visual Mock of Mini Map */}
                    <div className="rounded-2xl overflow-hidden h-[160px] grid grid-cols-3 gap-1 bg-slate-50 border-4 border-slate-50">
                        {/* Zones */}
                        <div className="bg-[#86A789] opacity-90 rounded-md hover:opacity-100 transition-opacity"></div>
                        <div className="bg-[#86A789] opacity-80 rounded-md hover:opacity-100 transition-opacity"></div>
                        <div className="bg-amber-400 opacity-90 rounded-md hover:opacity-100 transition-opacity flex items-center justify-center">
                            <AlertTriangle size={16} className="text-white drop-shadow-sm" />
                        </div>
                        <div className="bg-[#86A789] rounded-md hover:opacity-100 transition-opacity"></div>
                        <div className="bg-red-400 opacity-90 rounded-md hover:opacity-100 transition-opacity flex items-center justify-center">
                            <AlertTriangle size={16} className="text-white drop-shadow-sm" />
                        </div>
                        <div className="bg-[#86A789] opacity-70 rounded-md hover:opacity-100 transition-opacity"></div>
                        <div className="bg-[#86A789] opacity-90 rounded-md hover:opacity-100 transition-opacity"></div>
                        <div className="bg-amber-400 opacity-80 rounded-md hover:opacity-100 transition-opacity"></div>
                        <div className="bg-[#86A789] rounded-md hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-[#86A789]" /> Healthy</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-400" /> Warning</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-400" /> Critical</span>
                    </div>
                </div>

            </div>

            {/* ════ AI TASKS & ROADMAP (Grid 12) ════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">

                {/* 6. AI Tasks (7 Cols) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 col-span-1 lg:col-span-7 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2 font-heading">
                            <Sparkles size={20} className="text-amber-500" /> Rekomendasi Aura AI
                        </h3>
                        <button className="text-xs text-amber-600 font-semibold hover:underline">See All</button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {TASKS.map((task) => (
                            <div key={task.id} className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 flex gap-3 items-start hover:bg-orange-50 transition-colors cursor-pointer">
                                <AlertTriangle size={20} color={task.urgency === 'Critical' ? '#EF4444' : '#F59E0B'} className="mt-0.5" />
                                <div className="flex-1">
                                    <div className="text-[10px] text-orange-800 font-bold mb-1 uppercase tracking-wider">
                                        {task.sector} • {task.urgency}
                                    </div>
                                    <div className="text-sm text-[#1A1A1A] font-semibold leading-relaxed">
                                        {task.task}
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-400 whitespace-nowrap">{task.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. Implementation Roadmap (5 Cols) */}
                <div className="bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800 col-span-1 lg:col-span-5 text-white flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp size={100} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-6 font-heading relative z-10">Implementation Plan</h3>
                    <div className="space-y-6 relative z-10">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <div className="w-0.5 h-full bg-slate-700 my-1"></div>
                            </div>
                            <div className="pb-4">
                                <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">0-6 Months</div>
                                <h4 className="font-bold text-sm">Preparation Phase</h4>
                                <p className="text-xs text-slate-400 mt-1">Stakeholder engagement, baseline data collection.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <div className="w-0.5 h-full bg-slate-700 my-1"></div>
                            </div>
                            <div className="pb-4">
                                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">6-18 Months (Current)</div>
                                <h4 className="font-bold text-sm">Pilot Execution</h4>
                                <p className="text-xs text-slate-400 mt-1">1,200+ Farmers onboarding, AI Model validation.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-slate-600 border border-slate-500"></div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">18-36 Months</div>
                                <h4 className="font-bold text-sm text-slate-300">Basin-Wide Expansion</h4>
                                <p className="text-xs text-slate-500 mt-1">Full policy integration & scale-up.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
