import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, BookOpen, ChevronRight, Sparkles, MessageCircle, Share2, CheckCircle2, Award } from 'lucide-react';
import { BLOG_ARTICLES, getArticleTitle, getArticleExcerpt, getArticleCategory } from '@/lib/blogs';
import FinalCTA from '@/components/sections/FinalCTA';
import type { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{ lang: 'en' | 'ne'; slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Article Not Found - eazySIP' };
  }

  const title = lang === 'ne' && article.ne?.title ? article.ne.title : article.title;
  const excerpt = lang === 'ne' && article.ne?.excerpt ? article.ne.excerpt : article.excerpt;

  return {
    title: `${title} - eazySIP Guides`,
    description: excerpt,
    alternates: {
      canonical: lang === 'ne' ? `https://eazysip.com/ne/learn/${slug}` : `https://eazysip.com/learn/${slug}`,
      languages: {
        'en-IN': `https://eazysip.com/learn/${slug}`,
        'ne-IN': `https://eazysip.com/ne/learn/${slug}`,
      },
    },
  };
}

/**
 * Custom Content Renderer that parses Markdown-like syntax into rich HTML components:
 * - Subheadings (`###`)
 * - Bullet / Numbered lists (`1.`, `2.`, `-`)
 * - Markdown tables (`| ... |`)
 * - Paragraphs with optimal typography
 */
function renderFormattedContent(rawContent: string) {
  const blocks = rawContent.split('\n\n');

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);

    // 1. Check if block starts with Markdown Subheading (### Title)
    if (lines.length > 0 && lines[0].startsWith('###')) {
      const headingTitle = lines[0].replace(/^###\s*/, '').replace(/\*\*/g, '');
      const remainingLines = lines.slice(1);

      return (
        <div key={idx} className="my-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 font-heading mb-3 mt-6">
            {headingTitle}
          </h3>

          {remainingLines.length > 0 && (
            <div className="space-y-3 pl-1">
              {remainingLines.map((line, lIdx) => {
                const cleanLine = line.replace(/^\d+\.\s+|^-\s+/, '').replace(/\*\*/g, '').trim();
                const isListItem = /^\d+\.\s+|^-\s+/.test(line);

                return (
                  <div key={lIdx} className="flex items-start gap-3 text-base sm:text-lg text-gray-700 font-normal leading-relaxed sm:leading-loose">
                    {isListItem && (
                      <CheckCircle2 size={18} className="text-[#1c7e4b] shrink-0 mt-1.5" />
                    )}
                    <span>{cleanLine}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // 2. Markdown Tables (| Year | Monthly SIP |)
    if (trimmed.includes('|') && trimmed.includes('---')) {
      const tableLines = trimmed.split('\n').filter(Boolean);
      const headers = tableLines[0]
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
      const dataRows = tableLines
        .slice(2)
        .map((line) =>
          line
            .split('|')
            .map((s) => s.trim())
            .filter(Boolean)
        );

      return (
        <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-gray-200/80 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-[#1c7e4b]/10">
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-6 py-3.5 text-left font-bold text-gray-900 tracking-wider font-heading"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-6 py-3.5 text-gray-700 font-normal">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 3. Bullet / Numbered Lists (without ### header)
    const isList = lines.every((line) => /^\d+\.\s+|^-\s+/.test(line));
    if (isList) {
      return (
        <div key={idx} className="my-6 space-y-3">
          {lines.map((line, itemIdx) => {
            const cleanLine = line.replace(/^\d+\.\s+|^-\s+/, '').replace(/\*\*/g, '').trim();
            return (
              <div key={itemIdx} className="flex items-start gap-3 text-base sm:text-lg text-gray-700 font-normal leading-relaxed sm:leading-loose">
                <CheckCircle2 size={18} className="text-[#1c7e4b] shrink-0 mt-1.5" />
                <span>{cleanLine}</span>
              </div>
            );
          })}
        </div>
      );
    }

    // 4. Regular Paragraph
    const cleanParagraph = trimmed.replace(/\*\*/g, '');
    return (
      <p key={idx} className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed sm:leading-loose">
        {cleanParagraph}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { lang, slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const isNe = lang === 'ne';
  const articleTitle = getArticleTitle(article, lang);
  const articleExcerpt = getArticleExcerpt(article, lang);
  const articleCategory = getArticleCategory(article, lang);

  const getHref = (path: string) => {
    if (lang === 'ne') return path === '/' ? '/ne' : `/ne${path}`;
    return path;
  };

  const ui = {
    backLabel: isNe ? 'सिकाइ केन्द्रमा फर्कनुहोस्' : 'Back to Learning Center',
    learnLabel: isNe ? 'सिक्नुहोस्' : 'Learn',
    verifiedBadge: isNe ? 'प्रमाणित सल्लाह' : 'Verified Advisory',
    authorTeam: isNe ? 'eazySIP अनुसन्धान टोली' : 'eazySIP Research Team',
    authorSubtitle: isNe ? 'वित्तीय योजना र साक्षरता' : 'Financial Planning & Literacy',
    execSummary: isNe ? 'संक्षिप्त सारांश' : 'Executive Summary',
    shareLabel: isNe ? 'यो लेख शेयर गर्नुहोस्:' : 'Share this article:',
    whatsappShare: 'WhatsApp',
    twitterShare: isNe ? 'शेयर' : 'Share',
    freeGuidance: isNe ? 'निःशुल्क मार्गदर्शन' : 'Free Guidance',
    bannerHeading: isNe ? 'यो मार्गदर्शनबारे प्रश्न छ?' : 'Have questions about this guide?',
    bannerBody: isNe
      ? 'हाम्रा वित्तीय सहायोगीहरू तपाईंको परिवारको वित्तीय लक्ष्यहरू सरल भाषामा योजना बनाउन मद्दत गर्न तयार छन्।'
      : "Our financial Sahayogis are ready to help you plan your family's financial goals in simple terms.",
    chatWhatsApp: isNe ? 'WhatsApp मा कुरा गर्नुहोस्' : 'Chat on WhatsApp',
    moreGuides: isNe ? 'थप वित्तीय मार्गदर्शनहरू' : 'More Financial Guides',
    recommendedGuides: isNe ? 'सिफारिस गरिएका मार्गदर्शनहरू' : 'Recommended Guides',
    recommendedSub: isNe ? 'दीर्घकालीन सम्पत्ति निर्माणमा मद्दत गर्ने छानिएका लेखहरू।' : 'Handpicked articles to help you build long-term wealth.',
    viewAll: isNe ? 'सबै लेखहरू हेर्नुहोस्' : 'View All Articles',
    readArticle: isNe ? 'लेख पढ्नुहोस् →' : 'Read Article →',
  };

  const otherArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug);
  const sidebarArticles = otherArticles.slice(0, 4);
  const bottomArticles = otherArticles.slice(4, 7);

  const shareText = encodeURIComponent(`${isNe ? 'eazySIP मा यो वित्तीय मार्गदर्शन हेर्नुहोस्' : 'Check out this financial guide on eazySIP'}: ${articleTitle}`);
  const shareUrl = encodeURIComponent(`https://eazysip.com/${lang === 'ne' ? 'ne/' : ''}learn/${article.slug}`);

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: articleTitle,
    description: articleExcerpt,
    image: `https://eazysip.com${article.img}`,
    author: {
      '@type': 'Organization',
      name: 'eazySIP Research Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EazySIP',
      url: 'https://eazysip.com',
    },
    datePublished: '2026-08-01',
    mainEntityOfPage: `https://eazysip.com/learn/${article.slug}`,
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-stone-50/30 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={getHref('/learn')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1c7e4b] hover:text-[#15633a] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{ui.backLabel}</span>
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <span>{ui.learnLabel}</span>
            <span>/</span>
            <span>{articleCategory}</span>
          </div>
        </div>

        {/* Desktop 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Main Article Content (Left 8 Cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            
            {/* Category & Verified Badge */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="inline-block text-xs font-bold text-[#1c7e4b] bg-[#1c7e4b]/10 px-3.5 py-1 rounded-full uppercase tracking-wider">
                {articleCategory}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium bg-stone-100 px-3 py-1 rounded-full">
                <Award size={13} className="text-[#1c7e4b]" />
                <span>{ui.verifiedBadge}</span>
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-heading leading-tight mb-6">
              {articleTitle}
            </h1>

            {/* Author & Meta Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4 mb-8 text-xs sm:text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004242] to-[#1c7e4b] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  ES
                </div>
                <div>
                  <span className="font-bold text-gray-900 block font-heading">{ui.authorTeam}</span>
                  <span className="text-[11px] text-gray-400">{ui.authorSubtitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-medium text-gray-500 bg-stone-50 px-3.5 py-1.5 rounded-full border border-stone-200/60">
                  <Clock size={14} className="text-[#1c7e4b]" /> {article.date} · {article.readTime}
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-64 sm:h-[420px] rounded-3xl overflow-hidden mb-8 shadow-md border border-gray-100">
              <img src={article.img} alt={articleTitle} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>

            {/* Executive Summary Callout Box */}
            <div className="bg-gradient-to-br from-[#1c7e4b]/10 via-emerald-50/50 to-stone-50 border-l-4 border-[#1c7e4b] p-6 sm:p-8 rounded-r-3xl mb-10 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1c7e4b] uppercase tracking-wider mb-2">
                <Sparkles size={15} />
                <span>{ui.execSummary}</span>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed">
                {articleExcerpt}
              </p>
            </div>

            {/* Rich Content Renderer */}
            <div className="space-y-6">
              {renderFormattedContent(article.content)}
            </div>

            {/* Share & Social Action Footer */}
            <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{ui.shareLabel}</span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-bold transition-all"
                >
                  <MessageCircle size={14} />
                  <span>{ui.whatsappShare}</span>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
                >
                  <Share2 size={14} />
                  <span>{ui.twitterShare}</span>
                </a>
              </div>
            </div>

            {/* Sahayogi Banner Callout */}
            <div className="mt-10 bg-gradient-to-br from-[#004242] via-[#003838] to-[#1c7e4b] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#208b53]/30">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#208b53]/40 text-[#86efac] text-[11px] font-bold mb-1 border border-[#208b53]/50">
                  <Sparkles size={12} />
                  <span>{ui.freeGuidance}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">{ui.bannerHeading}</h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">{ui.bannerBody}</p>
              </div>
              <a
                href="https://wa.me/919134196221"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#208b53] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shrink-0"
              >
                <MessageCircle size={17} />
                <span>{ui.chatWhatsApp}</span>
              </a>
            </div>

          </div>

          {/* Sticky Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              
              {/* Popular Related Guides Sidebar */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-5 font-heading pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>{ui.moreGuides}</span>
                  <BookOpen size={16} className="text-[#1c7e4b]" />
                </h3>
                <div className="space-y-4">
                  {sidebarArticles.map((item) => (
                    <Link
                      key={item.id}
                      href={getHref(`/learn/${item.slug}`)}
                      className="group flex items-start gap-3 p-2.5 rounded-2xl hover:bg-stone-50 transition-colors"
                    >
                      <img
                        src={item.img}
                        alt={getArticleTitle(item, lang)}
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#1c7e4b] block uppercase">
                          {getArticleCategory(item, lang)}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#1c7e4b] transition-colors line-clamp-2 leading-snug mt-0.5 font-heading">
                          {getArticleTitle(item, lang)}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {item.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Recommended Articles Section */}
        {bottomArticles.length > 0 && (
          <div className="mt-20 border-t border-gray-200/80 pt-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-heading">{ui.recommendedGuides}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{ui.recommendedSub}</p>
              </div>
              <Link
                href={getHref('/learn')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#1c7e4b] hover:underline"
              >
                <span>{ui.viewAll}</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {bottomArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={getHref(`/learn/${rel.slug}`)}
                  className="group bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="h-44 w-full overflow-hidden relative">
                    <img src={rel.img} alt={getArticleTitle(rel, lang)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {getArticleCategory(rel, lang)}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-[#1c7e4b] transition-colors line-clamp-2 leading-snug mb-2 font-heading">
                        {getArticleTitle(rel, lang)}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {getArticleExcerpt(rel, lang)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 text-xs text-gray-400 font-medium">
                      <span>{rel.readTime}</span>
                      <span className="text-[#1c7e4b] font-bold group-hover:underline">{ui.readArticle}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CTA Footer */}
      <FinalCTA lang={lang} />
    </div>
  );
}
