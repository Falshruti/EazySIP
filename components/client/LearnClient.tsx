'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Sparkles, ChevronRight } from 'lucide-react';
import FinalCTA from '@/components/sections/FinalCTA';
import { BLOG_ARTICLES } from '@/lib/blogs';

interface LearnClientProps {
  dict?: any;
  lang?: string;
}

const learnData = {
  en: {
    heroBadge: 'EazySIP Knowledge Hub',
    heroTitle: 'Learn Investing, One Step at a Time',
    heroSub: 'Everything you need to know about SIPs, mutual funds, emergency funds, and long-term financial resilience.',
    featuredTag: 'FEATURED ARTICLE',
    readArticle: 'Read Full Article',
    readMore: 'Read Article →',
    exploreTitle: 'Explore All Guides',
    categories: [
      { key: 'All', label: 'All' },
      { key: 'Basics of SIP', label: 'Basics of SIP' },
      { key: 'Financial Planning', label: 'Financial Planning' },
      { key: 'Financial Safety', label: 'Financial Safety' },
      { key: 'Smart Saving', label: 'Smart Saving' },
      { key: 'Financial Literacy', label: 'Financial Literacy' },
      { key: 'Education Planning', label: 'Education Planning' },
      { key: 'Financial Resilience', label: 'Financial Resilience' },
    ],
  },
  ne: {
    heroBadge: 'EazySIP ज्ञान केन्द्र',
    heroTitle: 'सिकाइ केन्द्र र वित्तीय मार्गदर्शन',
    heroSub: 'SIP, म्युचुअल फन्ड, आपतकालीन कोष, र दीर्घकालीन वित्तीय समृद्धिका बारेमा सबै जानकारी।',
    featuredTag: 'विशेष लेख',
    readArticle: 'पूरा लेख पढ्नुहोस्',
    readMore: 'लेख पढ्नुहोस् →',
    exploreTitle: 'सबै मार्गदर्शनहरू हेर्नुहोस्',
    categories: [
      { key: 'All', label: 'सबै' },
      { key: 'Basics of SIP', label: 'SIP को आधारभूत' },
      { key: 'Financial Planning', label: 'वित्तीय योजना' },
      { key: 'Financial Safety', label: 'वित्तीय सुरक्षा' },
      { key: 'Smart Saving', label: 'स्मार्ट बचत' },
      { key: 'Financial Literacy', label: 'वित्तीय साक्षरता' },
      { key: 'Education Planning', label: 'शिक्षा योजना' },
      { key: 'Financial Resilience', label: 'वित्तीय लचिलापन' },
    ],
  },
};

export default function LearnClient({ dict, lang = 'en' }: LearnClientProps) {
  const t = lang === 'ne' ? learnData.ne : learnData.en;

  const getHref = (path: string) => {
    if (lang === 'ne') return path === '/' ? '/ne' : `/ne${path}`;
    return path;
  };

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  const featured = BLOG_ARTICLES[0];

  return (
    <div className="pt-[60px] min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1c7e4b]/10 via-[#1c7e4b]/5 to-white py-14 sm:py-18 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c7e4b]/15 text-[#1c7e4b] font-bold text-xs mb-4">
            <Sparkles size={14} />
            <span>{t.heroBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-heading max-w-3xl mx-auto">
            {t.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto font-normal">
            {t.heroSub}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article Card */}
        <div className="bg-gradient-to-br from-[#1c7e4b]/10 via-[#1c7e4b]/5 to-stone-50 rounded-3xl p-6 sm:p-8 mb-12 border border-[#1c7e4b]/20 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md shrink-0 relative">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="inline-block text-xs font-bold text-[#1c7e4b] uppercase tracking-wider mb-3 bg-white px-3 py-1 rounded-full border border-[#1c7e4b]/20">
              {t.featuredTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 leading-snug font-heading">
              <Link href={getHref(`/learn/${featured.slug}`)} className="hover:text-[#1c7e4b] transition-colors">
                {featured.title}
              </Link>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Clock size={14} /> {featured.date} · {featured.readTime}
              </span>
              <Link
                href={getHref(`/learn/${featured.slug}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1c7e4b] hover:bg-[#15633a] text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>{t.readArticle}</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md py-4 border-b border-gray-100 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {t.categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat.key
                    ? 'bg-[#1c7e4b] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-heading">
            {t.exploreTitle} ({filteredArticles.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={getHref(`/learn/${article.slug}`)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-[#1c7e4b]/40 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#1c7e4b] transition-colors leading-snug line-clamp-2 mb-2 font-heading">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {article.readTime}
                    </span>
                    <span className="text-[#1c7e4b] font-bold group-hover:underline">{t.readMore}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <FinalCTA lang={lang} />
    </div>
  );
}
