'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Search, Menu, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-background'
    )}>
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-2xl text-primary">
              Mews Khabar
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/category/politics" 
                className="hover:text-primary transition-colors"
              >
                Politics
              </Link>
              <Link 
                href="/category/sports" 
                className="hover:text-primary transition-colors"
              >
                Sports
              </Link>
            </nav>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4">
                  <h4 className="font-medium leading-none">Search News</h4>
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <div className="p-2">
                  <h4 className="font-medium mb-2">Notifications</h4>
                  {notifications > 0 ? (
                    <div className="space-y-2">
                      {[...Array(notifications)].map((_, i) => (
                        <div key={i} className="p-2 hover:bg-accent rounded-md cursor-pointer">
                          <p className="text-sm font-medium">New article published</p>
                          <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No new notifications</p>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative w-9 h-9">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <span className="mr-2">💻</span>
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t py-4">
          <div className="container mx-auto px-4">
            <nav className="space-y-2 mb-4">
              <Link 
                href="/category/politics" 
                className="block px-4 py-2 rounded-md hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Politics
              </Link>
              <Link 
                href="/category/sports" 
                className="block px-4 py-2 rounded-md hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sports
              </Link>
            </nav>
            <div className="mt-4">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}