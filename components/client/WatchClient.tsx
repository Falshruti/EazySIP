'use client';

import { useState } from 'react';
import { Play, Clock } from 'lucide-react';

type Video = {
  title: string;
  duration: string;
  description: string;
  emoji: string;
};

type Tab = {
  id: string;
  label: string;
  videos: Video[];
};

interface WatchClientProps {
  dict: any;
}

export default function WatchClient({ dict }: WatchClientProps) {
  const tabs = dict.tabs as Tab[];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [featuredVideo, setFeaturedVideo] = useState<Video>(tabs[0].videos[0]);

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-gray-900 to-primary/80 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{dict.videoLibraryEyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-display">
            {dict.heroHeadline}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {dict.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="bg-gray-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Thumbnail */}
            <div className="w-full md:w-2/3 aspect-video bg-gradient-to-br from-primary/30 to-emerald-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer shrink-0">
              <span className="text-8xl">{featuredVideo.emoji}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary/80 transition-all">
                  <Play className="text-white w-7 h-7 ml-1" fill="white" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                {featuredVideo.duration}
              </span>
            </div>
            {/* Info */}
            <div className="text-white flex-1">
              <span className="text-xs text-primary font-bold uppercase tracking-widest mb-2 block">{dict.nowPlaying}</span>
              <h2 className="text-xl font-bold mb-3 leading-snug">
                {featuredVideo.title}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {featuredVideo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 min-w-max">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`py-4 px-5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === t.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-dark'
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentTab.videos.map((video, i) => (
              <div
                key={i}
                onClick={() => setFeaturedVideo(video)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-emerald-100 flex items-center justify-center relative">
                  <span className="text-5xl">{video.emoji}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/0 group-hover:bg-primary rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <Play className="text-white w-5 h-5 ml-0.5" fill="white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-dark text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                    <Clock size={12} /> {video.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          {dict.ctaHeadline}
        </h2>
        <a
          href="#download"
          className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        >
          {dict.downloadEazySip}
        </a>
      </section>
    </div>
  );
}
