import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Camera, Map, Calendar, CloudSun, Award, Users,
    BookOpen, TrendingUp, Sparkles, Menu, X, Settings, LogOut, ChevronRight
} from 'lucide-react';
import Logo from './Logo';

export default function WebLayout() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const MENU_ITEMS = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/app' },
        { icon: <Camera size={20} />, label: 'Precision Analysis (CV)', path: '/app/scan' },
        { icon: <Map size={20} />, label: 'Pantauan Satelit', path: '/app/map' },
        { icon: <Calendar size={20} />, label: 'Jadwal Irigasi', path: '/app/schedule' },
        { icon: <CloudSun size={20} />, label: 'Prediksi Cuaca', path: '/app/weather' },
        { icon: <Award size={20} />, label: 'Resource Efficiency', path: '/app/points' },
        { icon: <Users size={20} />, label: 'Forum Petani', path: '/app/community' },
        { icon: <BookOpen size={20} />, label: 'Pusat Edukasi', path: '/app/wiki' },
        { icon: <TrendingUp size={20} />, label: 'Analisis Biaya', path: '/app/roi' },
        { icon: <Sparkles size={20} />, label: 'Aura AI', path: '/app/aura' },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#FFFFFF', // Main content bg
            fontFamily: 'var(--font-body, "Inter", sans-serif)',
            display: 'flex'
        }}>
            {/* ══ Mobile Header (Visible on small screens) ══ */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
                background: '#FDFBF7', borderBottom: '1px solid #F1F5F9',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px',
                zIndex: 50
            }} className="mobile-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: '#1E293B' }}>
                        <Menu size={24} />
                    </button>
                    <Logo size={24} />
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#86A789', overflow: 'hidden' }}>
                    <img src="https://ui-avatars.com/api/?name=Yannis+P&background=86A789&color=fff" alt="User" />
                </div>
            </div>

            {/* ══ Sidebar (Fixed Left) ══ */}
            <aside style={{
                width: '260px',
                background: '#FDFBF7', // Soft Cream
                borderRight: '1px solid #F1F5F9',
                position: 'fixed', top: 0, bottom: 0, left: 0,
                zIndex: 60,
                padding: '24px',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', // Default hidden on mobile
            }} className="sidebar">

                {/* Logo Area */}
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Logo size={32} />
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', fontFamily: 'var(--font-heading)' }}>IRIGAI</span>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={toggleSidebar} className="mobile-close-btn" style={{ background: 'none', border: 'none', color: '#64748B' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Menu */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
                    {MENU_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)} // Close on click (mobile)
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    background: isActive ? 'rgba(134, 167, 137, 0.1)' : 'transparent', // bg-[#86A789]/10
                                    color: isActive ? '#1E293B' : '#64748B',
                                    position: 'relative'
                                }}
                            >
                                {/* Active Indicator Line */}
                                {isActive && (
                                    <div style={{
                                        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                                        width: '4px', height: '24px',
                                        background: '#86A789',
                                        borderTopRightRadius: '4px', borderBottomRightRadius: '4px'
                                    }} />
                                )}

                                <div style={{ color: isActive ? '#1E293B' : '#94A3B8' }}>{item.icon}</div>
                                <span style={{
                                    fontSize: '13px',
                                    fontWeight: isActive ? 600 : 500,
                                    letterSpacing: '0.01em'
                                }}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer: Profile & Settings */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px', marginTop: '20px' }}>
                    <Link to="/app/profile" style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '10px',
                        borderRadius: '12px', textDecoration: 'none', color: '#1E293B',
                        marginBottom: '8px', transition: 'background 0.2s'
                    }} onMouseOver={(e) => e.currentTarget.style.background = '#F1F5F9'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#86A789', overflow: 'hidden' }}>
                            <img src="https://ui-avatars.com/api/?name=Yannis+P&background=86A789&color=fff" alt="Yannis" width="100%" height="100%" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Yannis P.</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Premium Plan</div>
                        </div>
                        <Settings size={16} color="#94A3B8" />
                    </Link>

                    <Link to="/login" style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '10px',
                        borderRadius: '12px', textDecoration: 'none', color: '#64748B',
                        fontSize: '13px', fontWeight: 500
                    }} onMouseOver={(e) => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#EF4444' }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' }}>
                        <LogOut size={18} />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* ══ Main Content Overlay (Mobile) ══ */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, bg: 'rgba(0,0,0,0.5)', zIndex: 55,
                        background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)'
                    }}
                    className="sidebar-overlay"
                />
            )}

            {/* ══ Main Content Area ══ */}
            <main style={{
                flex: 1,
                marginLeft: '0', // Mobile default
                padding: '24px',
                paddingTop: '80px', // Header height
                width: '100%',
                maxWidth: '100%',
                background: '#FFFFFF'
            }} className="main-content">
                <Outlet />
            </main>

            {/* Responsive Styles Injection */}
            <style>{`
                /* Desktop Styles */
                @media (min-width: 1024px) {
                    .sidebar {
                        transform: translateX(0) !important; /* Always visible */
                        box-shadow: 1px 0 0 #F1F5F9;
                    }
                    .mobile-header {
                        display: none !important;
                    }
                    .mobile-close-btn {
                        display: none !important;
                    }
                    .main-content {
                        margin-left: 260px !important;
                        padding-top: 32px !important;
                    }
                    .sidebar-overlay {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
