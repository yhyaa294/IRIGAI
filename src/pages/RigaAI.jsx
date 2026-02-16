import React, { useState } from 'react';
import {
    BrainCircuit, Send, Mic, Image as ImageIcon, Cpu,
    Satellite, Activity, Zap, MapPin, ChevronRight, AlertTriangle
} from 'lucide-react';

const INITIAL_MESSAGES = [
    {
        id: 1,
        sender: 'riga',
        text: "System Operational. I have detected a 20% moisture drop in Sector A (Cotton). Satellite imagery confirms thermal stress. Immediate irrigation recommended.",
        type: 'alert'
    },
    {
        id: 2,
        sender: 'riga',
        type: 'widget',
        data: {
            title: 'Action Protocol: Irrigation',
            desc: 'Execute standard irrigation sequence (15mm) to normalize soil moisture?',
            actions: ['Execute Irrigation Protocol', 'Simulate Rain Harvesting']
        }
    }
];

export default function RigaAI() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: inputValue, type: 'text' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsThinking(true);

        // Simulate RIGA Thinking & Response
        setTimeout(() => {
            setIsThinking(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'riga',
                text: "Analyzing pest outbreak contours... Based on spectral signature, probability of Bollworm infestation is 87%. Recommending immediate biological counter-measures.",
                type: 'text'
            }]);
        }, 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#FDFBF7] font-sans overflow-hidden">

            {/* ════ LEFT PANEL: COMMUNICATION STREAM ════ */}
            <div className="flex-1 flex flex-col relative h-[90vh] lg:h-auto">

                {/* Header */}
                <div className="p-5 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center relative overlow-hidden shadow-lg shadow-slate-900/20">
                            {/* Pulsing Core */}
                            <div className="absolute inset-0 bg-emerald-500 rounded-xl opacity-20 animate-ping"></div>
                            <BrainCircuit size={24} className="text-emerald-400 relative z-10" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <h1 className="text-xl font-heading font-extrabold text-slate-900 tracking-tight">RIGA <span className="text-emerald-600">CORE</span></h1>
                        <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            ONLINE • v4.2.0 • LATENCY: 24ms
                        </div>
                    </div>
                </div>

                {/* Chat Stream */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm
                                ${msg.sender === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-slate-900 text-emerald-400'}`}>
                                {msg.sender === 'user' ? 'U' : <BrainCircuit size={20} />}
                            </div>

                            {/* Message Bubble */}
                            <div className={`max-w-[85%] lg:max-w-[70%] space-y-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>

                                {msg.type === 'alert' && (
                                    <div className="bg-white border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm text-sm text-slate-700 leading-relaxed font-medium">
                                        <div className="flex items-center gap-2 text-amber-600 font-bold mb-2 uppercase text-xs tracking-wider">
                                            <AlertTriangle size={14} /> System Alert
                                        </div>
                                        {msg.text}
                                    </div>
                                )}

                                {msg.type === 'text' && (
                                    <div className={`p-4 text-sm leading-relaxed shadow-sm font-medium
                                        ${msg.sender === 'user'
                                            ? 'bg-slate-800 text-slate-50 rounded-2xl rounded-tr-sm'
                                            : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm'}`}>
                                        {msg.text}
                                    </div>
                                )}

                                {msg.type === 'widget' && (
                                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-md max-w-sm">
                                        {/* Mini Map Snippet Mockup */}
                                        <div className="w-full h-24 bg-slate-100 rounded-lg mb-3 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/14/9140/6389.png')] bg-cover opacity-50"></div>
                                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                                <AlertTriangle size={24} className="text-red-600 animate-bounce" />
                                            </div>
                                        </div>

                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{msg.data.title}</div>
                                        <p className="text-sm text-slate-700 font-medium mb-4">{msg.data.desc}</p>

                                        <div className="space-y-2">
                                            {msg.data.actions.map((action, idx) => (
                                                <button key={idx} className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide rounded-lg border border-emerald-200 transition-colors text-left flex items-center justify-between group">
                                                    {action}
                                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}

                    {/* Thinking Animation */}
                    {isThinking && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                                <BrainCircuit size={20} className="text-emerald-400 animate-pulse" />
                            </div>
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                </div>
                                <span className="text-xs font-mono text-slate-400 uppercase">Processing Neural Data...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Command Center */}
                <div className="absolute bottom-6 left-6 right-6 lg:left-12 lg:right-12">
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200 p-2 rounded-2xl shadow-2xl flex items-center gap-2 pl-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Command RIGA..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 font-medium placeholder-slate-400 font-mono text-sm"
                        />
                        <button className="p-3 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                            <ImageIcon size={20} />
                        </button>
                        <button className="p-3 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={handleSend}
                            className="p-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-xl shadow-lg transition-transform active:scale-95"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Secure Quantum-Encrypted Connection</span>
                    </div>
                </div>

            </div>

            {/* ════ RIGHT PANEL: LIVE TELEMETRY (STATUS) ════ */}
            <div className="hidden lg:flex w-[350px] bg-slate-50 border-l border-slate-200 flex-col p-6 overflow-y-auto">

                <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Activity size={16} className="text-emerald-600" /> Live System Status
                </h2>

                <div className="space-y-4">

                    {/* Module 1: Satellite */}
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <Satellite size={18} className="text-blue-500" />
                                <span className="text-xs font-bold text-slate-700 uppercase">Satellite Link</span>
                            </div>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        </div>
                        <div className="font-mono text-2xl font-bold text-slate-900 mb-1">CONNECTED</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                            SENTINEL-2B • ORBIT 492<br />
                            LATENCY: 24ms • PACKET LOSS: 0%
                        </div>
                    </div>

                    {/* Module 2: Weather */}
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <Zap size={18} className="text-amber-500" />
                                <span className="text-xs font-bold text-slate-700 uppercase">Local Conditions</span>
                            </div>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">ALERT</span>
                        </div>
                        <div className="font-mono text-2xl font-bold text-slate-900 mb-1">32°C</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                            LARISSA, GREECE<br />
                            HEATWAVE PROTOCOL: STANDBY
                        </div>
                    </div>

                    {/* Module 3: Active Protocols */}
                    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3 text-emerald-400">
                                <Cpu size={18} />
                                <span className="text-xs font-bold uppercase">Active Protocols</span>
                            </div>
                            <div className="font-mono text-lg font-bold mb-2">WATER SAVING MODE</div>
                            <div className="bg-white/10 h-1.5 w-full rounded-full overflow-hidden mb-2">
                                <div className="bg-emerald-500 h-full w-[85%] animate-pulse"></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                <span>EFFICIENCY: 94%</span>
                                <span>TARGET: 12% SAVING</span>
                            </div>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute -right-4 -bottom-4 text-white/5">
                            <BrainCircuit size={120} />
                        </div>
                    </div>

                    {/* Telemetry Log */}
                    <div className="mt-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">System Log</div>
                        <div className="font-mono text-[10px] text-slate-500 space-y-2">
                            <div className="flex gap-2">
                                <span className="text-emerald-600">[10:42:01]</span>
                                <span>Soil Moisture sensor calibrated.</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-blue-600">[10:41:45]</span>
                                <span>Cloud sync completed (1.2MB).</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-amber-600">[10:40:12]</span>
                                <span>Thermal anomaly detected in Sector A.</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-emerald-600">[10:38:55]</span>
                                <span>RIGA Core initialized successfully.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
