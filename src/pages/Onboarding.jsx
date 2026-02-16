import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, MapPin, Ruler, Wheat, CalendarDays, ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
    { num: 1, label: 'Account Basics' },
    { num: 2, label: 'Farm Details' },
    { num: 3, label: 'Crop Info' }
];

const regions = ['Larissa', 'Trikala', 'Karditsa', 'Magnesia', 'Farsala', 'Tyrnavos'];
const crops = ['Cotton', 'Corn', 'Wheat', 'Olives', 'Rice', 'Vegetables', 'Alfalfa'];

// Shared styles
const inputWrapStyle = {
    display: 'flex', alignItems: 'center', gap: '12px',
    background: '#F8FAFC', // Slate-50
    border: '1px solid #E2E8F0', // Slate-200
    borderRadius: '14px', padding: '14px 16px',
    marginBottom: '16px', transition: 'all 0.2s ease',
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
};

const inputStyle = {
    background: 'transparent', border: 'none', outline: 'none',
    color: '#334155', fontSize: '0.95rem', width: '100%',
    fontFamily: 'inherit', fontWeight: 500
};

const selectStyle = {
    ...inputStyle,
    appearance: 'none', cursor: 'pointer'
};

const labelStyle = {
    fontSize: '0.8rem', fontWeight: 600, color: '#64748B',
    letterSpacing: '0.05em', marginBottom: '6px', display: 'block'
};

const primaryBtnStyle = {
    background: '#86A789', // Sage Green
    color: '#FFFFFF', border: 'none',
    padding: '16px 32px', borderRadius: '9999px',
    fontSize: '0.95rem', fontWeight: 700,
    cursor: 'pointer', transition: 'all 0.3s ease',
    display: 'flex', alignItems: 'center', gap: '8px',
    justifyContent: 'center', width: '100%',
    boxShadow: '0 10px 20px -5px rgba(134, 167, 137, 0.4)',
    letterSpacing: '0.02em'
};

const backBtnStyle = {
    background: 'transparent', border: 'none',
    color: '#94A3B8', fontSize: '0.85rem',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
    padding: '8px 0', transition: 'color 0.2s'
};

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        fullName: '', phone: '', region: '', area: '', crop: '', plantDate: ''
    });
    const navigate = useNavigate();

    // Smart Redirect: If user already has a token, redirect based on role
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            if (role === 'government') navigate('/gov');
            else navigate('/app');
        }
    }, [navigate]);

    const update = (key, val) => setForm({ ...form, [key]: val });

    const handleFinish = () => {
        // Complete Registration -> Log them in as farmer
        localStorage.setItem('token', 'mock_token_' + Date.now());
        localStorage.setItem('role', 'farmer');
        navigate('/app');
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            background: '#FDFBF7', fontFamily: 'var(--font-body, "Inter", sans-serif)'
        }}>

            {/* ══ Left Column: Visual ══ */}
            <div style={{
                flex: '0 0 45%', position: 'relative',
                backgroundImage: 'url(/halaman_regist.jpeg)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                display: 'flex', alignItems: 'flex-end',
                padding: '48px',
                borderRadius: '0 32px 32px 0',
                overflow: 'hidden',
                margin: '12px 0 12px 12px'
            }}
                className="onboarding-left-hide"
            >
                {/* Gradient overlay - lighter */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 100%)'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700,
                        color: '#FFFFFF', lineHeight: 1.3, maxWidth: '400px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>
                        Precision starts with good data.{' '}
                        <span style={{ color: '#E2E8F0' }}>Tell us about your farm.</span>
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#F1F5F9', marginTop: '12px', fontWeight: 500 }}>
                        3 simple steps to unlock satellite intelligence.
                    </p>
                </div>
            </div>

            {/* ══ Right Column: Wizard ══ */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', padding: '48px 40px',
                overflowY: 'auto', maxWidth: '600px', margin: '0 auto'
            }}>

                {/* Progress Bar */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: '12px'
                    }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Step {step} of 3
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#86A789', fontWeight: 700 }}>
                            {STEPS[step - 1].label}
                        </span>
                    </div>

                    {/* Bar Track */}
                    <div style={{
                        height: '6px', borderRadius: '9999px',
                        background: '#E2E8F0', overflow: 'hidden' // Slate-200
                    }}>
                        <div style={{
                            height: '100%', borderRadius: '9999px',
                            background: '#86A789', // Sage Green
                            width: `${(step / 3) * 100}%`,
                            transition: 'width 0.4s ease'
                        }}></div>
                    </div>

                    {/* Step Indicators */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                        {STEPS.map((s) => (
                            <div key={s.num} style={{
                                display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                <div style={{
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.75rem', fontWeight: 700,
                                    background: step > s.num ? '#86A789' : step === s.num ? '#F0FDF4' : '#F1F5F9',
                                    color: step > s.num ? '#FFFFFF' : step === s.num ? '#86A789' : '#94A3B8',
                                    border: step === s.num ? '2px solid #86A789' : '1px solid transparent',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {step > s.num ? <CheckCircle2 size={14} /> : s.num}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '24px', padding: '40px 32px',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #F1F5F9'
                }}>

                    {/* ─── Step 1: Account Basics ─── */}
                    {step === 1 && (
                        <div>
                            <h2 style={{
                                fontSize: '1.5rem', fontWeight: 700, color: '#1E293B',
                                marginBottom: '8px'
                            }}>
                                Let's create your profile.
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '28px' }}>
                                Start with the basics — your identity matters.
                            </p>

                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <div style={inputWrapStyle}>
                                    <User size={18} color="#94A3B8" />
                                    <input
                                        style={inputStyle}
                                        placeholder="e.g. Yannis Papadopoulos"
                                        value={form.fullName}
                                        onChange={(e) => update('fullName', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Phone Number</label>
                                <div style={inputWrapStyle}>
                                    <Phone size={18} color="#94A3B8" />
                                    <input
                                        style={inputStyle}
                                        placeholder="+30 6XX XXX XXXX"
                                        value={form.phone}
                                        onChange={(e) => update('phone', e.target.value)}
                                    />
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '-8px', marginBottom: '20px' }}>
                                    We'll send an OTP for verification.
                                </p>
                            </div>

                            <button
                                style={primaryBtnStyle}
                                onClick={() => setStep(2)}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#739076'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#86A789'; }}
                            >
                                Next: Farm Details <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* ─── Step 2: Your Land Profile ─── */}
                    {step === 2 && (
                        <div>
                            <h2 style={{
                                fontSize: '1.5rem', fontWeight: 700, color: '#1E293B',
                                marginBottom: '8px'
                            }}>
                                Where is your land located?
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '28px' }}>
                                We need this to calibrate satellite coverage for your farm.
                            </p>

                            <div>
                                <label style={labelStyle}>Region / Village in Pinios Basin</label>
                                <div style={inputWrapStyle}>
                                    <MapPin size={18} color="#94A3B8" />
                                    <select
                                        style={selectStyle}
                                        value={form.region}
                                        onChange={(e) => update('region', e.target.value)}
                                    >
                                        <option value="" disabled style={{ color: '#94A3B8' }}>Select your region...</option>
                                        {regions.map((r) => (
                                            <option key={r} value={r} style={{ color: '#1E293B' }}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Total Area Size (Hectares)</label>
                                <div style={inputWrapStyle}>
                                    <Ruler size={18} color="#94A3B8" />
                                    <input
                                        style={inputStyle}
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g. 10.5"
                                        value={form.area}
                                        onChange={(e) => update('area', e.target.value)}
                                    />
                                    <span style={{ color: '#94A3B8', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Ha</span>
                                </div>
                            </div>

                            <button
                                style={primaryBtnStyle}
                                onClick={() => setStep(3)}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#739076'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#86A789'; }}
                            >
                                Next: Crop Info <ArrowRight size={18} />
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                <button style={backBtnStyle} onClick={() => setStep(1)}
                                    onMouseOver={(e) => e.currentTarget.style.color = '#334155'}
                                    onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ─── Step 3: Crop Info ─── */}
                    {step === 3 && (
                        <div>
                            <h2 style={{
                                fontSize: '1.5rem', fontWeight: 700, color: '#1E293B',
                                marginBottom: '8px'
                            }}>
                                Tell AI about your crops.
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '28px' }}>
                                This helps our model predict water needs with precision.
                            </p>

                            <div>
                                <label style={labelStyle}>Primary Crop Type</label>
                                <div style={inputWrapStyle}>
                                    <Wheat size={18} color="#94A3B8" />
                                    <select
                                        style={selectStyle}
                                        value={form.crop}
                                        onChange={(e) => update('crop', e.target.value)}
                                    >
                                        <option value="" disabled style={{ color: '#94A3B8' }}>Select your crop...</option>
                                        {crops.map((c) => (
                                            <option key={c} value={c} style={{ color: '#1E293B' }}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Planting Date</label>
                                <div style={inputWrapStyle}>
                                    <CalendarDays size={18} color="#94A3B8" />
                                    <input
                                        style={{ ...inputStyle, colorScheme: 'light' }}
                                        type="date"
                                        value={form.plantDate}
                                        onChange={(e) => update('plantDate', e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                style={{ ...primaryBtnStyle, padding: '18px 32px', fontSize: '1rem', fontWeight: 800 }}
                                onClick={handleFinish}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#739076'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#86A789'; }}
                            >
                                Complete Registration & Enter Dashboard
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                <button style={backBtnStyle} onClick={() => setStep(2)}
                                    onMouseOver={(e) => e.currentTarget.style.color = '#334155'}
                                    onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <p style={{
                        fontSize: '0.9rem', color: '#94A3B8', marginBottom: '12px'
                    }}>
                        Sudah punya akun?{' '}
                        <Link to="/login" style={{
                            color: '#86A789', fontWeight: 700, textDecoration: 'none'
                        }}
                            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                            Masuk di sini
                        </Link>
                    </p>
                    <p style={{
                        fontSize: '0.75rem', color: '#94A3B8'
                    }}>
                        Your data is encrypted and only used for satellite calibration.<br />
                        <a href="#" style={{ color: '#64748B', textDecoration: 'underline' }}>Privacy Policy</a>
                    </p>
                </div>
            </div>

            {/* Responsive CSS for hiding left column on mobile */}
            <style>{`
                @media (max-width: 768px) {
                    .onboarding-left-hide { display: none !important; }
                }
            `}</style>
        </div>
    );
}
