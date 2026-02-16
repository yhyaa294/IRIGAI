import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, ArrowRight } from 'lucide-react';

const MENU_ITEMS = [
  {
    label: 'SOLUTIONS',
    items: [
      { name: 'Precision Farming', desc: 'For individual farmers' },
      { name: 'Basin Governance', desc: 'For water authorities' },
      { name: 'Policy Support', desc: 'Data-driven regulation' },
      { name: 'Climate Resilience', desc: 'Long-term adaptation' }
    ]
  },
  {
    label: 'PLATFORM',
    items: [
      { name: 'Satellite Fusion', desc: 'Copernicus Sentinel-2' },
      { name: 'AI Vision Lab', desc: 'Crop stress detection' },
      { name: 'Hydro-Informatics', desc: 'River monitoring' },
      { name: 'API Integration', desc: 'Connect external data' }
    ]
  },
  {
    label: 'IMPACT',
    items: [
      { name: 'Pinios Case Study', desc: 'Thessaly implementation' },
      { name: 'SDG Dashboard', desc: 'Goals 2 & 6 contribution' },
      { name: 'ROI Analysis', desc: 'Water & carbon savings' }
    ]
  },
  {
    label: 'RESOURCES',
    items: [
      { name: 'Whitepaper', desc: 'Soft-Infrastructure tech' },
      { name: 'Help Center', desc: 'Guides & documentation' },
      { name: 'Developer Docs', desc: 'API reference' }
    ]
  },
  {
    label: 'COMPANY',
    items: [
      { name: 'About Us', desc: 'Our vision for water' },
      { name: 'The Team', desc: 'Agronomists & AI engineers' },
      { name: 'Partners', desc: 'ESA & Ministry support' }
    ]
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
      padding: scrolled ? '16px 0' : '24px 0',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* 1. Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', position: 'relative', zIndex: 102 }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px', overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}>
            <img src="/logo.jpeg" alt="IRIGAI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800,
            color: '#0F172A', letterSpacing: '-0.02em'
          }}>
            IRIGAI
          </span>
        </Link>

        {/* 2. Mega Menu Links */}
        <div role="navigation" className="desktop-menu" style={{ display: 'flex', gap: '40px', position: 'relative', zIndex: 102 }}>
          {MENU_ITEMS.map((menu) => (
            <div key={menu.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveMenu(menu.label)}
            >
              <button style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#334155',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '8px 0',
                display: 'flex', alignItems: 'center', gap: '4px',
                transition: 'color 0.2s'
              }}
                className="nav-item"
              >
                {menu.label}
                <ChevronDown size={12} color={activeMenu === menu.label ? '#0F172A' : '#94A3B8'}
                  style={{ transition: 'transform 0.3s', transform: activeMenu === menu.label ? 'rotate(180deg)' : 'rotate(0)' }}
                />
              </button>
            </div>
          ))}
        </div>

        {/* 3. Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 102 }} className="desktop-actions">
          <Link to="/login" style={{
            fontSize: '0.85rem', fontWeight: 600, color: '#334155', textDecoration: 'none',
            padding: '10px 20px', transition: 'color 0.2s'
          }}
            onMouseOver={(e) => e.target.style.color = '#0F172A'}
            onMouseOut={(e) => e.target.style.color = '#334155'}>
            Masuk
          </Link>
          <Link to="/register" style={{
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '12px 28px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(15, 23, 42, 0.2)',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(15, 23, 42, 0.2)';
            }}>
            MULAI
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'transparent', border: 'none', padding: '8px', cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-toggle"
        >
          <Menu size={24} color="#0F172A" />
        </button>

      </div>

      {/* 4. Dropdown Panel (Full Width or Floating) */}
      <div style={{
        position: 'absolute',
        top: '100%', left: 0, right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
        padding: activeMenu ? '40px 0 60px 0' : '0',
        height: activeMenu ? 'auto' : '0',
        opacity: activeMenu ? 1 : 0,
        visibility: activeMenu ? 'visible' : 'hidden',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 101 // Below logo/menu items
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            transform: activeMenu ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'transform 0.4s ease',
            opacity: activeMenu ? 1 : 0
          }}>
            {MENU_ITEMS.find(m => m.label === activeMenu)?.items.map((item, i) => (
              <Link to="/register" key={i} style={{ textDecoration: 'none', group: 'group' }} className="menu-card-link">
                <div style={{
                  padding: '16px', borderRadius: '12px',
                  transition: 'background 0.2s',
                  cursor: 'pointer'
                }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <h4 style={{
                    fontSize: '0.95rem', fontWeight: 700, color: '#0F172A',
                    marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for Mobile/Desktop visibility */}
      <style>{`
                @media (max-width: 1024px) {
                    .desktop-menu { display: none !important; }
                    .desktop-actions { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
    </nav>
  );
}
