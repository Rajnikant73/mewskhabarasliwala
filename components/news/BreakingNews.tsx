'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const breakingNews = [
  'Breaking: Major policy changes announced in parliament',
  'Weather Alert: Heavy rainfall expected in western regions',
  'Sports: National team qualifies for World Cup',
  'Tech: New breakthrough in renewable energy'
];

export default function BreakingNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
        setIsVisible(true);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center mr-4 whitespace-nowrap">
            <AlertTriangle size={18} className="mr-2 animate-pulse" />
            <span className="font-semibold">Breaking News</span>
          </div>
          <div className="relative overflow-hidden flex-1">
            <p 
              className={cn(
                'transition-all duration-500 text-sm md:text-base',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
            >
              {breakingNews[currentIndex]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}