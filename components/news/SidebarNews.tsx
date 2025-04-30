import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Post } from '@/lib/wordpress';
import { formatDate, parseHTML } from '@/lib/utils';

interface SidebarNewsProps {
  posts: Post[];
}

export default function SidebarNews({ posts }: SidebarNewsProps) {
  if (!posts?.length) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8 text-muted-foreground">
          समाचारहरू उपलब्ध छैनन्
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link href={`/news/${post.slug}`} key={post.id} className="block group">
          <div className="flex gap-3 bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-3">
            <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
              <Image 
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                alt={post.title.rendered}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                fill
              />
            </div>
            <div className="flex-1">
              <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-0.5 text-xs font-semibold rounded mb-1">
                {post._embedded?.['wp:term']?.[0]?.[0]?.name}
              </span>
              <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                {parseHTML(post.title.rendered)}
              </h3>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Clock size={12} className="mr-1" />
                {formatDate(post.date)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}