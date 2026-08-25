"use client";

export default function Footer() {
  return (
    <footer style={{ width: '100%', padding: '40px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface-color)', position: 'relative', zIndex: 10 }}>
      <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '12px', color: 'var(--text-secondary)' }}>
        © 2026 CineZate & FICIAI. All rights reserved.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Terms of Service</a>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
      </div>
    </footer>
  );
}
