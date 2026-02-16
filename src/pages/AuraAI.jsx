import React, { useState } from 'react';
import { Send, Mic, Bot, Sparkles, MapPin, Image as ImageIcon, Droplets, ArrowRight } from 'lucide-react';

const INITIAL_MESSAGES = [
    {
        id: 1,
        sender: 'aura',
        text: "Halo Yannis! Saya mendeteksi Stress Air Tingkat Sedang di Blok A berdasarkan satelit pagi ini. Apakah Anda ingin melihat opsi irigasi?",
        type: 'text'
    },
    {
        id: 2,
        sender: 'aura',
        type: 'widget',
        data: {
            title: 'Rekomendasi Irigasi',
            value: '15mm',
            desc: 'Dibutuhkan segera untuk mempertahankan yield.',
            action: 'Jadwalkan Otomatis'
        }
    }
];

export default function AuraAI() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add User Message
        const newMsg = { id: Date.now(), sender: 'user', text: inputValue, type: 'text' };
        setMessages([...messages, newMsg]);
        setInputValue('');

        // Mock Aura Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'aura',
                text: "Saya sedang menganalisis data terbaru... Prediksi cuaca menunjukkan hujan ringan dalam 2 hari, namun tidak cukup untuk kebutuhan tanaman saat ini. Disarankan tetap melakukan irigasi penuh.",
                type: 'text'
            }]);
        }, 1500);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-[#FDFBF7] font-sans">

            {/* ════ LEFT: CHAT AREA ════ */}
            <div className="flex-1 flex flex-col relative">

                {/* Chat Header */}
                <div className="p-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#86A789] to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h1 className="font-heading font-bold text-slate-900">Aura AI</h1>
                            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Online • Context Aware
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                            <div className={`max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex flex-row-reverse gap-3' : 'flex gap-3'}`}>

                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold
                                    ${msg.sender === 'user' ? 'bg-slate-900' : 'bg-[#86A789]'}`}>
                                    {msg.sender === 'user' ? 'YP' : <Bot size={16} />}
                                </div>

                                {/* Bubble */}
                                <div>
                                    {msg.type === 'text' && (
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                                            ${msg.sender === 'user'
                                                ? 'bg-[#86A789] text-white rounded-tr-none'
                                                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                    )}

                                    {/* Smart Widget */}
                                    {msg.type === 'widget' && (
                                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-md mt-1 w-64">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Droplets size={16} className="text-blue-500" />
                                                <span className="text-xs font-bold uppercase text-slate-400">{msg.data.title}</span>
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900 mb-1">{msg.data.value}</div>
                                            <p className="text-xs text-slate-500 mb-4">{msg.data.desc}</p>
                                            <div className="flex flex-col gap-2">
                                                <button className="w-full py-2 bg-[#86A789] hover:bg-[#759678] text-white text-xs font-bold rounded-lg transition-colors">
                                                    {msg.data.action}
                                                </button>
                                                <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors">
                                                    Ingatkan Nanti
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                    {/* Quick Prompts */}
                    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                        {['Cek kesehatan tanaman', 'Prediksi hujan', 'Laporan mingguan'].map((prompt, i) => (
                            <button key={i} onClick={() => setInputValue(prompt)} className="flex-shrink-0 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-full text-xs font-medium text-slate-600 transition-colors whitespace-nowrap">
                                {prompt}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                            <ImageIcon size={20} />
                        </button>
                        <input
                            type="text"
                            className="flex-1 bg-slate-50 border-0 focus:ring-2 focus:ring-[#86A789]/50 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all font-medium"
                            placeholder="Tanya Aura tentang lahanmu..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={handleSend}
                            className={`p-3 rounded-xl transition-all shadow-md ${inputValue.trim() ? 'bg-[#86A789] text-white hover:bg-[#759678]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>

            </div>

            {/* ════ RIGHT: CONTEXT SIDEBAR (Desktop Only) ════ */}
            <div className="hidden lg:block w-80 bg-white border-l border-slate-100 p-6 overflow-y-auto">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" /> Live Context
                </h3>

                <div className="space-y-6">
                    {/* Maps Context */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-slate-500">
                            <MapPin size={16} /> <span className="text-xs font-bold uppercase">Lokasi Aktif</span>
                        </div>
                        <div className="font-bold text-slate-900">Blok A (Cotton)</div>
                        <div className="text-xs text-slate-400">Larissa, Thessaly</div>
                    </div>

                    {/* Sensor Stats */}
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase mb-3">Sensor Real-time</div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl border border-slate-100 text-center">
                                <div className="text-xs text-slate-400 mb-1">Moisture</div>
                                <div className="font-bold text-[#86A789]">42%</div>
                            </div>
                            <div className="p-3 rounded-xl border border-slate-100 text-center">
                                <div className="text-xs text-slate-400 mb-1">Temp</div>
                                <div className="font-bold text-amber-500">28°C</div>
                            </div>
                        </div>
                    </div>

                    {/* AI Confidence */}
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-blue-700">Model Confidence</span>
                            <span className="text-xs font-bold text-blue-700">98%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full w-[98%]"></div>
                        </div>
                        <div className="mt-2 text-[10px] text-blue-600/70 leading-tight">
                            Berdasarkan data Sentinel-2 terbaru & sensor lokal.
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
