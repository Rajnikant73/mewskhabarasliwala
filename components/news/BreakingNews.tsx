'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Clock } from 'lucide-react';

interface StockData {
  symbol: string;
  ltp: number;
  change: number;
  percent: number;
}

export default function NepseTicker() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch('https://nepalstock.onrender.com/nepse-data/today-price');
        const data = await res.json();
        setStocks(data.slice(0, 20)); // Show first 20 stocks
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('NEPSE API error:', err);
      }
    }

    fetchStocks();
    const interval = setInterval(fetchStocks, 60000); // Refresh every 60s

    return () => clearInterval(interval);
  }, []);

  if (!stocks || stocks.length === 0) return null;

  return (
    <div className="bg-neutral-900 text-white py-2 overflow-hidden whitespace-nowrap hover:pause-scroll">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center">
          <TrendingUp size={18} className="mr-2 text-green-400 animate-pulse" />
          <span className="font-semibold">NEPSE Live:</span>
        </div>
        <div className="overflow-hidden relative w-full">
          <div className="animate-scroll-x inline-block whitespace-nowrap">
            {stocks.map((stock, i) => {
              const isPositive = stock.change >= 0;
              const arrow = isPositive ? '🔺' : '🔻';
              const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
              return (
                <span key={i} className="mx-4 inline-block">
                  <span className="font-bold">{stock.symbol}</span>: 
                  <span className="ml-1">{stock.ltp} NPR</span>
                  <span className={`ml-2 ${colorClass}`}>
                    ({arrow} {stock.change}, {stock.percent}%)
                  </span>
                  <span className="mx-2">|</span>
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-center text-sm gap-1 ml-4">
          <Clock size={14} className="text-yellow-400" />
          <span className="text-gray-300">Updated: {lastUpdated}</span>
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