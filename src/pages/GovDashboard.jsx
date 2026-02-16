import { Link } from 'react-router-dom';
import {
    Droplets, TrendingUp, TrendingDown, Shield, LogOut, Users,
    MapPin, AlertTriangle, CheckCircle
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import Logo from '../components/Logo';

// Eco-Futurism Palette
const COLORS = {
    active: '#39FF14',   // Neon Green
    cyan: '#00E5FF',     // Cyan Tech
    blue: '#2979FF',     // Ocean Blue
    warning: '#FFD600',  // Yellow
    danger: '#FF1744',   // Red
    muted: '#78909C'     // Muted Blue-Gray
};

const usageTrend = [
    { month: 'Sep', actual: 82, allocated: 100 },
    { month: 'Oct', actual: 75, allocated: 95 },
    { month: 'Nov', actual: 68, allocated: 90 },
    { month: 'Dec', actual: 55, allocated: 85 },
    { month: 'Jan', actual: 48, allocated: 80 },
    { month: 'Feb', actual: 42, allocated: 78 },
];

const allocationData = [
    { name: 'Agriculture', value: 62, color: COLORS.active },
    { name: 'Domestic', value: 18, color: COLORS.cyan },
    { name: 'Industrial', value: 12, color: COLORS.warning },
    { name: 'Ecological', value: 8, color: COLORS.blue },
];

const zones = [
    { name: 'Upper Pinios', farmers: 342, area: '1,240 ha', efficiency: 92, risk: 'low', color: COLORS.active },
    { name: 'Middle Pinios', farmers: 518, area: '2,100 ha', efficiency: 85, risk: 'low', color: COLORS.cyan },
    { name: 'Lower Pinios', farmers: 287, area: '980 ha', efficiency: 78, risk: 'moderate', color: COLORS.warning },
    { name: 'East Thessaly', farmers: 195, area: '760 ha', efficiency: 88, risk: 'low', color: COLORS.blue },
    { name: 'West Thessaly', farmers: 163, area: '540 ha', efficiency: 71, risk: 'high', color: COLORS.danger },
];

const complianceItems = [
    { label: 'River Ecological Flow', value: '92%', status: 'green' },
    { label: 'Groundwater Abstraction', value: '84%', status: 'green' },
    { label: 'Water Efficiency Target', value: '87%', status: 'green' },
    { label: 'Quality Monitoring', value: '68%', status: 'yellow' },
    { label: 'Drought Preparedness', value: '45%', status: 'red' },
];

const tooltipStyle = {
    background: 'rgba(5, 14, 26, 0.95)',
    border: '1px solid rgba(57, 255, 20, 0.3)',
    borderRadius: '8px',
    fontSize: '0.8rem',
    color: '#fff',
    boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)'
};

export default function GovDashboard() {
    return (
        <div className="gov-shell">
            {/* Header */}
            <div className="gov-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <Link to="/" style={{ display: 'flex' }}>
                        <Logo size={28} />
                    </Link>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '2px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', letterSpacing: '0.05em' }}>
                        EXECUTIVE DASHBOARD
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div className="live-indicator"><div className="live-dot" /><span>LIVE DATA</span></div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                        {new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
                    </span>
                    <Link to="/login" style={{ color: 'var(--text-secondary)', display: 'flex' }}><LogOut size={18} /></Link>
                </div>
            </div>

            <div className="gov-content">
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, marginBottom: 'var(--space-1)', letterSpacing: '-0.02em' }}>
                        PINIOS BASIN <span className="text-neon">INTELLIGENCE</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        Real-time hydro-informatics • Thessaly, Greece
                    </p>
                </div>

                {/* Stats */}
                <div className="gov-stats">
                    {[
                        { label: 'Active Farmers', value: '1,505', change: '+12%', positive: true },
                        { label: 'Monitored Area', value: '5,620 ha', change: '+8%', positive: true },
                        { label: 'Water Saved', value: '1.2M L', change: '+24%', positive: true },
                        { label: 'Drought Risk', value: 'Moderate', change: '2 zones', positive: false },
                    ].map((stat, i) => (
                        <div key={i} className="gov-stat-card">
                            <div className="gsc-label">{stat.label.toUpperCase()}</div>
                            <div className="gsc-value">{stat.value}</div>
                            <div className={`gsc-change ${stat.positive ? 'positive' : 'negative'}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Heat Map + Charts */}
                <div className="gov-charts">
                    {/* Basin Heat Map */}
                    <div className="gov-card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <MapPin size={16} className="text-neon" /> BASIN RISK HEATMAP
                        </h3>
                        <div className="heat-map">
                            {/* Visual zones mapped to neon palette */}
                            <div className="heat-zone" style={{ top: '10%', left: '15%', width: '35%', height: '30%', background: `${COLORS.active}40`, border: `1px solid ${COLORS.active}80` }}>Upper (92%)</div>
                            <div className="heat-zone" style={{ top: '25%', left: '50%', width: '40%', height: '25%', background: `${COLORS.cyan}40`, border: `1px solid ${COLORS.cyan}80` }}>Middle (85%)</div>
                            <div className="heat-zone" style={{ top: '55%', left: '10%', width: '38%', height: '30%', background: `${COLORS.warning}40`, border: `1px solid ${COLORS.warning}80` }}>Lower (78%)</div>
                            <div className="heat-zone" style={{ top: '50%', left: '52%', width: '32%', height: '22%', background: `${COLORS.blue}40`, border: `1px solid ${COLORS.blue}80` }}>East (88%)</div>
                            <div className="heat-zone" style={{ top: '75%', left: '50%', width: '28%', height: '20%', background: `${COLORS.danger}40`, border: `1px solid ${COLORS.danger}80` }}>West (71%)</div>

                            {/* River line */}
                            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                                <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                                <path d="M 80 20 Q 120 80, 100 130 T 150 200 T 120 260" stroke={COLORS.cyan} fill="none" strokeWidth="2" strokeDasharray="4,4" filter="url(#glow)" opacity="0.6" />
                                <text x="85" y="15" fill={COLORS.cyan} fontSize="10" fontWeight="600" opacity="0.8">Pinios R.</text>
                            </svg>
                        </div>
                    </div>

                    {/* Water Allocation Pie */}
                    <div className="gov-card">
                        <h3>WATER ALLOCATION</h3>
                        <ResponsiveContainer width="100%" height={230}>
                            <PieChart>
                                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                                    {allocationData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                                </Pie>
                                <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}%`} />
                                <Legend iconSize={8} formatter={(value) => <span style={{ color: COLORS.muted }}>{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>

                        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', background: 'rgba(57, 255, 20, 0.05)', border: '1px solid rgba(57, 255, 20, 0.15)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>TOTAL SAVED (MONTH)</div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: COLORS.active, textShadow: '0 0 10px rgba(57,255,20,0.3)' }}>1.2M Liters</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="gov-bottom">
                    {/* Usage Trend */}
                    <div className="gov-card">
                        <h3>USAGE vs ALLOCATION (MCM)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={usageTrend}>
                                <defs>
                                    <linearGradient id="colorAlloc" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={COLORS.active} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={COLORS.active} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke={COLORS.muted} fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis stroke={COLORS.muted} fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend iconType="circle" />
                                <Area type="monotone" dataKey="allocated" stroke={COLORS.cyan} fill="url(#colorAlloc)" strokeWidth={2} name="Allocated Limit" />
                                <Area type="monotone" dataKey="actual" stroke={COLORS.active} fill="url(#colorActual)" strokeWidth={2} name="Actual Usage" />
                            </AreaChart>
                        </ResponsiveContainer>

                        {/* Zone List */}
                        <div style={{ marginTop: 'var(--space-4)' }}>
                            {zones.map((zone, i) => (
                                <div key={i} className="zone-item">
                                    <div className="zone-color" style={{ background: zone.color, boxShadow: `0 0 8px ${zone.color}` }} />
                                    <div className="zone-info">
                                        <h4>{zone.name}</h4>
                                        <p>{zone.farmers} farmers • {zone.area}</p>
                                    </div>
                                    <div className="zone-efficiency" style={{ color: zone.efficiency >= 80 ? COLORS.active : zone.efficiency >= 70 ? COLORS.warning : COLORS.danger }}>
                                        {zone.efficiency}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EU WFD Compliance */}
                    <div className="gov-card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Shield size={16} className="text-neon" /> EU WFD COMPLIANCE
                        </h3>

                        {complianceItems.map((item, i) => (
                            <div key={i} className="compliance-item">
                                <div className="ci-status" style={{
                                    background: item.status === 'green' ? COLORS.active : item.status === 'yellow' ? COLORS.warning : COLORS.danger,
                                    boxShadow: `0 0 6px ${item.status === 'green' ? COLORS.active : item.status === 'yellow' ? COLORS.warning : COLORS.danger}`
                                }} />
                                <div className="ci-label">{item.label}</div>
                                <div className="ci-value" style={{
                                    color: item.status === 'green' ? COLORS.active : item.status === 'yellow' ? COLORS.warning : COLORS.danger
                                }}>
                                    {item.value}
                                </div>
                            </div>
                        ))}

                        {/* CAP Incentive */}
                        <div style={{
                            marginTop: 'var(--space-5)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
                            background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.15)',
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>EU CAP INCENTIVES</div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: COLORS.cyan, textShadow: '0 0 10px rgba(0,229,255,0.3)' }}>€42,500</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Distributed to 847 farmers</div>
                        </div>

                        {/* Pinios Points total */}
                        <div style={{
                            marginTop: 'var(--space-3)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
                            background: 'rgba(57, 255, 20, 0.05)', border: '1px solid rgba(57, 255, 20, 0.15)',
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>PINIOS POINTS ISSUED</div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: COLORS.active, textShadow: '0 0 10px rgba(57,255,20,0.3)' }}>187.5K</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
