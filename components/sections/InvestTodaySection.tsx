'use client';

interface InvestTodaySectionProps {
  lang?: string;
}

const content = {
  en: {
    headline1: 'Easy Savings App for',
    headline2: 'you and your family',
    subline: 'Every big dream starts with one small step.',
    desc: "At EazySIP, we're making investing simple, accessible, and easy to understand. Whether you're planning for your family, your future, or life's biggest milestones, we're here to help you take that first step with confidence.",
    cta: 'Start your journey to financial freedom',
    appStore: 'App Store',
    googlePlay: 'Google Play',
  },
  ne: {
    headline1: 'तपाईं र तपाईंको परिवारको लागि',
    headline2: 'सजिलो बचत एप',
    subline: 'हरेक ठूलो सपना एउटा सानो कदमबाट सुरु हुन्छ।',
    desc: 'EazySIP मा हामी लगानीलाई सरल, सुलभ र सजिलो बुझ्न मिल्ने बनाइरहेका छौं। चाहे तपाईं आफ्नो परिवार, आफ्नो भविष्य, वा जीवनका ठूला लक्ष्यहरूको योजना बनाउँदै हुनुहुन्छ — हामी तपाईंलाई विश्वासका साथ पहिलो कदम चाल्न मद्दत गर्न यहाँ छौं।',
    cta: 'वित्तीय स्वतन्त्रताको यात्रा सुरु गर्नुहोस्',
    appStore: 'एप स्टोर',
    googlePlay: 'गुगल प्ले',
  },
};

export default function InvestTodaySection({ lang = 'en' }: InvestTodaySectionProps) {
  const t = lang === 'ne' ? content.ne : content.en;

  return (
    <section style={{ backgroundColor: '#f8f8f8', padding: '56px 0', overflow: 'hidden', borderRadius: '20px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* ── Left Text ── */}
          <div style={{ maxWidth: '480px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.7rem, 2.8vw, 2.3rem)',
                fontWeight: '800',
                lineHeight: '1.22',
                color: '#111111',
                margin: '0 0 18px',
                fontFamily: '"Poppins", "Poppins Fallback", sans-serif',
              }}
            >
              {t.headline1}{' '}
              <span style={{ color: '#1a7a47', fontWeight: '800', display: 'block' }}>
                {t.headline2}
              </span>
            </h2>

            <p
              style={{
                fontSize: '0.97rem',
                color: '#1a7a47',
                fontWeight: '600',
                lineHeight: '1.5',
                margin: '0 0 12px',
                fontFamily: '"Poppins", "Poppins Fallback", sans-serif',
              }}
            >
              {t.subline}
            </p>

            <p
              style={{
                fontSize: '0.97rem',
                color: '#4a4a4a',
                lineHeight: '1.75',
                margin: '0 0 10px',
                fontFamily: '"Poppins", "Poppins Fallback", sans-serif',
              }}
            >
              {t.desc}
            </p>

            <p
              style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#111111',
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                margin: '0 0 28px',
                fontFamily: '"Poppins", "Poppins Fallback", sans-serif',
              }}
            >
              {t.cta}
            </p>

            {/* Outline buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a
                href="#download"
                aria-label="Download on the App Store"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  border: '1.5px solid #1a7a47',
                  borderRadius: '8px',
                  color: '#1a7a47',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: '"Poppins", "Poppins Fallback", sans-serif',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.34c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.64-2.81 1.44-.61.71-1.14 1.87-.99 2.99 1.07.08 2.14-.51 2.81-1.33z" />
                </svg>
                {t.appStore}
              </a>

              <a
                href="#download"
                aria-label="Get it on Google Play"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  border: '1.5px solid #1a7a47',
                  borderRadius: '8px',
                  color: '#1a7a47',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: '"Poppins", "Poppins Fallback", sans-serif',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h.34l9.51 9.51L4.84 21.02C4.34 21.02 3 20.83 3 20.5zm1.61 1.33l10.24-10.24L18.42 15l-12.78 7.37c-.36.21-.71-.22-.03-.54zM20.25 12l-2.45-1.42-3.13 3.13 3.13 3.13 2.45-1.42c.8-.46.8-1.96 0-2.42zM4.61 2.17c-.68-.32-.33-.75.03-.54L17.42 9 13.85 12.57 4.61 2.17z" />
                </svg>
                {t.googlePlay}
              </a>
            </div>
          </div>

          {/* ── Right Jar Image ── */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '360px',
            }}
          >
            {/* Soft oval blob */}
            <div
              style={{
                position: 'absolute',
                width: '90%',
                height: '85%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at 55% 50%, #e0f4e8 0%, #edf7f0 50%, transparent 78%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
              }}
            />

            {/* Leaf — top left */}
            <svg style={{ position: 'absolute', top: '5%', left: '12%', width: '36px', zIndex: 2 }} viewBox="0 0 50 80" fill="none">
              <path d="M25 75 C5 55 0 30 10 10 C20 -5 35 5 40 25 C48 50 40 65 25 75Z" fill="#3da85e" />
              <path d="M25 75 C25 45 22 20 15 5" stroke="#1a6e3a" strokeWidth="1.2" fill="none" />
            </svg>

            {/* Leaf — top right */}
            <svg style={{ position: 'absolute', top: '10%', right: '10%', width: '28px', zIndex: 2, transform: 'rotate(40deg)' }} viewBox="0 0 50 80" fill="none">
              <path d="M25 75 C5 55 0 30 10 10 C20 -5 35 5 40 25 C48 50 40 65 25 75Z" fill="#52c47a" />
              <path d="M25 75 C25 45 22 20 15 5" stroke="#1a6e3a" strokeWidth="1.2" fill="none" />
            </svg>

            {/* Leaf — mid left */}
            <svg style={{ position: 'absolute', top: '42%', left: '4%', width: '22px', zIndex: 2, transform: 'rotate(-50deg)', opacity: 0.8 }} viewBox="0 0 50 80" fill="none">
              <path d="M25 75 C5 55 0 30 10 10 C20 -5 35 5 40 25 C48 50 40 65 25 75Z" fill="#3da85e" />
            </svg>

            {/* Leaf — bottom right */}
            <svg style={{ position: 'absolute', bottom: '12%', right: '8%', width: '24px', zIndex: 2, transform: 'rotate(70deg)', opacity: 0.75 }} viewBox="0 0 50 80" fill="none">
              <path d="M25 75 C5 55 0 30 10 10 C20 -5 35 5 40 25 C48 50 40 65 25 75Z" fill="#52c47a" />
            </svg>

            {/* Leaf — bottom left */}
            <svg style={{ position: 'absolute', bottom: '20%', left: '16%', width: '18px', zIndex: 2, transform: 'rotate(-15deg)', opacity: 0.65 }} viewBox="0 0 50 80" fill="none">
              <path d="M25 75 C5 55 0 30 10 10 C20 -5 35 5 40 25 C48 50 40 65 25 75Z" fill="#3da85e" />
            </svg>

            {/* Jar Image */}
            <img
              src="/jar-clean.png"
              alt="EazySIP Savings Jar"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '340px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.14))',
                animation: 'jarFloat 4s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes jarFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
