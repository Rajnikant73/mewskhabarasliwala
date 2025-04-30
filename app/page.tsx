import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SidebarNews from '@/components/news/SidebarNews';
import CategorySection from '@/components/news/CategorySection';
import BreakingNews from '@/components/news/BreakingNews';
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

  return (
    <main className="min-h-screen">
      <BreakingNews />
      <AdBanner className="py-4" size="horizontal" />

      <div className="container mx-auto px-4 py-6">
        {/* Featured Article */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded mb-3">
                        {featuredPost._embedded?.['wp:term']?.[0]?.[0]?.name || 'समाचार'}
                      </span>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {parseHTML(featuredPost.title.rendered)}
                      </h1>
                      <div className="flex items-center text-sm mb-4">
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
            
            <div className="lg:col-span-1">
              <AdBanner className="mb-6" size="square" />
              <SidebarNews posts={sidebarPosts} />
            </div>
          </div>
        </div>

        <AdBanner className="my-8" size="horizontal" />

        {categories.slice(0, 3).map((category) => (
          <div key={category.id}>
            <CategorySection 
              title={category.name}
              category={category.slug}
              categoryId={category.id}
            />
            <AdBanner className="my-8" size="horizontal" />
          </div>
        ))}
      </div>
    </main>
  );
}