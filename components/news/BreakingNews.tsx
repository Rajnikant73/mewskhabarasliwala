'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface BreakingPost {
  slug: string;
  title: { rendered: string };
}

export default function BreakingNews() {
  const [newsList, setNewsList] = useState<BreakingPost[]>([]);

  useEffect(() => {
    async function fetchBreakingNews() {
      try {
        const res = await fetch(
          'https://news.mewskhabar.com/wp-json/wp/v2/posts?categories=9&per_page=5&_fields=title,slug'
        );
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
    <div className="bg-red-600 text-white py-2 overflow-hidden whitespace-nowrap hover:pause-scroll">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center">
          <AlertTriangle size={18} className="mr-2 animate-pulse" />
          <span className="font-semibold">Breaking News:</span>
        </div>
        <div className="overflow-hidden relative w-full">
          <div className="animate-scroll-x inline-block whitespace-nowrap">
            {newsList.map((post, i) => (
              <Link
                key={i}
                href={`/news/${post.slug}`}
                className="mx-4 inline-block hover:underline"
              >
                {post.title.rendered}
                <span className="mx-2">|</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll-x {
          animation: scroll-left 50s linear infinite;
        }
        .hover\\:pause-scroll:hover {
          animation-play-state: paused;
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