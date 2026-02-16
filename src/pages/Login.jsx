import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Smartphone, ArrowRight } from 'lucide-react';

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
    color: '#334155', fontSize: '0.95rem', width: '100%', // Slate-700
    fontFamily: 'inherit', fontWeight: 500
};

const labelStyle = {
    fontSize: '0.8rem', fontWeight: 600, color: '#64748B', // Slate-500
    letterSpacing: '0.05em', marginBottom: '6px', display: 'block'
};

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate Login
        localStorage.setItem('token', 'mock_token_' + Date.now());
        localStorage.setItem('role', 'user'); // Generic role
        navigate('/app');
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            background: '#FDFBF7', fontFamily: 'var(--font-body, "Inter", sans-serif)'
        }}>

            {/* ══ Left Column: Visual ══ */}
            <div style={{
                flex: '0 0 40%', position: 'relative',
                backgroundImage: 'url(/halaman_login.jpeg)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px',
                borderRadius: '0 32px 32px 0',
                overflow: 'hidden',
                margin: '12px 0 12px 12px'
            }}
                className="login-left-hide"
            >
                {/* Gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 100%)'
                }}></div>

                {/* Logo (Top) */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'white', padding: '4px', borderRadius: '12px' }}>
                        <img src="/logo.jpeg" alt="IRIGAI" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.05em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>IRIGAI</span>
                </div>

                {/* Quote (Bottom) */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{
                        fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', fontWeight: 700,
                        color: '#FFFFFF', lineHeight: 1.3, maxWidth: '350px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                        Water Intelligence<br />
                        <span style={{ color: '#E2E8F0' }}>for Everyone.</span>
                    </p>
                </div>
            </div>

            {/* ══ Right Column: Login Form ══ */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                padding: '48px 40px',
                overflowY: 'auto'
            }}>
                <div style={{ width: '100%', maxWidth: '420px' }}>

                    {/* Header */}
                    <h1 style={{
                        fontSize: '2rem', fontWeight: 800, color: '#1E293B', // Slate-800
                        marginBottom: '8px'
                    }}>
                        Welcome Back.
                    </h1>
                    <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '32px' }}>
                        Enter your credentials to access the dashboard.
                    </p>

                    {/* Form Card */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '24px', padding: '36px 32px',
                        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #F1F5F9'
                    }}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label style={labelStyle}>Phone Number</label>
                                <div style={inputWrapStyle}>
                                    <Smartphone size={18} color="#94A3B8" />
                                    <input
                                        style={inputStyle}
                                        placeholder="+30 6XX XXX XXXX"
                                        defaultValue="+30 698 123 4567"
                                    />
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '-8px', marginBottom: '24px' }}>
                                    We'll send a one-time login code via SMS.
                                </p>
                            </div>

                            <button type="submit" style={{
                                background: '#86A789', // Sage Green
                                color: '#FFFFFF', border: 'none',
                                padding: '16px 32px', borderRadius: '9999px',
                                fontSize: '0.95rem', fontWeight: 700,
                                cursor: 'pointer', transition: 'all 0.3s ease',
                                width: '100%', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 10px 20px -5px rgba(134, 167, 137, 0.4)',
                                letterSpacing: '0.02em'
                            }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#739076'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#86A789'; }}>
                                Send Login Code <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <p style={{
                        textAlign: 'center', marginTop: '28px',
                        fontSize: '0.85rem', color: '#64748B'
                    }}>
                        New to IRIGAI?{' '}
                        <Link to="/onboarding" style={{
                            color: '#86A789', textDecoration: 'none', fontWeight: 700,
                            transition: 'color 0.2s'
                        }}
                            onMouseOver={(e) => e.target.style.color = '#739076'}
                            onMouseOut={(e) => e.target.style.color = '#86A789'}>
                            Register Farm
                        </Link>
                    </p>
                </div>
            </div>

            {/* Responsive CSS */}
            <style>{`
                @media (max-width: 768px) {
                    .login-left-hide { display: none !important; }
                }
            `}</style>
        </div>
    );
}
