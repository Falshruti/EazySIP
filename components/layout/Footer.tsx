'use client';

import Link from 'next/link';
import Logomark from '@/components/brand/Logomark';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  lang?: string;
}

const footerContent = {
  en: {
    tagline: "Sikkim's first beginner-friendly SIP platform, built for you.",
    contactTitle: 'Contact us',
    quickLinksTitle: 'Quick links',
    aboutUs: 'About Us',
    calculator: 'Goal Calculator',
    learn: 'Learn',
    contactUs: 'Contact Us',
    legalTitle: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    risk: 'Risk Disclosure',
    complianceTitle: 'Compliance',
    arnText: 'AMFI-Registered Mutual Fund Distributor (ARN-313834)',
    riskNotice: 'Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.',
    copyright: '© 2024-2026 Dzambala Financial Services LLP. All rights reserved.',
  },
  ne: {
    tagline: 'सिक्किमको पहिलो नौलो र सरल SIP प्लेटफर्म, तपाईंको लागि निर्मित।',
    contactTitle: 'हामीलाई सम्पर्क गर्नुहोस्',
    quickLinksTitle: 'द्रुत लिङ्कहरू',
    aboutUs: 'हाम्रो बारेमा',
    calculator: 'लक्ष्य क्याल्कुलेटर',
    learn: 'सिकाइ केन्द्र',
    contactUs: 'सम्पर्क गर्नुहोस्',
    legalTitle: 'कानूनी जानकारी',
    privacy: 'गोपनीयता नीति',
    terms: 'नियम र सर्तहरू',
    risk: 'जोखिम प्रकटीकरण',
    complianceTitle: 'कम्प्लायन्स',
    arnText: 'AMFI-दर्ता भएको म्युचुअल फन्ड वितरक (ARN-313834)',
    riskNotice: 'म्युचुअल फन्ड लगानीहरू बजार जोखिमको अधीनमा छन्। लगानी गर्नु अघि सबै योजना सम्बन्धी कागजातहरू ध्यानपूर्वक पढ्नुहोस्।',
    copyright: '© २०२४-२०२६ जाम्बला फाइनान्सियल सर्भिसेज LLP। सर्वाधिकार सुरक्षित।',
  },
};

export default function Footer({ lang = 'en' }: FooterProps) {
  const t = lang === 'ne' ? footerContent.ne : footerContent.en;

  const getHref = (path: string) => {
    if (lang === 'ne') return path === '/' ? '/ne' : `/ne${path}`;
    return path;
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-10 text-gray-700 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-gray-100">

          {/* Col 1: Brand + tagline + socials */}
          <div>
            <Link href={getHref('/')} className="inline-block mb-3">
              <Logomark eazyColor="#208b53" sipColor="#004242" height={34} />
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              {t.tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-1.5 flex-wrap mt-5">
              <a
                href="https://www.facebook.com/eazysipsikkim/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#208b53] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={13} />
              </a>
              <a
                href="https://www.instagram.com/eazy.sip/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#208b53] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={13} />
              </a>
              <a
                href="https://www.youtube.com/@EazySIP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#208b53] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={13} />
              </a>
              <a
                href="https://www.linkedin.com/company/eazysip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#208b53] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={13} />
              </a>
              <a
                href="https://x.com/eazysip_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#208b53] hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter size={13} />
              </a>
              <a
                href="https://wa.me/919134196221"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#208b53] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={13} />
              </a>
            </div>
          </div>

          {/* Col 2: Contact us */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-4 font-heading">
              {t.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs text-gray-500">
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-[#208b53] shrink-0" />
                <span>+91 75570 51930</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-[#208b53] shrink-0" />
                <span>binay@eazysip.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[#208b53] shrink-0 mt-0.5" />
                <span>Panday Colony, Gyalzing, Sikkim, India</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick links */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-4 font-heading">
              {t.quickLinksTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <Link href={getHref('/about')} className="hover:text-[#208b53] transition-colors">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link href={getHref('/sip-calculator')} className="hover:text-[#208b53] transition-colors">
                  {t.calculator}
                </Link>
              </li>
              <li>
                <Link href={getHref('/learn')} className="hover:text-[#208b53] transition-colors">
                  {t.learn}
                </Link>
              </li>
              <li>
                <Link href={getHref('/contact')} className="hover:text-[#208b53] transition-colors">
                  {t.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-4 font-heading">
              {t.legalTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <Link href={getHref('/privacy-policy')} className="hover:text-[#208b53] transition-colors">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href={getHref('/terms-and-conditions')} className="hover:text-[#208b53] transition-colors">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href={getHref('/risk-disclosure')} className="hover:text-[#208b53] transition-colors">
                  {t.risk}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Compliance */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-4 font-heading">
              {t.complianceTitle}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {t.arnText}
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {t.riskNotice}
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 text-[11px] text-gray-400 text-center">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
