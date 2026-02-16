import { Link } from 'react-router-dom';
import {
    ArrowLeft, Droplets, TrendingUp, Award, Calendar
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const weeklyData = [
    { day: 'Mon', liters: 4200, target: 4500 },
    { day: 'Tue', liters: 3800, target: 4200 },
    { day: 'Wed', liters: 5100, target: 5000 },
    { day: 'Thu', liters: 4500, target: 4500 },
    { day: 'Fri', liters: 0, target: 4800 },
    { day: 'Sat', liters: 3200, target: 3500 },
    { day: 'Sun', liters: 4000, target: 4200 },
];

const historyItems = [
    { date: 'Feb 16', crop: 'Cotton', recommendation: '4,500 L', actual: '4,500 L', status: 'followed', points: '+50', time: '16:00' },
    { date: 'Feb 15', crop: 'Cotton', recommendation: '4,200 L', actual: '4,000 L', status: 'followed', points: '+45', time: '17:00' },
    { date: 'Feb 14', crop: 'Wheat', recommendation: '3,800 L', actual: '5,100 L', status: 'over', points: '+10', time: '15:30' },
    { date: 'Feb 13', crop: 'Cotton', recommendation: '4,500 L', actual: '4,500 L', status: 'followed', points: '+50', time: '16:30' },
    { date: 'Feb 12', crop: 'Wheat', recommendation: '3,500 L', actual: '3,200 L', status: 'followed', points: '+45', time: '17:00' },
    { date: 'Feb 11', crop: 'Cotton', recommendation: '4,800 L', actual: '4,600 L', status: 'followed', points: '+48', time: '16:00' },
];

const tooltipStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-light)',
    borderRadius: '8px',
    fontSize: '0.8rem',
};

export default function History() {
    return (
        <div className="app-content" style={{ paddingTop: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                <Link to="/app" style={{ display: 'flex', color: 'var(--text-primary)' }}><ArrowLeft size={22} /></Link>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>Irrigation History</h2>
            </div>

            {/* Summary */}
            <div className="summary-bar">
                <div className="app-card summary-item">
                    <div className="si-value">25.8K</div>
                    <div className="si-label">Liters Used</div>
                </div>
                <div className="app-card summary-item">
                    <div className="si-value" style={{ color: 'var(--accent-green)' }}>87%</div>
                    <div className="si-label">Compliance</div>
                </div>
                <div className="app-card summary-item">
                    <div className="si-value" style={{ color: 'var(--warning)' }}>248</div>
                    <div className="si-label">Points Earned</div>
                </div>
            </div>

            {/* Weekly Chart */}
            <div className="app-card" style={{ marginBottom: 'var(--space-5)' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                    <Calendar size={14} /> This Week
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={weeklyData} barGap={2}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={11} stroke="var(--text-muted)" />
                        <YAxis hide />
                        <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value.toLocaleString()} L`} />
                        <Bar dataKey="target" fill="var(--bg-secondary)" radius={[4, 4, 0, 0]} name="Target" />
                        <Bar dataKey="liters" fill="var(--blue-primary)" radius={[4, 4, 0, 0]} name="Actual" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* History Log */}
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                Scan History
            </h3>

            {historyItems.map((item, i) => (
                <div key={i} className="app-card history-card">
                    <div className="history-thumb" style={{
                        background: item.status === 'followed' ? 'rgba(76,175,80,0.08)' : 'rgba(255,152,0,0.08)',
                        color: item.status === 'followed' ? 'var(--success)' : 'var(--warning)',
                    }}>
                        {item.status === 'followed' ? '✅' : '⚠️'}
                    </div>
                    <div className="history-info">
                        <h4>{item.crop} — {item.date}</h4>
                        <p>Rec: {item.recommendation} • Done: {item.actual} • {item.time}</p>
                    </div>
                    <div className="history-amount">
                        {item.points}
                        <span>Points</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
