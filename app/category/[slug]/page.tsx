import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getCategories, getPostsByCategory } from '@/lib/wordpress';
import { formatDate, parseHTML } from '@/lib/utils';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === params.slug);
  
  return {
    title: `${category?.name || 'श्रेणी'} | मेउज खबर`,
    description: category?.description || 'यस श्रेणीका समाचारहरू',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">श्रेणी फेला परेन</h1>
        <p>माफ गर्नुहोस्, तपाइँले खोज्नुभएको श्रेणी फेला परेन।</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          होमपेजमा फर्कनुहोस्
        </Link>
      </div>
    );
  }

  const posts = await getPostsByCategory(category.id, 12);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-muted-foreground mb-6">{category.description}</p>
      
      <Separator className="mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? posts.map((post) => (
          <Link href={`/news/${post.slug}`} key={post.id} className="group">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="relative h-48 w-full">
                <Image 
                  src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                  alt={post.title.rendered}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {parseHTML(post.title.rendered)}
                </h2>
                <div className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {parseHTML(post.excerpt.rendered)}
                </div>
                <div className="mt-auto flex items-center text-xs text-muted-foreground">
                  <Clock size={12} className="mr-1" />
                  {formatDate(post.date)}
                </div>
              </div>
            </div>
          </Link>
        )) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            समाचारहरू उपलब्ध छैनन्
          </div>
        )}
      </div>
    </main>
  );
}