import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Brain, AlertTriangle, CheckCircle, Leaf,
    ArrowRight, Activity, ThermometerSun, Droplets, Share2,
    Target, Scan as ScanIcon, ChevronRight
} from 'lucide-react';

// ════ MOCK AI RESPONSE (Scientific Logic) ════
const mockAIResponse = {
    diagnosis: "Nitrogen Deficiency",
    scientificName: "Nitrogen Deficiency in Solanum lycopersicum",
    confidenceScore: 0.945, // 94.5%
    severity: "high", // low, medium, high
    detectedRegion: { x: 35, y: 25, width: 30, height: 40 }, // % coordinates
    symptoms: [
        "Chlorosis (yellowing) on older leaves",
        "Stunted growth",
        "Interveinal chlorosis"
    ],
    recommendations: [
        {
            type: "action",
            title: "Immediate Nitrogen Application",
            text: "Apply Urea fertilizer (46% N) at a dose of 50kg/ha or Ammonium Sulfate to the affected area.",
            urgent: true
        },
        {
            type: "monitoring",
            title: "Rescan Schedule",
            text: "Rescan 3 days after fertilization to monitor plant response.",
            urgent: false
        }
    ]
};

export default function ScanResult() {
    const location = useLocation();
    const navigate = useNavigate();

    // Accept image from navigation state or use default mock for direct access
    const initialImage = location.state?.image || "https://images.unsplash.com/photo-1591060936173-6782b5fb04b9?q=80&w=2000&auto=format&fit=crop";

    // Simulation State
    const [processing, setProcessing] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        // Simulate AI Processing Duration
        const timer = setTimeout(() => {
            setProcessing(false);
            // Show overlay shortly after result appears
            setTimeout(() => setShowOverlay(true), 500);
        }, 3000); // 3 seconds scan effect

        return () => clearTimeout(timer);
    }, []);

    // ════ RENDER: PROCESSING STATE ════
    if (processing) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <img src={initialImage} alt="Analyzing" className="w-full h-full object-cover blur-sm" />
                </div>

                {/* Scanning Animation */}
                <div className="relative z-10 w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 shadow-2xl mx-6">
                    <img src={initialImage} alt="Scanning" className="w-full h-full object-cover" />

                    {/* Moving Laser Line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#86A789]/50 to-transparent animate-scan"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#86A789] shadow-[0_0_20px_rgba(134,167,137,1)] animate-scan-line"></div>

                    {/* Tech Overlays */}
                    <div className="absolute top-4 left-4 text-[#86A789] font-mono text-xs flex items-center gap-2">
                        <ScanIcon size={14} className="animate-pulse" /> AI LEAF ANALYSIS v2.4
                    </div>
                    <div className="absolute bottom-4 right-4 text-white font-mono text-xs">
                        PROCESSING...
                    </div>

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="relative z-10 mt-8 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-[#86A789] font-bold text-lg animate-pulse">
                        <Brain size={20} />
                        <span>IRIGAI NEURAL ENGINE</span>
                    </div>
                    <p className="text-slate-400 text-sm">Analyzing leaf structure and chlorophyll levels...</p>
                </div>

                <style>{`
                    @keyframes scan-line {
                        0% { top: 0%; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    .animate-scan-line {
                        animation: scan-line 2s linear infinite;
                    }
                `}</style>
            </div>
        );
    }

    // ════ RENDER: DIAGNOSTIC RESULT STATE ════
    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-24 font-sans">
            {/* Header */}
            <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                <button onClick={() => navigate('/app/scan')} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full">
                    <ArrowRight size={20} className="rotate-180" />
                </button>
                <div className="font-heading font-bold text-slate-900">AI Diagnosis Result</div>
                <button className="p-2 -mr-2 text-slate-500 hover:bg-slate-50 rounded-full">
                    <Share2 size={20} />
                </button>
            </header>

            <main className="max-w-2xl mx-auto p-4 space-y-6">

                {/* 1. VISUAL EVIDENCE CARD */}
                <div className="bg-white rounded-[2rem] p-3 shadow-md border border-slate-100 overflow-hidden relative group">
                    <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/3] bg-slate-100">
                        <img src={initialImage} alt="Analyzed Leaf" className="w-full h-full object-cover" />

                        {/* Detection Box Overlay - Positioned based on mock data */}
                        {showOverlay && (
                            <div
                                className="absolute border-2 border-red-500/80 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-lg flex items-start justify-start animate-fade-in-up"
                                style={{
                                    left: `${mockAIResponse.detectedRegion.x}%`,
                                    top: `${mockAIResponse.detectedRegion.y}%`,
                                    width: `${mockAIResponse.detectedRegion.width}%`,
                                    height: `${mockAIResponse.detectedRegion.height}%`
                                }}
                            >
                                <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg rounded-tl-sm">
                                    {Math.round(mockAIResponse.confidenceScore * 100)}%
                                </div>
                            </div>
                        )}

                        {/* Tech Data Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white flex justify-between items-end">
                            <div>
                                <div className="text-[10px] font-mono text-slate-300 mb-1">IMAGE SOURCE</div>
                                <div className="text-xs font-semibold flex items-center gap-1.5">
                                    <Leaf size={12} className="text-[#86A789]" /> Camera Capture
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                                <ScanIcon size={12} className="text-[#86A789]" />
                                <span className="text-xs font-bold text-[#86A789]">AI Processed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. PRIMARY DIAGNOSIS */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                    {/* Decorative Background Blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-60"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-red-200">
                                <AlertTriangle size={12} /> Severity: {mockAIResponse.severity.toUpperCase()}
                            </span>
                            <div className="text-right">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">AI Confidence</div>
                                <div className="text-xl font-heading font-extrabold text-slate-900">
                                    {(mockAIResponse.confidenceScore * 100).toFixed(1)}%
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2 font-heading">
                            {mockAIResponse.diagnosis}
                        </h2>
                        <p className="text-sm text-slate-500 italic mb-6">
                            Latin: {mockAIResponse.scientificName}
                        </p>

                        {/* Symptoms Checklist */}
                        <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-xl border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Identified Symptoms</h4>
                            {mockAIResponse.symptoms.map((symptom, idx) => (
                                <div key={idx} className="flex items-start gap-2.5">
                                    <CheckCircle size={16} className="text-[#86A789] mt-0.5 shrink-0" />
                                    <span className="text-sm text-slate-700 font-medium">{symptom}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. ACTIONABLE RECOMMENDATIONS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 font-heading px-2">Action Recommendations</h3>

                    {mockAIResponse.recommendations.map((rec, idx) => (
                        <div key={idx} className={`rounded-[1.5rem] p-5 border shadow-sm flex gap-4 transition-all
                            ${rec.urgent
                                ? 'bg-white border-l-4 border-l-amber-500 border-y-slate-100 border-r-slate-100'
                                : 'bg-white border-slate-100'
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                ${rec.type === 'action' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}
                            >
                                {rec.type === 'action' ? <Droplets size={20} /> : <Activity size={20} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">{rec.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                    {rec.text}
                                </p>
                                {rec.urgent && (
                                    <button className="text-xs font-bold text-white bg-amber-500 px-4 py-2 rounded-full shadow-sm hover:bg-amber-600 transition-colors">
                                        Do It Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. EXPERT CONNECT CTA */}
                <div className="bg-[#0F172A] rounded-[2rem] p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    <div className="relative z-10">
                        <Target size={32} className="mx-auto mb-3 text-[#86A789]" />
                        <h3 className="font-bold text-lg mb-2">Need Further Analysis?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Send this result to a local Agronomist for manual verification and precision prescription.
                        </p>
                        <button className="w-full bg-[#86A789] text-white font-bold py-3.5 rounded-xl hover:bg-[#759678] transition-colors">
                            Contact Agronomist
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}
