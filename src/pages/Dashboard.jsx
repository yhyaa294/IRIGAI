import { Link } from 'react-router-dom';
import {
    Droplets, Camera, TrendingUp, Leaf, Award, ArrowRight, Star
} from 'lucide-react';
import Logo from '../components/Logo';

export default function FarmerHome() {
    return (
        <div className="app-content">
            {/* Header */}
            <div className="app-header">
                <div>
                    <div className="greeting">Good Morning ☀️</div>
                    <div className="greeting-name">Yannis Papadopoulos</div>
                </div>
                <Logo size={24} showText={false} />
            </div>

            {/* Weather Card */}
            <div className="app-card weather-card">
                <div className="weather-main">
                    <div className="weather-temp">28°</div>
                    <div className="weather-details">
                        <div className="weather-location">Larissa, Thessaly</div>
                        <div>Partly Cloudy • HNMS</div>
                    </div>
                </div>
                <div className="weather-grid">
                    <div className="weather-item">
                        <div className="weather-val">62%</div>
                        <div className="weather-label">Humidity</div>
                    </div>
                    <div className="weather-item">
                        <div className="weather-val">12 km/h</div>
                        <div className="weather-label">Wind</div>
                    </div>
                    <div className="weather-item">
                        <div className="weather-val">2.1 mm</div>
                        <div className="weather-label">Rain</div>
                    </div>
                    <div className="weather-item">
                        <div className="weather-val">6.2</div>
                        <div className="weather-label">ET₀ mm/d</div>
                    </div>
                </div>
            </div>

            {/* BIG SCAN CTA */}
            <Link to="/app/scan" style={{ textDecoration: 'none' }}>
                <div className="scan-cta-card">
                    <div className="scan-cta-icon">
                        <Camera size={32} />
                    </div>
                    <h3>Cek Kondisi Tanaman</h3>
                    <p>Take 3 photos → Get AI recommendation</p>
                </div>
            </Link>

            {/* Pinios Points */}
            <div className="app-card points-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', position: 'relative', zIndex: 1 }}>
                    <Award size={18} style={{ color: 'var(--blue-light)' }} />
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-white)' }}>Pinios Points</h3>
                </div>
                <div className="points-value" style={{ position: 'relative', zIndex: 1 }}>1,250 Points</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginTop: 'var(--space-2)', position: 'relative', zIndex: 1 }}>
                    +50 earned yesterday for following recommendations
                </div>
                <div style={{ marginTop: 'var(--space-3)', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dark-muted)' }}>Next reward: Fertilizer Voucher</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--blue-light)', fontWeight: 600 }}>78%</span>
                    </div>
                    <div className="gauge-bar">
                        <div className="gauge-fill" style={{ width: '78%' }} />
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="app-card quick-stat">
                    <div className="qs-icon" style={{ background: 'rgba(0,102,179,0.08)', color: 'var(--blue-primary)' }}>
                        <Droplets size={20} />
                    </div>
                    <div className="qs-value" style={{ color: 'var(--blue-primary)' }}>12.4K L</div>
                    <div className="qs-label">Water Saved</div>
                </div>
                <div className="app-card quick-stat">
                    <div className="qs-icon" style={{ background: 'rgba(124,179,66,0.08)', color: 'var(--accent-green)' }}>
                        <TrendingUp size={20} />
                    </div>
                    <div className="qs-value" style={{ color: 'var(--accent-green)' }}>87%</div>
                    <div className="qs-label">Efficiency</div>
                </div>
                <div className="app-card quick-stat">
                    <div className="qs-icon" style={{ background: 'rgba(38,166,154,0.08)', color: 'var(--accent-teal)' }}>
                        <Leaf size={20} />
                    </div>
                    <div className="qs-value" style={{ color: 'var(--accent-teal)' }}>3.2 ha</div>
                    <div className="qs-label">Monitored</div>
                </div>
                <div className="app-card quick-stat">
                    <div className="qs-icon" style={{ background: 'rgba(255,152,0,0.08)', color: 'var(--warning)' }}>
                        <Star size={20} />
                    </div>
                    <div className="qs-value" style={{ color: 'var(--warning)' }}>48</div>
                    <div className="qs-label">Total Scans</div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="app-card" style={{ marginTop: 'var(--space-4)' }}>
                <div className="app-card-header">
                    <h3>Recent Activity</h3>
                    <Link to="/app/history" style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        See All <ArrowRight size={14} />
                    </Link>
                </div>
                {[
                    { icon: <Camera size={16} />, title: 'Crop Scan — Cotton', desc: '4,500L recommended • 📍 Zone A', time: '2h ago', bg: 'rgba(0,102,179,0.08)', color: 'var(--blue-primary)' },
                    { icon: <Droplets size={16} />, title: 'Irrigation Done ✅', desc: '4,500L applied • +50 Points', time: '6h ago', bg: 'rgba(76,175,80,0.08)', color: 'var(--success)' },
                    { icon: <Award size={16} />, title: 'Points Earned! 🎉', desc: 'Water savings validated by satellite', time: 'Yesterday', bg: 'rgba(255,152,0,0.08)', color: 'var(--warning)' },
                ].map((item, i) => (
                    <div key={i} className="activity-item">
                        <div className="activity-dot" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
                        <div className="activity-text">
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                        <div className="activity-time">{item.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
