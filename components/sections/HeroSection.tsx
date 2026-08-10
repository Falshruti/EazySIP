'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import ContactModal from '@/components/layout/ContactModal';

interface HeroSectionProps {
  dict?: any;
  lang?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

export default function HeroSection({ dict, lang = 'en' }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    }
  }, []);

  const initPlayer = () => {
    if (playerRef.current) return;
    playerRef.current = new window.YT.Player('hero-yt-player', {
      events: {
        onReady: (event: any) => {
          event.target.mute();
          event.target.playVideo();
          try {
            if (event.target.unloadModule) {
              event.target.unloadModule('captions');
            }
            if (event.target.setOption) {
              event.target.setOption('captions', 'track', {});
            }
          } catch (e) {
            // ignore
          }
          setIsMuted(true);
          setIsPlaying(true);
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        },
      },
    });
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Full screen hero section (100vw x 100vh) starting at top-0 */}
      <section className="relative w-full h-screen bg-black overflow-hidden pt-0">
        <h1 className="sr-only">
          {lang === 'ne' ? 'मात्र ₹100 बाट लगानी सुरु गर्नुहोस् | EazySIP' : 'Start Investing with Just ₹100 | EazySIP Sikkim'}
        </h1>
        {/* Perfectly centered 16:9 proportional video cover container */}
        <div 
          className="relative w-full h-full overflow-hidden cursor-pointer group bg-black"
          onClick={togglePlayPause}
        >
          <iframe
            id="hero-yt-player"
            src="https://www.youtube-nocookie.com/embed/7_W07StrbBU?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=7_W07StrbBU&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=off&hl=en"
            title="EazySIP Hero Video"
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />

          {/* Pause / Play Indicator Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl">
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </div>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-lg transition-all cursor-pointer"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <>
                <VolumeX size={16} className="text-red-400" />
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 size={16} className="text-green-400 animate-pulse" />
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
