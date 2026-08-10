'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';
import Logomark from '@/components/brand/Logomark';

interface HeaderProps {
  lang: string;
  dict: any;
}

export default function Header({ lang, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Transparent header only on home page when at the very top
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/ne';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/',               label: dict.navHome },
    { href: '/about',          label: dict.navAbout || 'About Us' },
    { href: '/learn',          label: dict.navLearn },
    { href: '/sip-calculator', label: dict.navCalculator },
  ];

  const getHref = (path: string) => {
    if (lang === 'ne') return path === '/' ? '/ne' : `/ne${path}`;
    return path;
  };

  const isTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center transition-all duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
          : 'bg-teal shadow-md shadow-black/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        <Link href={getHref('/')} className="shrink-0 group">
          <Logomark wordmarkColor="#d0fb11" swirlColor="#d0fb11" height={28} />
        </Link>

        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getHref(link.href)}
              className="relative text-white/90 hover:text-lime font-medium text-xs sm:text-sm transition-colors group drop-shadow-sm"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-lime group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="#download"
            className="bg-lime text-teal font-semibold text-xs px-4 py-1.5 rounded-full transition-transform hover:scale-105 shadow-lime"
          >
            {dict.downloadApp}
          </Link>
          <LanguageToggle currentLang={lang} />
        </div>

        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="group relative w-8 h-8 flex flex-col justify-center items-center gap-[5px] rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out origin-center ${
                isMobileMenuOpen
                  ? 'bg-lime translate-y-[7px] rotate-45'
                  : 'bg-white group-hover:bg-lime'
              }`}
            />
            <span
              className={`h-[2px] w-5 rounded-full transition-all duration-500 ease-in-out ${
                isMobileMenuOpen
                  ? 'opacity-0 -translate-x-[50vw]'
                  : 'bg-white group-hover:bg-[#b8de00]'
              }`}
            />
            <span
              className={`h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out origin-center ${
                isMobileMenuOpen
                  ? 'bg-lime -translate-y-[7px] -rotate-45'
                  : 'bg-white group-hover:bg-lime'
              }`}
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-40 flex flex-col p-6 lg:hidden bg-teal">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/85 hover:text-lime font-medium py-2.5 px-4 rounded-xl hover:bg-white/10 transition-all text-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/15">
              <Link
                href="#download"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-lime text-teal font-semibold text-sm px-4 py-2.5 rounded-full mb-4"
              >
                {dict.downloadApp}
              </Link>
              <div className="flex justify-center">
                <LanguageToggle currentLang={lang} />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
