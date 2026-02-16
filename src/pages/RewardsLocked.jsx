import React from 'react';
import { Lock, Handshake, Landmark, Award, ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RewardsLocked() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Decor (Blurred) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm text-slate-500 hover:bg-slate-50 z-20"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Main Content Card */}
            <div className="relative z-10 bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 max-w-lg w-full text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100">
                    <Handshake size={14} /> Strategic Partnership Phase
                </div>

                {/* Central Icon */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-white rounded-full shadow-xl flex items-center justify-center">
                        <Lock size={48} className="text-amber-500" />
                    </div>
                    {/* Floating Icons */}
                    <div className="absolute -top-2 -right-2 p-2 bg-blue-600 rounded-full text-white shadow-lg animate-bounce">
                        <Landmark size={20} />
                    </div>
                </div>

                {/* Headlines */}
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-4 leading-tight">
                    Government <br />Incentive Program
                </h1>
                <p className="text-slate-500 leading-relaxed mb-10">
                    The <span className="font-bold text-[#86A789]">Pinios Points</span> redemption feature for Fertilizer Subsidies & Tax Cuts is currently being integrated with the <span className="font-bold text-slate-700">Pinios River Basin Authority</span> & <span className="font-bold text-slate-700">Ministry of Agriculture</span>.
                </p>

                {/* Teaser Cards (Ghosted) */}
                <div className="space-y-3 mb-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left">
                        <div className="p-3 bg-green-50 rounded-xl text-green-600">
                            <Award size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-sm">50kg Subsidized Urea Voucher</div>
                            <div className="text-xs text-amber-500 font-bold">Requires 500 Pts</div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Landmark size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-sm">10% Land Tax Discount</div>
                            <div className="text-xs text-amber-500 font-bold">Requires 1000 Pts</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95">
                    <Bell size={20} /> Notify Me When Live
                </button>
                <div className="mt-4 text-xs text-slate-400 font-medium">
                    Estimated Launch: Q3 2026
                </div>

            </div>
        </div>
    );
}
