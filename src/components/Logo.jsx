export default function Logo({ size = 36, showText = false }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
                background: '#fff',
                borderRadius: '50%',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: size * 1.3,
                width: size * 1.3,
                overflow: 'hidden',
                boxShadow: '0 0 15px rgba(57, 255, 20, 0.3)'
            }}>
                <img
                    src="/logo.jpeg"
                    alt="IRIGAI Logo"
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>
            {showText && (
                <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: size * 0.4,
                    letterSpacing: '0.05em',
                    background: 'linear-gradient(135deg, #39FF14, #00C853)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 10px rgba(57, 255, 20, 0.4)'
                }}>
                    IRIGAI
                </span>
            )}
        </div>
    );
}
