'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Menu, X, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function Header() {
  const { setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState({ open: false, news: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 text-white',
        scrolled ? 'bg-[#004A90] shadow-md' : 'bg-[#0056A0]'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* ✅ Branding */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-red-300 transition">
              Mews Khabar
            </span>
          </Link>

          {/* ✅ Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-white">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-[#DA1E37]">News</DropdownMenuTrigger>
              <DropdownMenuContent className="text-black">
                {['Politics', 'Business', 'Tech', 'International'].map((label) => (
                  <DropdownMenuItem key={label}>
                    <Link href={`/category/${label.toLowerCase()}`}>{label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/rental" className="hover:text-[#DA1E37]">Rental</Link>
            <Link href="/coupons" className="hover:text-[#DA1E37]">Coupons</Link>
          </nav>

          {/* ✅ Right Controls */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:text-red-300">
              <Bell size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-red-300">
                  <Sun className="h-5 w-5 dark:hidden" />
                  <Moon className="h-5 w-5 hidden dark:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-black">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ✅ Mobile Toggle */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMenuOpen((prev) => ({ ...prev, open: !prev.open }))}
            >
              {isMenuOpen.open ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isMenuOpen.open && (
        <div className="lg:hidden bg-[#0056A0] border-t border-blue-800 text-white">
          <div className="p-4 space-y-4">
            {/* News Dropdown */}
            <div>
              <button
                onClick={() => setIsMenuOpen((prev) => ({ ...prev, news: !prev.news }))}
                className="w-full flex justify-between items-center text-left text-sm font-semibold"
              >
                News
                <ChevronDown
                  size={18}
                  className={`transition-transform ${isMenuOpen.news ? 'rotate-180' : ''}`}
                />
              </button>
              {isMenuOpen.news && (
                <div className="pl-4 mt-2 space-y-2 text-sm">
                  {['Politics', 'Business', 'Tech', 'International'].map((label) => (
                    <Link
                      key={label}
                      href={`/category/${label.toLowerCase()}`}
                      className="block hover:text-red-300"
                      onClick={() => setIsMenuOpen({ open: false, news: false })}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Rental */}
            <Link
              href="/rental"
              className="block text-sm font-semibold hover:text-red-300"
              onClick={() => setIsMenuOpen({ open: false, news: false })}
            >
              Rental
            </Link>

            {/* Coupons */}
            <Link
              href="/coupons"
              className="block text-sm font-semibold hover:text-red-300"
              onClick={() => setIsMenuOpen({ open: false, news: false })}
            >
              Coupons
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}