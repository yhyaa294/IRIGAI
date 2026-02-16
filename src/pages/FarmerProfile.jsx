import { Link } from 'react-router-dom';
import {
    ArrowLeft, User, MapPin, Sprout, Droplets, Award, Tag,
    FileCheck, ChevronRight, LogOut, Globe
} from 'lucide-react';
import Logo from '../components/Logo';

export default function FarmerProfile() {
    return (
        <div className="app-content" style={{ paddingTop: 'var(--space-4)' }}>
            {/* Header */}
            <div className="profile-header">
                <div className="profile-avatar">YP</div>
                <h2>Yannis Papadopoulos</h2>
                <p>Cotton & Wheat Farmer • Larissa, Thessaly</p>
            </div>

            {/* Pinios Points */}
            <div className="app-card points-card" style={{ marginBottom: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)', marginBottom: '4px' }}>🏆 Pinios Points</div>
                        <div className="points-value">1,250</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dark-muted)' }}>Rank</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--blue-light)' }}>#23</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dark-muted)' }}>of 1,505 farmers</div>
                    </div>
                </div>
                <div style={{ marginTop: 'var(--space-4)', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dark-muted)' }}>Next: Sustainable Farming Certificate</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--blue-light)', fontWeight: 600 }}>83%</span>
                    </div>
                    <div className="gauge-bar"><div className="gauge-fill" style={{ width: '83%' }} /></div>
                </div>
            </div>

            {/* Performance */}
            <div className="profile-section">
                <h3>📊 Water Performance</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                    <div className="app-card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                        <Droplets size={20} style={{ color: 'var(--blue-primary)', marginBottom: '4px' }} />
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--blue-primary)' }}>12.4K L</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Water Saved</div>
                    </div>
                    <div className="app-card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                        <Award size={20} style={{ color: 'var(--accent-green)', marginBottom: '4px' }} />
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--accent-green)' }}>87%</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Accuracy Rate</div>
                    </div>
                </div>
            </div>

            {/* Redemption */}
            <div className="profile-section">
                <h3>🎁 Redeem Points</h3>
                {[
                    { icon: '🧪', name: 'Fertilizer Voucher', desc: '10kg NPK Subsidy', pts: '500 pts', bg: 'rgba(124,179,66,0.08)' },
                    { icon: '💰', name: 'Water Tax Discount', desc: '10% off next quarter', pts: '1,000 pts', bg: 'rgba(0,102,179,0.08)' },
                    { icon: '📜', name: 'Sustainable Certificate', desc: 'Raises crop sale price', pts: '1,500 pts', bg: 'rgba(255,152,0,0.08)' },
                    { icon: '🏅', name: 'EU CAP Incentive', desc: 'Euro subsidy eligibility', pts: '2,000 pts', bg: 'rgba(38,166,154,0.08)' },
                ].map((item, i) => (
                    <div key={i} className="redemption-card">
                        <div className="red-icon" style={{ background: item.bg }}>{item.icon}</div>
                        <div className="red-info">
                            <h4>{item.name}</h4>
                            <p>{item.desc}</p>
                        </div>
                        <div className="red-points">{item.pts}</div>
                    </div>
                ))}
            </div>

            {/* Farm Info */}
            <div className="profile-section">
                <h3>🌱 Farm Info</h3>
                {[
                    { icon: <MapPin size={16} />, label: 'Location', value: 'Larissa, Thessaly' },
                    { icon: <Globe size={16} />, label: 'Basin', value: 'DAS Pinios' },
                    { icon: <Sprout size={16} />, label: 'Crops', value: 'Cotton, Wheat' },
                    { icon: <Tag size={16} />, label: 'Farm Area', value: '3.2 Hectares' },
                    { icon: <Droplets size={16} />, label: 'Irrigation', value: 'Canal Irrigation' },
                ].map((item, i) => (
                    <div key={i} className="profile-row">
                        <div className="pr-label">{item.icon} {item.label}</div>
                        <div className="pr-value">{item.value}</div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="profile-section">
                <h3>⚙️ Settings</h3>
                <Link to="/login" className="profile-row" style={{ cursor: 'pointer' }}>
                    <div className="pr-label"><LogOut size={16} /> Logout</div>
                    <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
                <Logo size={20} />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                    IRIGAI v3.0 • Integrated River Basin Intelligence
                </p>
            </div>
        </div>
    );
}
