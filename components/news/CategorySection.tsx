import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { getPostsByCategory } from '@/lib/wordpress';
import { formatDate, parseHTML } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  category: string;
  categoryId: number;
}

export default async function CategorySection({ title, category, categoryId }: CategorySectionProps) {
  const posts = await getPostsByCategory(categoryId, 4);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-3">{title}</h2>
        <Link href={`/category/${category}`}>
          <Button variant="link" className="group">
            सबै हेर्नुहोस् 
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link href={`/news/${post.slug}`} key={post.id} className="group">
              <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative h-40 w-full">
                  <Image 
                    src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                    alt={post.title.rendered}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {parseHTML(post.title.rendered)}
                  </h3>
                  <div className="mt-auto flex items-center text-xs text-muted-foreground">
                    <Clock size={12} className="mr-1" />
                    {formatDate(post.date)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          समाचारहरू उपलब्ध छैनन्
        </div>
      )}
    </section>
  );
}