import React, { useState } from 'react';
import {
    Download, Printer, Share2, FileCheck, FileText, Calendar,
    CheckCircle2, Loader2, BarChart3, Droplets
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Mock Data for the Report Chart
const REPORT_DATA = [
    { day: '1 Feb', moisture: 45 },
    { day: '5 Feb', moisture: 42 },
    { day: '10 Feb', moisture: 38 }, // Drop
    { day: '11 Feb', moisture: 60 }, // Irrigated
    { day: '15 Feb', moisture: 55 },
];

export default function ReportsPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({
        moisture: true,
        usage: true,
        yield: false
    });

    const handleGenerate = () => {
        setIsGenerating(true);
        setIsReady(false);
        // Simulate AI Processing
        setTimeout(() => {
            setIsGenerating(false);
            setIsReady(true);
        }, 2000);
    };

    const toggleOption = (key) => {
        setSelectedOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 flex flex-col lg:flex-row">

            {/* ════ LEFT PANEL: CONFIGURATION ════ */}
            <div className="w-full lg:w-1/3 p-6 lg:p-8 bg-white border-r border-slate-100 flex flex-col h-auto lg:h-screen sticky top-0">
                <div className="mb-8">
                    <h1 className="text-2xl font-heading font-extrabold text-[#1A1A1A] flex items-center gap-2">
                        <FileText className="text-[#86A789]" /> AI Report Generator
                    </h1>
                    <p className="text-slate-500 text-sm mt-2">
                        Create professional documents for credit applications, insurance claims, or personal archives.
                    </p>
                </div>

                {/* Date Range */}
                <div className="mb-6">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Report Period</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="px-4 py-2 rounded-xl bg-[#86A789] text-white text-sm font-bold shadow-sm">Last 30 Days</button>
                        <button className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">This Planting Season</button>
                    </div>
                </div>

                {/* Data Selection */}
                <div className="mb-8 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Included Data</label>

                    <div
                        onClick={() => toggleOption('moisture')}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedOptions.moisture ? 'border-[#86A789] bg-[#86A789]/5' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${selectedOptions.moisture ? 'bg-[#86A789] border-[#86A789] text-white' : 'border-slate-300'}`}>
                                {selectedOptions.moisture && <CheckCircle2 size={14} />}
                            </div>
                            <span className="text-sm font-bold text-slate-700">Soil Moisture Analysis</span>
                        </div>
                        <BarChart3 size={16} className="text-slate-400" />
                    </div>

                    <div
                        onClick={() => toggleOption('usage')}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedOptions.usage ? 'border-[#86A789] bg-[#86A789]/5' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${selectedOptions.usage ? 'bg-[#86A789] border-[#86A789] text-white' : 'border-slate-300'}`}>
                                {selectedOptions.usage && <CheckCircle2 size={14} />}
                            </div>
                            <span className="text-sm font-bold text-slate-700">Water Usage & Cost History</span>
                        </div>
                        <Droplets size={16} className="text-slate-400" />
                    </div>

                    <div
                        onClick={() => toggleOption('yield')}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedOptions.yield ? 'border-[#86A789] bg-[#86A789]/5' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${selectedOptions.yield ? 'bg-[#86A789] border-[#86A789] text-white' : 'border-slate-300'}`}>
                                {selectedOptions.yield && <CheckCircle2 size={14} />}
                            </div>
                            <span className="text-sm font-bold text-slate-700">Yield Prediction (AI Beta)</span>
                        </div>
                        <Loader2 size={16} className="text-slate-400" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-6 border-t border-slate-100">
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Generating Report...
                            </>
                        ) : isReady ? (
                            <>
                                <Download size={20} /> Download Document (PDF)
                            </>
                        ) : (
                            <>
                                <FileCheck size={20} /> Generate Smart Report
                            </>
                        )}
                    </button>
                    {isReady && (
                        <div className="text-center mt-3 text-xs text-green-600 font-bold bg-green-50 py-2 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                            Report ready to download! (Size: 1.2 MB)
                        </div>
                    )}
                </div>
            </div>

            {/* ════ RIGHT PANEL: LIVE PREVIEW (A4 SHEET) ════ */}
            <div className="flex-1 bg-slate-100 p-4 lg:p-12 overflow-y-auto flex justify-center items-start">

                {/* The A4 Sheet */}
                <div className={`bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-12 transition-all duration-700 origin-top ${isGenerating ? 'scale-[0.98] blur-[1px]' : 'scale-100 blur-0'}`}>

                    {/* Report Header */}
                    <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-slate-900 mb-1">
                                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">I</div>
                                <span className="font-heading font-extrabold text-2xl tracking-tight">IRIGAI</span>
                            </div>
                            <div className="text-xs text-slate-500 font-medium">Pinios River Basin Intelligence System</div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">Integrated Agriculture<br />Performance Report</h2>
                            <div className="text-xs text-slate-400 mt-1">Generated: 16 Feb 2026</div>
                        </div>
                    </div>

                    {/* Report Body */}
                    <div className="space-y-8">

                        {/* Profile Section */}
                        <div className="bg-slate-50 p-6 rounded-none border-l-4 border-[#86A789]">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Farm Profile</h3>
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div>
                                    <span className="block text-slate-500 text-xs">Owner</span>
                                    <span className="font-bold text-slate-900">Yannis Papadopoulos</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs">Location</span>
                                    <span className="font-bold text-slate-900">Larissa, Thessaly (Block A)</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs">Commodity</span>
                                    <span className="font-bold text-slate-900">Cotton - Flowering Stage</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs">Land Area</span>
                                    <span className="font-bold text-slate-900">2.5 Hectares</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Summary */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <FileCheck size={16} className="text-[#86A789]" /> Executive Summary (AI)
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed text-justify">
                                Based on the last 30 days of data analysis, Block A shows <span className="font-bold text-green-700">optimal moisture stability</span> despite extreme temperature fluctuations in the first week of February. The precision irrigation system successfully maintained potential yield while <span className="font-bold text-green-700">saving 12% water usage</span> compared to regional standards. Pest risk is detected as low. It is recommended to maintain the current irrigation schedule until the boll opening stage.
                            </p>
                        </div>

                        {/* Chart Preview */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Soil Moisture Trend (30 Days)</h3>
                            <div className="h-64 border border-slate-200 p-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={REPORT_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                        <Line type="monotone" dataKey="moisture" stroke="#86A789" strokeWidth={2} dot={{ r: 3 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center text-[10px] text-slate-400 mt-2 italic">Data sourced from Sentinel-2 & IRIGAI Local Sensors</div>
                        </div>

                        {/* Logs Table */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Irrigation Logs (Recent)</h3>
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500">
                                        <th className="py-2 font-medium">Date</th>
                                        <th className="py-2 font-medium">Activity</th>
                                        <th className="py-2 font-medium">Volume</th>
                                        <th className="py-2 font-medium text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="border-b border-slate-50">
                                        <td className="py-2">15 Feb 2026</td>
                                        <td className="py-2">Automatic Irrigation (Aura)</td>
                                        <td className="py-2">12,500 L</td>
                                        <td className="py-2 text-right text-green-600 font-bold">Success</td>
                                    </tr>
                                    <tr className="border-b border-slate-50">
                                        <td className="py-2">11 Feb 2026</td>
                                        <td className="py-2">Manual Irrigation</td>
                                        <td className="py-2">15,000 L</td>
                                        <td className="py-2 text-right text-green-600 font-bold">Success</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">08 Feb 2026</td>
                                        <td className="py-2 text-amber-600">Skipped (Rain Predicted)</td>
                                        <td className="py-2">0 L</td>
                                        <td className="py-2 text-right text-amber-600 font-bold">Water Saved</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    {/* Report Footer */}
                    <div className="mt-20 pt-6 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
                        <div>Powered by IRIGAI Engine v2.4</div>
                        <div>Page 1 of 1</div>
                    </div>

                </div>

            </div>
        </div>
    );
}
