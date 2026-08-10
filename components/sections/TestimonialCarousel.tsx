'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialCarouselProps {
  lang?: string;
}

const testimonialData = {
  en: {
    heading: 'What our investors say',
    items: [
      {
        name: 'Pemba D.',
        location: 'Gangtok, Sikkim',
        avatar: '/avatar-sunita.png',
        quote:
          '"Pahilo SIP yo app bata sajilai suru gareko. Ramro lagyo. Aaja samma 6 mahina pugyo."',
      },
      {
        name: 'Anjali R.',
        location: 'Siliguri, North Bengal',
        avatar: '/avatar-prakash.png',
        quote:
          '"I had been thinking about mutual funds for 3 years. EazySip set mine up in 6 minutes. Wish I had started sooner."',
      },
      {
        name: 'Suresh K.',
        location: 'Namchi, Sikkim',
        avatar: '/avatar-vikram.png',
        quote:
          '"My wife and I both started ₹100 SIPs last Dashain. We don\'t even feel it leaving the account."',
      },
      {
        name: 'Tshering L.',
        location: 'Kalimpong',
        avatar: '/avatar-sunita.png',
        quote:
          '"Mero buwa-le bujhnu bhayo, tyo nai sabai bhanda thulo kura ho."',
      },
    ],
  },
  ne: {
    heading: 'हाम्रा लगानीकर्ताहरूले के भन्छन्',
    items: [
      {
        name: 'पेम्बा डी.',
        location: 'गान्तोक, सिक्किम',
        avatar: '/avatar-sunita.png',
        quote:
          '"पहिलो SIP यो एपबाट सजिलै सुरु गरेको। राम्रो लाग्यो। आजसम्म ६ महिना पुग्यो।"',
      },
      {
        name: 'अञ्जलि आर.',
        location: 'सिलिगुडी, उत्तर बंगाल',
        avatar: '/avatar-prakash.png',
        quote:
          '"मैले म्युचुअल फन्डबारे ३ वर्षसम्म सोचिरहेँ। EazySip ले मेरो ६ मिनेटमा सेटअप गर्‍यो। काश म अगाडि नै सुरु गरेको भए।"',
      },
      {
        name: 'सुरेश के.',
        location: 'नाम्ची, सिक्किम',
        avatar: '/avatar-vikram.png',
        quote:
          '"मेरी श्रीमती र मैले दुवैले गत दशैँमा ₹100 SIP सुरु गर्‍यौं। खाताबाट जाँदा थाहा पनि हुँदैन।"',
      },
      {
        name: 'छेरिङ एल.',
        location: 'कालिम्पोङ',
        avatar: '/avatar-sunita.png',
        quote:
          '"मेरो बुवाले बुझ्नु भयो, त्यो नै सबैभन्दा ठूलो कुरा हो।"',
      },
    ],
  },
};

export default function TestimonialCarousel({ lang = 'en' }: TestimonialCarouselProps) {
  const d = lang === 'ne' ? testimonialData.ne : testimonialData.en;

  // Duplicate items for seamless infinite loop
  const items = [...d.items, ...d.items, ...d.items];

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const CARD_W = 360; // card width + gap
  const ORIGINAL_LEN = d.items.length;

  // Current offset in px (we start from the middle copy)
  const [offset, setOffset] = useState(ORIGINAL_LEN * CARD_W);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Auto-advance every 3s
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      moveTo(offset + CARD_W);
    }, 3000);
    return () => clearInterval(id);
  }, [isPaused, offset]);

  const moveTo = (newOffset: number) => {
    setIsTransitioning(true);
    setOffset(newOffset);
    const idx = Math.round(newOffset / CARD_W) % ORIGINAL_LEN;
    setActiveIdx(((idx % ORIGINAL_LEN) + ORIGINAL_LEN) % ORIGINAL_LEN);
  };

  // After transition ends, silently jump if we've gone past the cloned copies
  const handleTransitionEnd = () => {
    const maxOffset = (ORIGINAL_LEN * 2) * CARD_W;
    const minOffset = ORIGINAL_LEN * CARD_W;

    if (offset >= maxOffset) {
      setIsTransitioning(false);
      setOffset(minOffset + (offset - maxOffset));
    } else if (offset < minOffset) {
      setIsTransitioning(false);
      setOffset(maxOffset - (minOffset - offset));
    }
  };

  const handlePrev = () => {
    moveTo(offset - CARD_W);
  };

  const handleNext = () => {
    moveTo(offset + CARD_W);
  };

  const handleDotClick = (i: number) => {
    const currentBase = Math.floor(offset / (ORIGINAL_LEN * CARD_W)) * ORIGINAL_LEN;
    moveTo((currentBase + i) * CARD_W);
    setActiveIdx(i);
  };

  return (
    <section
      className="py-16 bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {d.heading}
          </h2>
          {/* Arrow controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-md transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-md transition-all"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Infinite carousel track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: 'flex',
              gap: '20px',
              transform: `translateX(-${offset}px)`,
              transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
              willChange: 'transform',
            }}
          >
            {items.map((t, idx) => (
              <div
                key={idx}
                style={{ width: `${CARD_W - 20}px`, flexShrink: 0 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-700 leading-relaxed italic flex-1 mb-6">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-snug">{t.name}</p>
                    <p className="text-xs text-gray-400 font-normal">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-6">
          {d.items.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? 'bg-[#00804d] w-6 h-2.5'
                  : 'bg-gray-200 w-2.5 h-2.5 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
