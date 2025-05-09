import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Flame, Search } from 'lucide-react';

import BreakingNews from '@/components/news/BreakingNews';
import SidebarNews from '@/components/news/SidebarNews';
import CategorySection from '@/components/news/CategorySection';
import AdBanner from '@/components/ads/AdBanner';

import { getLatestPosts, getCategories } from '@/lib/wordpress';
import { formatDate, parseHTML } from '@/lib/utils';

export default async function Home() {
  const [latestPosts, categories] = await Promise.all([
    getLatestPosts(10).catch(() => []),
    getCategories().catch(() => [])
  ]);

  const featuredPost = latestPosts[0];
  const sidebarPosts = latestPosts.slice(1, 4);
  const otherPosts = latestPosts.slice(4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreakingNews />

      {/* 🔍 Search Bar */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <form action="/search" method="GET" className="relative w-full max-w-xl">
            <input
              type="text"
              name="q"
              placeholder="Search latest news..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </span>
            <button
              type="submit"
              className="absolute right-2 top-[6px] bg-primary text-white px-4 py-1.5 rounded-md text-sm hover:bg-primary/90 transition"
            >
              खोज्नुहोस्
            </button>
          </form>
        </div>
      </div>

      <AdBanner className="py-6" size="horizontal" />

      {/* ⭐ Featured + Sidebar */}
      <div className="container mx-auto px-4 py-6 max-w-screen-xl flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          {featuredPost ? (
            <Link href={`/news/${featuredPost.slug}`}>
              <div className="relative overflow-hidden rounded-lg group">
                <div className="relative h-[400px] w-full">
                  <Image
                    src={featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                    alt={featuredPost.title.rendered}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded mb-3">
                    {featuredPost._embedded?.['wp:term']?.[0]?.[0]?.name || 'समाचार'}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-snug">
                    {parseHTML(featuredPost.title.rendered)}
                  </h1>
                  <div className="flex items-center text-sm mb-2">
                    <span className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(featuredPost.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {featuredPost._embedded?.author?.[0]?.name}
                    </span>
                  </div>
                  <div className="text-gray-200 line-clamp-2">
                    {parseHTML(featuredPost.excerpt.rendered)}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-card rounded-lg p-8 text-center">
              <p className="text-muted-foreground">समाचारहरू उपलब्ध छैनन्</p>
            </div>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 self-start">
            <AdBanner className="mb-6" size="square" />
            <SidebarNews posts={sidebarPosts} />
            <AdBanner className="mt-6" size="vertical" />
          </div>
        </div>
      </div>

      <AdBanner className="my-8" size="horizontal" />

      {/* 📁 Category Grid */}
      <section className="container mx-auto px-4 py-6 max-w-screen-xl">
        <h2 className="text-xl font-semibold mb-4">📂 प्रमुख विधाहरू</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-white transition text-center text-sm font-medium"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <AdBanner className="my-8" size="horizontal" />

      {/* 📰 Category Sections */}
      {categories.slice(0, 3).map((category) => (
        <div key={category.id} className="container mx-auto px-4 py-6 max-w-screen-xl">
          <CategorySection title={category.name} category={category.slug} categoryId={category.id} />
          <AdBanner className="my-6" size="horizontal" />
        </div>
      ))}

      {/* 🔥 Trending News */}
      <section className="container mx-auto px-4 py-6 max-w-screen-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Flame size={20} className="text-orange-500" />
          🔥 ट्रेन्डिङ समाचार
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link href={`/news/${post.slug}`} key={post.id} className="group bg-muted rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative h-[180px] w-full">
                <Image
                  src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                  alt={post.title.rendered}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold line-clamp-2">
                  {parseHTML(post.title.rendered)}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {parseHTML(post.excerpt.rendered)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ➕ Load More Button */}
      <div className="text-center py-10">
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          थप समाचार हेर्नुहोस्
        </button>
      </div>
    </main>
  );
}