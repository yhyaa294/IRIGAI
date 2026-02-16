import React, { useState } from 'react';
import {
    CloudRain, Wind, Droplets, TrendingDown, Umbrella, AlertCircle,
    Sun, Cloud, ChevronLeft, ArrowUpRight, Zap, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ════ MOCK DATA: FORECAST ════
const FORECAST_DATA = [
    { day: 'Today', temp: 24, icon: <CloudRain size={20} className="text-blue-400" />, prob: '90%', rain: '25mm' },
    { day: 'Tomorrow', temp: 22, icon: <CloudRain size={20} className="text-blue-400" />, prob: '75%', rain: '15mm' },
    { day: 'Wed', temp: 25, icon: <Cloud size={20} className="text-slate-400" />, prob: '20%', rain: '1mm' },
    { day: 'Thu', temp: 28, icon: <Sun size={20} className="text-amber-500" />, prob: '0%', rain: '0mm' },
    { day: 'Fri', temp: 29, icon: <Sun size={20} className="text-amber-500" />, prob: '0%', rain: '0mm' },
    { day: 'Sat', temp: 27, icon: <Cloud size={20} className="text-slate-400" />, prob: '10%', rain: '0mm' },
    { day: 'Sun', temp: 26, icon: <CloudRain size={20} className="text-blue-400" />, prob: '45%', rain: '5mm' },
];

export default function WeatherPrediction() {
    const navigate = useNavigate();
    const [waterSavingMode, setWaterSavingMode] = useState(false);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 pb-24">

            {/* ════ HEADER ════ */}
            <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-4 flex items-center justify-between shadow-sm">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <div className="font-heading font-bold text-lg text-slate-900">Agro-Weather</div>
                    <div className="text-xs text-slate-500 font-medium">Larissa, Thessaly</div>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <main className="max-w-md mx-auto p-4 space-y-6">

                {/* 1. HERO CARD: SMART INSIGHT (Story Weather) */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

                    {/* Rain Animation (CSS Simulation) */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Rain_drops_on_window_02.jpg')] bg-cover bg-center mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-200 border border-red-500/30">
                                <AlertCircle size={12} /> Warning
                            </span>
                            <div className="text-right">
                                <div className="text-3xl font-bold font-heading">24°C</div>
                                <div className="text-xs text-slate-400">Feels Like 22°C</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h1 className="text-3xl font-heading font-extrabold mb-1 leading-tight">
                                Heavy Rain <br />Detected (25mm)
                            </h1>
                            <div className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                                <CloudRain size={16} />
                                <span>Expected within <span className="text-white font-bold">14 hours</span></span>
                            </div>
                        </div>

                        {/* AI Recommendation Box */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/10">
                            <div className="flex gap-3">
                                <Zap size={20} className="text-yellow-400 shrink-0 mt-0.5" fill="currentColor" />
                                <div>
                                    <p className="text-sm font-medium leading-relaxed text-slate-100">
                                        <span className="font-bold text-white">AI Recommendation:</span> System suggests <span className="underline decoration-yellow-400/50 underline-offset-2">POSTPONING IRRIGATION</span> for 24 hours. Utilize natural rainfall.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => setWaterSavingMode(!waterSavingMode)}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all 
                            ${waterSavingMode
                                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'}`}
                        >
                            {waterSavingMode ? (
                                <>
                                    <CheckCircle2 size={20} /> Saver Mode Active
                                </>
                            ) : (
                                <>
                                    <Umbrella size={20} fill="currentColor" /> Activate Water Saver
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Integration Message */}
                <div className="flex items-center gap-2 justify-center text-xs text-slate-400 font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Synced automatically with Irrigation Schedule
                </div>

                {/* 2. REAL-TIME AGRO-WEATHER GRID */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Humidity */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
                        <div className="flex justify-between items-start">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Humidity</span>
                            <Droplets size={18} className="text-blue-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-extrabold text-slate-900">78%</div>
                            <div className="text-xs text-slate-500 font-medium">High (Wet)</div>
                        </div>
                    </div>

                    {/* Wind */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
                        <div className="flex justify-between items-start">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Wind</span>
                            <Wind size={18} className="text-slate-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-extrabold text-slate-900">12 <span className="text-sm font-medium text-slate-400">km/h</span></div>
                            <div className="text-xs text-green-600 font-bold bg-green-50 inline-block px-1.5 py-0.5 rounded">Safe to Spray</div>
                        </div>
                    </div>

                    {/* Evapotranspiration (ETo) */}
                    <div className="col-span-2 bg-[#F0FDF4] p-5 rounded-2xl border border-green-100 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingDown size={18} className="text-green-600" />
                                <span className="text-green-800 font-bold text-sm uppercase tracking-wide">Evapotranspiration (ETo)</span>
                            </div>
                            <div className="text-slate-600 text-sm font-medium">
                                Water loss rate <span className="font-bold text-slate-900">Low</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-extrabold text-slate-900">0.8</div>
                            <div className="text-xs text-slate-500 font-bold">mm/day</div>
                        </div>
                    </div>
                </div>

                {/* 3. RAIN HARVESTING CALCULATOR */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
                        <Droplets size={24} className="text-blue-500" fill="currentColor" />
                    </div>
                    <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Rainwater Potential</h3>
                    <div className="text-4xl font-heading font-extrabold text-[#86A789] mb-2">
                        +250,000 <span className="text-lg text-slate-400 font-sans font-bold">Liters/Ha</span>
                    </div>
                    <div className="inline-block bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                        <p className="text-sm text-slate-600 font-medium">
                            🌿 Pump cost savings <span className="font-bold text-green-600">€45 today</span>
                        </p>
                    </div>
                </div>

                {/* 4. 7-DAY FORECAST */}
                <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 mb-4 px-2">7-Day Forecast</h3>
                    <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-sm">
                        {FORECAST_DATA.map((item, index) => (
                            <div key={index} className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${index === 0 ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
                                <div className="w-24 font-bold text-slate-900">
                                    {item.day}
                                    {index === 0 && <span className="block text-[10px] text-blue-600 font-extrabold uppercase">Today</span>}
                                </div>
                                <div className="flex flex-col items-center justify-center w-12 gap-1">
                                    {item.icon}
                                    <span className="text-[10px] font-bold text-slate-500">{item.prob}</span>
                                </div>
                                <div className="flex-1 px-4">
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-400 rounded-full"
                                            style={{ width: item.prob }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-right w-16">
                                    <div className="font-bold text-slate-900">{item.temp}°</div>
                                    <div className="text-xs text-slate-400 font-medium">{item.rain}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
