'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  title: { rendered: string };
  slug: string;
}

export default function BreakingNews() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchBreakingNews() {
      try {
        const res = await fetch('https://news.mewskhabar.com/wp-json/wp/v2/posts?categories=9&per_page=5&_fields=title,slug');
        const data = await res.json();
        setNewsList(data);
      } catch (error) {
        console.error('Error fetching breaking news:', error);
      }
    }

    fetchBreakingNews();
  }, []);

  if (newsList.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white py-2 overflow-hidden whitespace-nowrap">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center">
          <AlertTriangle size={18} className="mr-2 animate-pulse" />
          <span className="font-semibold">Breaking News:</span>
        </div>
        <div className="overflow-hidden relative w-full">
          <div className="animate-scroll-x inline-block whitespace-nowrap">
            {newsList.map((news, i) => (
              <Link href={`/news/${news.slug}`} key={i} className="mx-4 inline-block hover:underline">
                {news.title.rendered}
                <span className="mx-2">|</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll-x {
          animation: scroll-left 25s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
