'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_ARTICLES } from '@/lib/blogs';
import { SlideUp } from '@/components/animations/SlideUp';

interface LatestBlogSectionProps {
  lang?: string;
}

export default function LatestBlogSection({ lang = 'en' }: LatestBlogSectionProps) {
  const getHref = (path: string) => {
    if (lang === 'ne') return path === '/' ? '/ne' : `/ne${path}`;
    return path;
  };

  const title = lang === 'ne' ? 'हाम्रो ब्लगबाट ताजा जानकारी' : 'Latest from our blog';
  const viewAllText = lang === 'ne' ? 'सबै लेखहरू हेर्नुहोस्' : 'View all articles';
  
  // Show top 3 recent blog posts
  const posts = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SlideUp delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 font-heading">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {lang === 'ne'
                  ? 'दीर्घकालीन वित्तीय समृद्धिका लागि उपयोगी लेख तथा मार्गदर्शनहरू।'
                  : 'Simple, practical guides to help you build financial security.'}
              </p>
            </div>
            <Link
              href={getHref('/learn')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1c7e4b] hover:text-[#15633a] transition-colors shrink-0 group"
            >
              <span>{viewAllText}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SlideUp>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <SlideUp key={post.id} delay={0.15 * (idx + 1)}>
              <Link
                href={getHref(`/learn/${post.slug}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200/80 group hover:border-[#1c7e4b]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div className="h-48 sm:h-52 w-full overflow-hidden relative">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#1c7e4b] transition-colors leading-snug line-clamp-2 mb-2 font-heading">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {post.readTime}
                    </span>
                    <span className="text-[#1c7e4b] font-bold group-hover:underline">Read Article →</span>
                  </div>
                </div>
              </Link>
            </SlideUp>
          ))}
        </div>

      </div>
    </section>
  );
}
