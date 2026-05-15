'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  if (isAdmin) {
    return <>{children}</>
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <a href="tel:05332952038" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            📞 0533 295 20 38
          </a>
          <span>✉️ info@arintemizlikkayseri.com</span>
        </div>
        <div className="topbar-right">
          <span>📷</span>
          <span>📘</span>
          <span>💬</span>
        </div>
      </div>

      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/images/logo_custom.png" alt="Arın Temizlik Logo" style={{ height: '90px', objectFit: 'contain' }} className="header-logo" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)', lineHeight: 0.9 }} className="header-brand-name">
                ARIN
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)', lineHeight: 1, marginTop: '2px' }} className="header-brand-sub">
                TEMİZLİK
              </div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '4px', marginTop: '4px', textTransform: 'uppercase' }}>
                KAYSERİ
              </div>
            </div>
          </a>
        </div>

        <nav className="header-nav">
          <a href="/">ANA SAYFA</a>
          <a href="#hizmetler">HİZMETLERİMİZ</a>
          <a href="#kurumsal">KURUMSAL</a>
          <a href="#blog">BLOG</a>
          <a href="#iletisim">İLETİŞİM</a>
        </nav>



        {/* Hamburger Button */}
        <button
          className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç/kapat"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile Navigation Panel */}
      <nav className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
        <a href="/" onClick={closeMenu}>ANA SAYFA</a>
        <a href="#hizmetler" onClick={closeMenu}>HİZMETLERİMİZ</a>
        <a href="#kurumsal" onClick={closeMenu}>KURUMSAL</a>
        <a href="#blog" onClick={closeMenu}>BLOG</a>
        <a href="#iletisim" onClick={closeMenu}>İLETİŞİM</a>
        <a href="tel:05332952038" className="btn-primary" style={{ marginTop: '16px', backgroundColor: '#25D366', borderColor: '#25D366' }}>
          📞 BİZİ ARAYIN
        </a>

      </nav>

      <main>{children}</main>

      <footer className="footer" id="iletisim">
        <div className="container footer-grid">
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '700' }}>Ücretsiz Teklif Alın</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>İhtiyacınıza özel temizlik hizmeti için bize ulaşın.</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li>
                <a href="tel:05332952038">📞 0533 295 20 38</a>
              </li>
              <li>✉️ info@arintemizlikkayseri.com</li>
              <li>📍 MEVLANA MAH. YAVUZ SULTAN SELİM CAD. GÜLNERSE APT NO:3/C TALAS KAYSERİ </li>
            </ul>
          </div>
          <div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Ad Soyad" style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border)' }} />
              <input type="text" placeholder="Telefon" style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border)' }} />
              <textarea placeholder="Mesajınız" rows={3} style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--border)' }}></textarea>
              <button className="btn-primary">GÖNDER →</button>
            </form>
          </div>
          <div style={{ background: '#e5e7eb', borderRadius: '8px', overflow: 'hidden', height: '300px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1556.8673952812676!2d35.55361595918891!3d38.70093584863341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b12baa68f6bfb%3A0x2da9a1beb3486d41!2sYavuz%20Sultan%20Selim%20Cd.%2C%20Talas%2FKayseri!5e0!3m2!1str!2str!4v1778866345044!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)' }}>
          © 2026 Arın Temizlik. Tüm Hakları Saklıdır.
          <a href="/admin/login" style={{ opacity: 0.1, marginLeft: '20px' }}>Admin</a>
        </div>
      </footer>

      <a href="https://wa.me/905332952038" className="whatsapp-float" target="_blank" rel="noreferrer">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </>
  )
}
