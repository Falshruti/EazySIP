import type { Metadata } from 'next';
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getDictionary } from '@/lib/dictionary';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '700'],
  subsets: ['devanagari'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://eazysip.com'),
  title: "EazySIP | Start SIP Investments from ₹100 in Sikkim",
  description: "Start your investment journey with EazySIP. Invest from just ₹100 through a simple, beginner-friendly platform designed for people in Sikkim.",
  openGraph: {
    title: "Start Investing from ₹100 with EazySIP",
    description: "A simple, beginner-friendly investment platform helping families in Sikkim build a better financial future.",
    url: 'https://eazysip.com',
    siteName: 'EazySIP',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EazySIP | Start SIP Investments from ₹100 in Sikkim',
    description: 'Start your investment journey with EazySIP. Invest from just ₹100 through a simple, beginner-friendly platform designed for people in Sikkim.',
    creator: '@eazysip_',
  },
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ne' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'ne');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Dzambala Financial Services LLP (EazySIP)',
    alternateName: 'EazySIP',
    url: 'https://eazysip.com',
    logo: 'https://eazysip.com/blog-sip-jar.png',
    description: "Sikkim's first beginner-friendly SIP investment platform operated by Dzambala Financial Services LLP (AMFI-registered MFD ARN-313834).",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Panday Colony',
      addressLocality: 'Gyalzing',
      addressRegion: 'Sikkim',
      postalCode: '737111',
      addressCountry: 'IN',
    },
    telephone: '+91-7557051930',
    email: 'binay@eazysip.com',
    sameAs: [
      'https://www.facebook.com/eazysipsikkim/',
      'https://www.instagram.com/eazy.sip/',
      'https://www.youtube.com/@EazySIP',
      'https://www.linkedin.com/company/eazysip',
      'https://x.com/eazysip_',
    ],
  };

  return (
    <html lang={lang} className={`${poppins.variable} ${notoSansDevanagari.variable}`} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en-IN" href="https://eazysip.com/" />
        <link rel="alternate" hrefLang="ne-IN" href="https://eazysip.com/ne/" />
        <link rel="alternate" hrefLang="x-default" href="https://eazysip.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans text-dark bg-white antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <Header lang={lang} dict={dict.header} />
        <main className="flex-grow">{children}</main>
        <Footer lang={lang as 'en' | 'ne'} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
