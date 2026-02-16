import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Camera, Map, Calendar, CloudSun, Award, Users,
    BookOpen, TrendingUp, Sparkles, Menu, X, Settings, LogOut, ChevronRight, FileText, BrainCircuit,
    Bell, Moon, Globe, User, CreditCard
} from 'lucide-react';
import Logo from './Logo';

const Sidebar = ({ isOpen, onClose, onOpenProfile, onOpenSettings }) => {
    const location = useLocation();

    const MENU_ITEMS = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/app' },
        { icon: <Camera size={20} />, label: 'Precision Analysis (CV)', path: '/app/scan' },
        { icon: <Map size={20} />, label: 'Satellite Monitor', path: '/app/map' },
        { icon: <Calendar size={20} />, label: 'Irrigation Schedule', path: '/app/schedule' },
        { icon: <CloudSun size={20} />, label: 'Weather Prediction', path: '/app/weather' },
        { icon: <FileText size={20} />, label: 'Smart Reports', path: '/app/reports' },
        { icon: <TrendingUp size={20} />, label: 'Resource Efficiency', path: '/app/resources' },
        { icon: <Award size={20} />, label: 'Pinios Rewards', path: '/app/rewards' },
        { icon: <BrainCircuit size={20} />, label: 'RIGA AI', path: '/app/riga' },
    ];

    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white border-r border-slate-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 h-16">
                <Logo />
                <button onClick={onClose} className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                    <X size={20} />
                </button>
            </div>

            {/* Menu */}
            <div className="overflow-y-auto h-[calc(100vh-8rem)] py-4 px-3 space-y-1">
                {MENU_ITEMS.map((item, index) => {
                    const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm
                                ${isActive
                                    ? 'bg-[#86A789] text-white shadow-md shadow-[#86A789]/20'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>

            {/* Footer Profile */}
            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-slate-50 cursor-pointer group">
                    <div
                        onClick={onOpenProfile}
                        className="w-10 h-10 rounded-full bg-[#86A789] flex items-center justify-center text-white font-bold shrink-0 shadow-sm overflow-hidden"
                    >
                        <img src="https://ui-avatars.com/api/?name=Yannis+P&background=86A789&color=fff" alt="YP" />
                    </div>
                    <div className="flex-1 min-w-0" onClick={onOpenProfile}>
                        <div className="text-sm font-bold text-slate-900 truncate">Yannis P.</div>
                        <div className="text-xs text-slate-500 truncate">Premium Plan</div>
                    </div>

                    {/* Settings Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onOpenSettings(); }}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Settings"
                    >
                        <Settings size={18} />
                    </button>

                    {/* Logout Button (Direct) */}
                    <Link
                        to="/"
                        className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Log Out"
                    >
                        <LogOut size={18} />
                    </Link>
                </div>
            </div>
        </aside>
    );
};

// ════ MODALS ════

const SettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-heading font-bold text-lg text-slate-900">App Settings</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 text-slate-400"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-6">
                    {/* Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={18} /></div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">Notifications</div>
                                <div className="text-xs text-slate-500">Irrigation, Weather, Pests</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86A789]"></div>
                        </label>
                    </div>

                    {/* Units */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><TrendingUp size={18} /></div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">Units</div>
                                <div className="text-xs text-slate-500">Metric (L/mm) vs Imperial</div>
                            </div>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#86A789]">
                            <option>Metric System</option>
                            <option>Imperial System</option>
                        </select>
                    </div>

                    {/* Theme */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Moon size={18} /></div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">Appearance</div>
                                <div className="text-xs text-slate-500">Light / Dark Mode</div>
                            </div>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold text-slate-800">Light</button>
                            <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-700">Dark</button>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Globe size={18} /></div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">Language</div>
                                <div className="text-xs text-slate-500">English (US)</div>
                            </div>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#86A789]">
                            <option>English (US)</option>
                            <option>Bahasa Indonesia</option>
                        </select>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-[#86A789] hover:bg-[#759678] text-white rounded-lg text-sm font-bold transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-heading font-bold text-lg text-slate-900">Farmer Profile</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 text-slate-400"><X size={20} /></button>
                </div>

                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-[#86A789] flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 border-4 border-white ring-4 ring-green-50">
                        <img src="https://ui-avatars.com/api/?name=Yannis+P&background=86A789&color=fff&size=128" alt="YP" className="rounded-full" />
                    </div>
                    <div className="w-full space-y-4">
                        <div className="text-left space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
                                <User size={16} className="text-slate-400" />
                                <input type="text" defaultValue="Yannis Papadopoulos" className="bg-transparent border-none w-full text-sm font-bold text-slate-700 focus:ring-0" />
                            </div>
                        </div>

                        <div className="text-left space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Farm ID</label>
                            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
                                <CreditCard size={16} className="text-slate-400" />
                                <span className="text-sm font-mono text-slate-500">Larissa-Block-A04</span>
                            </div>
                        </div>

                        <div className="text-left space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Subscription Status</label>
                            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3">
                                <Award size={20} className="text-amber-500" />
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Premium Plan</div>
                                    <div className="text-[10px] text-amber-600 font-bold">Valid until Dec 2026</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                    <Link to="/" className="flex-1 py-2 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 rounded-lg text-sm font-bold transition-colors flex items-center justify-center">
                        Log Out
                    </Link>
                    <button onClick={onClose} className="flex-1 py-2 bg-[#86A789] hover:bg-[#759678] text-white rounded-lg text-sm font-bold transition-colors">
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

// ════ MAIN LAYOUT ════

const WebLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <div className="flex h-screen bg-[#FDFBF7]">
            {/* Sidebar Component */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onOpenProfile={() => setShowProfileModal(true)}
                onOpenSettings={() => setShowSettingsModal(true)}
            />

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 w-full bg-white z-30 px-4 py-3 shadow-sm flex items-center justify-between border-b border-slate-100">
                <Logo />
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                    <Menu size={24} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-6 overflow-y-auto mt-16 md:mt-0">
                <Outlet />
            </main>

            {/* Modals */}
            <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
            <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
        </div>
    );
};

export default WebLayout;
