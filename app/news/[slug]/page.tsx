import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Clock } from 'lucide-react';

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
      title: 'मेउज खबर',
      description: 'समाचार',
    };
  }

  return {
    title: `${parseHTML(post.title.rendered)} | मेउज खबर`,
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

  // Estimate read time
  const plainText = post.content.rendered.replace(/<[^>]+>/g, '');
  const wordCount = plainText.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200); // average words per minute

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <AdBanner className="w-full max-w-[728px] py-2" size="horizontal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-2">
            <Link
              href={`/category/${post._embedded?.['wp:term']?.[0]?.[0]?.slug}`}
              className="text-primary hover:underline text-sm font-medium"
            >
              {post._embedded?.['wp:term']?.[0]?.[0]?.name}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug mt-2">
              {parseHTML(post.title.rendered)}
            </h1>
            <div className="mt-3 flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {post._embedded?.author?.[0]?.name}
              </span>
              <span className="text-xs text-blue-500 ml-auto">
                अनुमानित पढ्ने समय: {readTime} मिनेट
              </span>
            </div>
          </div>

          <div className="flex justify-center my-6">
            <AdBanner className="w-full max-w-[728px] py-2" size="horizontal" />
          </div>

          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden my-6">
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                className="object-cover"
                fill
                priority
              />
            </div>
          )}

          <article className="prose prose-stone dark:prose-invert max-w-none text-[1.08rem] leading-[1.8]">
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </article>

          <Separator className="my-6" />

          <ShareButtons
            url={`https://mewskhabar.com/news/${post.slug}`}
            title={post.title.rendered}
          />

          <div className="flex justify-center my-8">
            <AdBanner className="w-full max-w-[728px] py-2" size="horizontal" />
          </div>
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