'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export default function LanguageToggle({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchTo = (lang: string) => {
    if (lang === currentLang) {
      setOpen(false);
      return;
    }

    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;

    // Strip leading /ne prefix cleanly from current path
    const cleanPath = pathname.replace(/^\/ne(\/|$)/, '/');
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    if (lang === 'ne') {
      const target = normalizedPath === '/' ? '/ne' : `/ne${normalizedPath}`;
      router.push(target);
    } else {
      router.push(normalizedPath);
    }

    setOpen(false);
  };

  const label = currentLang === 'ne' ? 'नेपाली' : 'English';

  return (
    <div ref={ref} className="relative">
      {/* Trigger — pill with globe icon */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-black/20 text-white text-xs sm:text-sm font-medium hover:bg-black/30 backdrop-blur-md transition-all cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>🌐</span>
        <span>{label}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown — teal-themed, matching brand */}
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-36 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.25)] overflow-hidden z-50"
          style={{ background: '#002e2e', border: '1px solid rgba(208,251,17,0.2)' }}
        >
          <li>
            <button
              role="option"
              aria-selected={currentLang === 'en'}
              onClick={() => switchTo('en')}
              className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-[#208b53]/40 text-[#d0fb11]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>English</span>
              {currentLang === 'en' && <span className="text-[#d0fb11]">✓</span>}
            </button>
          </li>
          <li>
            <button
              role="option"
              aria-selected={currentLang === 'ne'}
              onClick={() => switchTo('ne')}
              className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentLang === 'ne'
                  ? 'bg-[#208b53]/40 text-[#d0fb11]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>नेपाली</span>
              {currentLang === 'ne' && <span className="text-[#d0fb11]">✓</span>}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
