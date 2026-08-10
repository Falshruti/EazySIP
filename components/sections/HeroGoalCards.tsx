'use client';

import { GraduationCap, Briefcase, Heart, Home, Leaf } from 'lucide-react';

interface GoalCard {
  icon: any;
  title: string;
  time: string;
}

const goalCards: GoalCard[] = [
  {
    icon: GraduationCap,
    title: 'भविष्यको लागि अन-स्पट फन्ड',
    time: '10:00 AM',
  },
  {
    icon: Briefcase,
    title: 'पहिलो कमाई पहिलो बचत',
    time: '10:00 AM',
  },
  {
    icon: Heart,
    title: 'भविष्यको लागि सुरक्षित भविष्य',
    time: '10:00 AM',
  },
  {
    icon: Home,
    title: 'आफ्नो घर आफ्नो सपना',
    time: '10:00 AM',
  },
  {
    icon: Leaf,
    title: 'रिटायरमेन्ट जीवन',
    time: '10:00 AM',
  },
];

export default function HeroGoalCards() {
  return (
    <div className="w-full pt-20 pb-4 px-2 sm:px-4 max-w-7xl mx-auto z-20 relative">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3">
        {goalCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-300 rounded-xl p-2.5 sm:p-3 shadow-md flex items-center gap-2.5 border border-white/40 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 shrink-0 group-hover:scale-105 transition-transform">
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-xs font-semibold text-gray-900 leading-snug line-clamp-2">
                  {card.title}
                </p>
                <span className="text-[9px] text-gray-500 block mt-0.5 font-medium">
                  {card.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
