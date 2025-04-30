import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Clock, Share2, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SidebarNews from '@/components/news/SidebarNews';
import AdBanner from '@/components/ads/AdBanner';
import { getPost, getLatestPosts } from '@/lib/wordpress';
import { formatDate, parseHTML } from '@/lib/utils';
import ShareButtons from '@/components/news/ShareButtons';

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'म्युज खबर',
      description: 'समाचार',
    };
  }

  return {
    title: `${parseHTML(post.title.rendered)} | म्युज खबर`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const [post, relatedPosts] = await Promise.all([
    getPost(params.slug),
    getLatestPosts(3)
  ]);

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">समाचार फेला परेन</h1>
          <p className="mt-2">माफ गर्नुहोस्, खोज्नुभएको समाचार फेला पार्न सकिएन।</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <AdBanner className="mb-8" size="horizontal" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-2">
            <Link 
              href={`/category/${post._embedded?.['wp:term']?.[0]?.[0]?.slug}`} 
              className="text-primary hover:underline"
            >
              {post._embedded?.['wp:term']?.[0]?.[0]?.name}
            </Link>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
              {parseHTML(post.title.rendered)}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-1" />
                {post._embedded?.author?.[0]?.name}
              </span>
            </div>
          </div>
          
          <AdBanner className="my-6" size="horizontal" />
          
          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden my-6">
              <Image 
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                className="object-cover"
                fill
                priority
              />
            </div>
          )}
          
          <ShareButtons 
            url={`https://mewskhabar.com/news/${post.slug}`}
            title={post.title.rendered}
          />
          
          <Separator className="my-6" />
          
          <article className="prose prose-stone dark:prose-invert max-w-none">
            {parseHTML(post.content.rendered)}
          </article>

          <AdBanner className="my-8" size="horizontal" />
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <AdBanner className="mb-6" size="square" />
            
            <h3 className="text-xl font-bold mb-4">थप समाचार</h3>
            <SidebarNews posts={relatedPosts} />
            
            <AdBanner className="mt-6" size="vertical" />
          </div>
        </div>
      </div>
    </main>
  );
}