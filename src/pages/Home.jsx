import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Camera, Cpu, Droplets, ArrowRight,
    Smartphone, BrainCircuit, Leaf, Check, Users, Target, CircleDollarSign
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Landing() {
    const [hectares, setHectares] = useState(10);

    // ROI Calculations
    const waterSaved = (hectares * 45000).toLocaleString(); // 45k liters per ha
    const costReduction = (hectares * 320).toLocaleString(); // 320 euros per ha
    const carbonCredits = (hectares * 1.5).toLocaleString(); // 1.5 tons per ha

    return (
        <div className="landing-page bg-[#FFFBF0] min-h-screen text-[#1A1A1A] font-sans">

            {/* Navbar */}
            <Navbar />

            {/* ════ HERO SECTION ════ */}
            <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        src="/halaman_1.jpeg"
                        alt="Pinios River Landscape"
                        className="w-full h-full object-cover object-bottom"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255, 251, 240, 0.9), transparent, rgba(0, 0, 0, 0.3))' }}></div>
                </div>

                {/* Content Container */}
                <div className="container mx-auto max-w-7xl px-6 md:px-12 relative z-10 w-full">
                    <div className="max-w-xl">
                        <h1 className="animate-fade-in-up font-extrabold text-5xl md:text-7xl text-slate-900 leading-tight mb-6 tracking-tight drop-shadow-lg">
                            SMART <br />
                            IRRIGATION <br />
                            FOR <span className="text-[#558B2F]">PINIOS.</span>
                        </h1>

                        <p className="animate-fade-in-up text-[#FFF8E1] text-lg md:text-xl mb-8 font-medium leading-relaxed max-w-md drop-shadow-md">
                            Soft-Infrastructure for water governance. Powered by AI & Copernicus Satellite Data. No sensors needed.
                        </p>

                        <Link to="/register" className="animate-fade-in-up inline-flex items-center gap-2 bg-[#558B2F] text-white px-10 py-4 rounded-full font-bold text-base uppercase tracking-wider shadow-xl hover:bg-[#436F25] transition-all transform hover:-translate-y-1">
                            START SCANNING <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ════ FEATURES SECTION ════ */}
            <section className="bg-white">
                <div className="flex flex-col md:flex-row w-full">

                    {/* Left Column: Content */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 pb-10 flex flex-col justify-center order-2 md:order-1">
                        <h2 className="font-extrabold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                            Soft-Infrastructure <br /> Revolution.
                        </h2>
                        <p className="text-lg text-slate-500 mb-12 leading-relaxed">
                            Why spend millions on sensors? We use what farmers already have.
                        </p>

                        <div className="flex flex-col gap-8">
                            {/* Feature 1 */}
                            <div className="flex gap-6">
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-green-50 flex items-center justify-center text-green-700">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Zero Hardware</h4>
                                    <p className="text-slate-500 text-sm">No IoT sensors needed. Just a smartphone.</p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex gap-6">
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <BrainCircuit size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">AI Precision</h4>
                                    <p className="text-slate-500 text-sm">Demand-based irrigation tailored to crop needs.</p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="flex gap-6">
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                                    <Leaf size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Eco-Rewards</h4>
                                    <p className="text-slate-500 text-sm">Earn points for every liter saved.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="w-full md:w-1/2 relative min-h-[400px] order-1 md:order-2">
                        <img
                            src="/halaman_2.jpeg"
                            alt="Futuristic Farming"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* ════ HOW IT WORKS ════ */}
            <section className="bg-[#0A1A2F] py-20 md:py-32 relative text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4A5568_1px,transparent_1px)]" style={{ backgroundSize: '24px 24px' }}></div>

                <div className="container mx-auto max-w-7xl px-6 md:px-12 relative z-10">
                    <h2 className="text-center font-extrabold text-4xl md:text-5xl mb-16">
                        Precision in <span className="text-[#38BDF8]">3 Simple Steps</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Snap', img: '/icon_1.jpeg', desc: 'Take a photo of your crop and soil. Our AI analyzes texture and stress levels instantly.' },
                            { step: '02', title: 'Sync', img: '/icon_2.jpeg', desc: 'We fuse your photo with Copernicus Satellite data to measure soil moisture from space.' },
                            { step: '03', title: 'Save', img: '/icon_3.jpeg', desc: 'Get a precise water volume recommendation. Follow it, save water, and earn Pinios Points.' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col h-full hover:bg-white/10 transition-all">
                                <div className="mb-6">
                                    <span className="text-[#38BDF8] text-xs font-bold tracking-widest uppercase block mb-2">STEP {item.step}</span>
                                    <h3 className="text-2xl font-bold">{item.title}</h3>
                                </div>
                                <div className="h-60 mb-6 rounded-2xl overflow-hidden bg-slate-900 border border-white/5">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════ GROUND TRUTHING ════ */}
            <section className="bg-[#0F172A] p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row w-full min-h-[600px]">
                    {/* Content */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex items-center justify-center bg-gradient-to-r from-[#0F172A] to-transparent z-10">
                        <div className="max-w-lg w-full bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-10">
                            <div className="text-xs font-bold tracking-widest text-[#38BDF8] mb-4 uppercase">REAL-TIME GROUND TRUTHING</div>
                            <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-6 leading-tight">
                                From the Paddy Field directly to the <span className="text-[#4ADE80]">Cloud.</span>
                            </h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                Every photo is a data point. We turn farmer activity into instantly verifiable insights for the entire water basin.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 flex items-center justify-center"><Camera size={20} className="text-[#38BDF8]" /></div>
                                    <span className="text-slate-200 font-semibold">Photo-Verified Crop Status.</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 flex items-center justify-center"><Cpu size={20} className="text-[#38BDF8]" /></div>
                                    <span className="text-slate-200 font-semibold">Instant AI Analysis & Upload.</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 flex items-center justify-center"><Users size={20} className="text-[#38BDF8]" /></div>
                                    <span className="text-slate-200 font-semibold">Connects Farmers to Basin Authorities.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="w-full md:w-1/2 relative min-h-[400px]">
                        <img src="/gambar_3.jpeg" alt="Farmer" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* ════ ROI CALCULATOR ════ */}
            <section className="bg-slate-50 py-20 md:py-32 border-t border-slate-200">
                <div className="container mx-auto max-w-7xl px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        {/* Value Prop */}
                        <div className="w-full lg:w-5/12">
                            <h2 className="font-extrabold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                                Sustainable Farming that <span className="text-[#15803D]">Pays Off.</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                See how much water and money you save by switching to IRIGAI's demand-based precision.
                            </p>
                            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                                <img src="/halaman_4.jpeg" alt="Growth" className="w-full h-auto" />
                            </div>
                        </div>

                        {/* Calculator Card */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-2xl">
                                <div className="mb-8 pb-6 border-b border-slate-100">
                                    <h3 className="text-2xl font-bold text-slate-900">ROI Calculator</h3>
                                    <p className="text-sm text-slate-400 mt-1">Estimate your annual savings</p>
                                </div>

                                <div className="mb-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-base font-semibold text-slate-700">Farm Size (Hectares)</label>
                                        <span className="text-2xl font-extrabold text-[#15803D] font-mono">{hectares} Ha</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="100" value={hectares}
                                        onChange={(e) => setHectares(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#15803D]"
                                    />
                                    <div className="flex justify-between mt-2 text-xs text-slate-400">
                                        <span>1 Ha</span><span>100 Ha</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-sky-50 rounded-2xl p-5">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">💧 Water Saved</div>
                                        <div className="text-4xl font-extrabold text-sky-700 font-mono tracking-tight">
                                            {waterSaved} <span className="text-base font-semibold text-slate-500">L/Year</span>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-2xl p-5">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">💰 Cost Reduction</div>
                                        <div className="text-4xl font-extrabold text-green-700 font-mono tracking-tight">
                                            € {costReduction} <span className="text-base font-semibold text-slate-500">/ Year</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-5 flex justify-between items-center">
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">🌱 Carbon Credits</div>
                                            <div className="text-3xl font-bold text-slate-700 font-mono">{carbonCredits} Tons</div>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/register" className="block mt-8 w-full border border-slate-300 text-slate-700 font-bold py-3.5 rounded-full text-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors">
                                    Download Full Report
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ════ FINAL CTA ════ */}
            <section className="relative py-32 text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/gambar_6.jpeg" alt="River" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-slate-900/85 to-black/90"></div>
                </div>

                <div className="container mx-auto max-w-7xl px-6 relative z-10">
                    <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight max-w-4xl mx-auto">
                        The Pinios River's journey ends here.<br />
                        <span className="text-[#38BDF8]">Its future begins with you.</span>
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Will we let it run dry, or use intelligence to keep it flowing?
                        The soft-infrastructure is ready. The choice is yours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/register">
                            <button className="bg-gradient-to-br from-green-500 to-green-400 text-green-950 px-10 py-4 rounded-full font-extrabold text-lg shadow-[0_0_35px_rgba(74,222,128,0.3)] hover:shadow-[0_0_55px_rgba(74,222,128,0.5)] transform hover:-translate-y-1 transition-all">
                                Start Saving Water Now
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all">
                                Deploy Basin Intelligence
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ════ FOOTER ════ */}
            <footer className="bg-black text-slate-400 border-t border-white/10 py-16">
                <div className="container mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="font-extrabold text-2xl text-white mb-4 tracking-tighter">IRIGAI</div>
                        <p className="text-sm max-w-xs mb-6">Empowering the Pinios River Basin with Soft-Infrastructure and AI-driven governance.</p>
                        <div className="text-xs text-slate-600">© 2026 Irigai Platform. All rights reserved.</div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Solutions</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Precision Farming</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Basin Governance</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Carbon Credits</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Impact Reports</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </footer>

        </div>
    );
}
