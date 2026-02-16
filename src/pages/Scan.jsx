import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Camera, Leaf, Mountain, ArrowLeft, ArrowRight, Droplets, Clock,
    AlertTriangle, CheckCircle, ThermometerSun, Bug, Eye,
    Upload, Image as ImageIcon, Lightbulb, Brain, ScanLine,
    Wind, Calendar, MapPin, Award
} from 'lucide-react';

const PHOTO_STEPS = [
    {
        id: 'leaf',
        label: 'Foto Daun',
        icon: <Leaf size={24} />,
        emoji: '🍃',
        title: 'Ambil Foto Daun',
        desc: 'Foto close-up daun untuk deteksi hama & penyakit.',
        tip: 'Fokus pada daun dengan gejala penyakit paling jelas.',
        aiLabel: 'Hama, Penyakit, & Defisiensi Hara',
        mockImg: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=240&fit=crop',
    },
    {
        id: 'soil',
        label: 'Foto Tanah',
        icon: <Eye size={24} />,
        emoji: '🟫',
        title: 'Ambil Foto Tanah',
        desc: 'Foto permukaan tanah untuk estimasi kelembapan.',
        tip: 'Pastikan tekstur tanah terlihat jelas (retak/basah).',
        aiLabel: 'Analisis Kelembapan Tanah Visual',
        mockImg: 'https://images.unsplash.com/photo-1586771107445-b3e7d30e1a62?w=400&h=240&fit=crop',
    },
    {
        id: 'landscape',
        label: 'Foto Lanskap',
        icon: <Mountain size={24} />,
        emoji: '🌾',
        title: 'Ambil Foto Lanskap',
        desc: 'Foto area luas untuk estimasi biomassa.',
        tip: 'Ambil dari ketinggian 2 meter mencakup satu baris tanaman.',
        aiLabel: 'Estimasi Fase Pertumbuhan & Biomassa',
        mockImg: 'https://images.unsplash.com/photo-1530836176759-855405b22d77?w=400&h=240&fit=crop',
    },
];

const PROCESSING_STEPS = [
    '📷 Analyzing leaf image...',
    '🐛 Detecting pests & diseases...',
    '🟫 Measuring soil moisture...',
    '🌾 Estimating biomass & growth stage...',
    '🛰️ Fusing Sentinel-2 NDVI data...',
    '🌡️ Loading HNMS + ECMWF weather...',
    '🧮 Calculating water requirement...',
];

const HealthGauge = ({ score }) => {
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div style={{ position: 'relative', width: radius * 2, height: radius * 2, margin: '0 auto' }}>
            <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    stroke="#E2E8F0"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                />
                <circle
                    stroke="#86A789"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                />
            </svg>
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B' }}>{score}%</div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>OPTIMAL</div>
            </div>
        </div>
    );
};

export default function Scan() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState('photos'); // photos | processing | result | done
    const [photoStep, setPhotoStep] = useState(0);
    const [photos, setPhotos] = useState([null, null, null]);
    const [procStep, setProcStep] = useState(0);

    // Mock Image Capture
    const handleCapture = (source) => {
        // source: 'camera' | 'gallery'
        const newPhotos = [...photos];
        newPhotos[photoStep] = PHOTO_STEPS[photoStep].mockImg;
        setPhotos(newPhotos);
    };

    const nextStep = () => {
        if (photoStep < 2) {
            setPhotoStep(photoStep + 1);
        } else {
            setPhase('processing');
        }
    };

    const resetScan = () => {
        setPhase('photos');
        setPhotoStep(0);
        setPhotos([null, null, null]);
        setProcStep(0);
    };

    const saveAndDashboard = () => {
        navigate('/app');
    };

    // Processing Logic
    useEffect(() => {
        if (phase === 'processing') {
            const timer = setInterval(() => {
                setProcStep(prev => {
                    if (prev >= PROCESSING_STEPS.length - 1) {
                        clearInterval(timer);
                        setTimeout(() => setPhase('result'), 500);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 600);
            return () => clearInterval(timer);
        }
    }, [phase]);

    const currentStep = PHOTO_STEPS[photoStep];
    const hasPhoto = !!photos[photoStep];

    // ===== RENDER: PROCESSING =====
    if (phase === 'processing') {
        return (
            <div style={{ padding: '40px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="processing-spinner" style={{ width: '60px', height: '60px', border: '5px solid #E2E8F0', borderTopColor: '#86A789', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '24px' }}></div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>Analisis AI Berjalan...</h3>
                <p style={{ color: '#64748B', marginBottom: '32px' }}>Menggabungkan data foto, satelit, dan cuaca.</p>

                <div style={{ textAlign: 'left', background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', width: '100%', maxWidth: '400px' }}>
                    {PROCESSING_STEPS.map((step, i) => (
                        <div key={i} style={{
                            padding: '8px 0', borderBottom: i < PROCESSING_STEPS.length - 1 ? '1px solid #F1F5F9' : 'none',
                            color: i === procStep ? '#1E293B' : i < procStep ? '#16A34A' : '#CBD5E1',
                            fontWeight: i === procStep ? 600 : 500,
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            {i < procStep ? <CheckCircle size={16} color="#16A34A" /> : i === procStep ? <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #86A789', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} /> : <div style={{ width: 16 }} />}
                            {step}
                        </div>
                    ))}
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ===== RENDER: RESULT (New Comprehensive AI Crop Report) =====
    if (phase === 'result' || phase === 'done') {
        const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        return (
            <div style={{ padding: '0 0 100px 0', background: '#FDFBF7', minHeight: '100vh' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>Laporan Kesehatan</h1>
                        <div style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={14} /> {today} • <MapPin size={14} /> Larissa, Thessaly
                        </div>
                    </div>
                </div>

                {/* Section 1: Health Score */}
                <div style={{
                    background: '#FFFFFF', borderRadius: '24px', padding: '32px', marginBottom: '24px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', textAlign: 'center', position: 'relative'
                }}>
                    <div style={{ marginBottom: '16px' }}>
                        <HealthGauge score={85} />
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748B' }}>
                        Kondisi tanaman Anda <strong style={{ color: '#16A34A' }}>Sangat Baik</strong>, namun memerlukan sedikit air tambahan.
                    </div>

                    {/* Reward Badge */}
                    <div style={{
                        position: 'absolute', top: '-10px', right: '-10px',
                        background: 'linear-gradient(135deg, #FEF08A 0%, #EAB308 100%)',
                        color: '#713F12', padding: '8px 16px', borderRadius: '20px',
                        fontWeight: 700, fontSize: '0.8rem',
                        boxShadow: '0 4px 10px rgba(234, 179, 8, 0.3)',
                        display: 'flex', alignItems: 'center', gap: '6px',
                        animation: 'float 3s ease-in-out infinite'
                    }}>
                        <Award size={16} /> +25 Pinios Points!
                    </div>
                </div>

                {/* Section 2: Actionable Insights */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>

                    {/* Card A: Water Need */}
                    <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px', background: '#F0F9FF',
                            color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'
                        }}>
                            <Droplets size={20} />
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '4px' }}>Kebutuhan Air</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284C7' }}>+12.5 L</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Hari ini</div>
                    </div>

                    {/* Card B: Pests */}
                    <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px', background: '#F0FDF4',
                            color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'
                        }}>
                            <Bug size={20} />
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '4px' }}>Hama & Penyakit</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16A34A' }}>Negatif</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Tidak terdeteksi</div>
                    </div>

                    {/* Card C: Moisture */}
                    <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px', background: '#ecfeff',
                            color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'
                        }}>
                            <Wind size={20} />
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '4px' }}>Kelembapan</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0891b2' }}>62%</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Optimal</div>
                    </div>

                    {/* Card D: Nutrients */}
                    <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px', background: '#fefce8',
                            color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'
                        }}>
                            <Leaf size={20} />
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '4px' }}>Status Nutrisi</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ca8a04' }}>Cukup</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Perlu dipantau</div>
                    </div>
                </div>

                {/* Section 4: Final Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button
                        onClick={saveAndDashboard}
                        style={{
                            width: '100%', padding: '18px',
                            background: '#86A789', color: '#FFFFFF',
                            border: 'none', borderRadius: '20px',
                            fontSize: '1rem', fontWeight: 700,
                            letterSpacing: '0.05em',
                            boxShadow: '0 10px 20px -5px rgba(134, 167, 137, 0.4)',
                            cursor: 'pointer', transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Simpan & Terapkan ke Dashboard
                    </button>

                    <button
                        onClick={resetScan}
                        style={{
                            width: '100%', padding: '18px',
                            background: 'transparent', color: '#64748B',
                            border: '2px solid #E2E8F0', borderRadius: '20px',
                            fontSize: '1rem', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#1E293B'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}
                    >
                        Scan Area Lain
                    </button>
                </div>

                <style>{`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-5px); }
                        100% { transform: translateY(0px); }
                    }
                `}</style>
            </div>
        );
    }

    // ===== RENDER: PHOTO CAPTURE (THE REVAMP) =====
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>

            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>Scan Tanaman</h1>
                <p style={{ color: '#64748B' }}>Ambil 3 foto untuk analisis komprehensif.</p>
            </div>

            {/* 1. Enhanced Progress Tracker */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
                {/* Connecting Line */}
                <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: '#E2E8F0', zIndex: 0 }}></div>

                {PHOTO_STEPS.map((step, index) => {
                    const isActive = index === photoStep;
                    const isDoneState = index < photoStep;

                    return (
                        <div key={index} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: isActive ? '48px' : '32px',
                                height: isActive ? '48px' : '32px',
                                borderRadius: '50%',
                                background: isActive ? '#86A789' : isDoneState ? '#16A34A' : '#F1F5F9',
                                color: isActive || isDoneState ? '#FFFFFF' : '#94A3B8',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                boxShadow: isActive ? '0 0 0 4px rgba(134, 167, 137, 0.2)' : 'none', // Pulsing effect static
                                border: isDoneState ? 'none' : isActive ? '2px solid #FFFFFF' : '1px solid #E2E8F0'
                            }}>
                                {isDoneState ? <CheckCircle size={isActive ? 20 : 16} /> : step.icon}
                            </div>
                            <span style={{
                                fontSize: '0.75rem', fontWeight: isActive ? 700 : 600,
                                color: isActive ? '#1E293B' : '#94A3B8',
                                transition: 'all 0.3s'
                            }}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Image Preview or Dropzone */}
            {hasPhoto ? (
                <div style={{ marginBottom: '32px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', position: 'relative' }}>
                    <img src={photos[photoStep]} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                    <button onClick={() => { const newPhotos = [...photos]; newPhotos[photoStep] = null; setPhotos(newPhotos); }}
                        style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                        Retake
                    </button>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                        <div style={{ color: '#fff', fontWeight: 600 }}><CheckCircle size={16} style={{ display: 'inline', marginRight: 6 }} /> Foto Tersimpan</div>
                    </div>
                </div>
            ) : (
                /* 2. Dual-Action Dropzone */
                <div style={{
                    border: '2px dashed #86A789', borderRadius: '24px',
                    background: '#F0FDF4', marginBottom: '32px',
                    display: 'flex', overflow: 'hidden', minHeight: '240px'
                }}>
                    {/* Camera Action */}
                    <div style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', borderRight: '1px dashed #BBF7D0', transition: 'all 0.2s', padding: '20px',
                        position: 'relative'
                    }}
                        className="dropzone-action"
                        onClick={() => handleCapture('camera')}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#DCFCE7'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                        <div style={{
                            background: '#FFFFFF', padding: '16px', borderRadius: '20px',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '16px'
                        }}>
                            <Camera size={32} color="#86A789" />
                        </div>
                        <span style={{ fontWeight: 700, color: '#166534' }}>Ambil Foto</span>
                        <span style={{ fontSize: '0.8rem', color: '#86A789' }}>Gunakan Kamera</span>
                    </div>

                    {/* Upload Action */}
                    <div style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s', padding: '20px'
                    }}
                        className="dropzone-action"
                        onClick={() => handleCapture('gallery')}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#E0F2FE'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                        <div style={{
                            background: '#FFFFFF', padding: '16px', borderRadius: '20px',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '16px'
                        }}>
                            <Upload size={32} color="#3B82F6" />
                        </div>
                        <span style={{ fontWeight: 700, color: '#1E40AF' }}>Upload File</span>
                        <span style={{ fontSize: '0.8rem', color: '#60A5FA' }}>Dari Galeri</span>
                    </div>
                </div>
            )}

            {/* 3. Info & Context Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)',
                    padding: '16px', borderRadius: '16px', border: '1px solid #FFF7ED',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#D97706', fontWeight: 700, fontSize: '0.85rem' }}>
                        <Lightbulb size={16} /> TIP
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4 }}>
                        {currentStep.tip}
                    </p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)',
                    padding: '16px', borderRadius: '16px', border: '1px solid #F3E8FF',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#9333EA', fontWeight: 700, fontSize: '0.85rem' }}>
                        <Brain size={16} /> AI SCOPE
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4 }}>
                        {currentStep.aiLabel}
                    </p>
                </div>
            </div>

            {/* 4. Action Button (Animated Reveal) */}
            <div style={{
                opacity: hasPhoto ? 1 : 0, transform: hasPhoto ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: hasPhoto ? 'auto' : 'none'
            }}>
                <button
                    onClick={nextStep}
                    style={{
                        width: '100%', padding: '20px',
                        background: '#86A789', color: '#FFFFFF',
                        border: 'none', borderRadius: '20px',
                        fontSize: '1.1rem', fontWeight: 800,
                        letterSpacing: '0.05em',
                        boxShadow: '0 20px 25px -5px rgba(134, 167, 137, 0.5)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.background = '#739076'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#86A789'; }}
                >
                    {photoStep < 2 ? (
                        <>Lanjut ke Langkah {photoStep + 2} <ArrowRight size={24} /></>
                    ) : (
                        <>MULAI ANALISIS AI <Brain size={24} /></>
                    )}
                </button>
            </div>

        </div>
    );
}
