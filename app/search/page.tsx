import Link from 'next/link';
import Image from 'next/image';
import { parseHTML, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';

  const res = await fetch(
    `https://news.mewskhabar.com/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&_embed=true`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <p className="text-red-600">Error fetching results. Please try again later.</p>
      </main>
    );
  }

  const posts = await res.json();

  return (
    <main className="container mx-auto px-4 py-10 max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-6">Search Results for: “{query}”</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          😕 Sorry, no news found matching <strong>“{query}”</strong>.
        </p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post: any) => (
            <Link
              href={`/news/${post.slug}`}
              key={post.id}
              className="flex flex-col md:flex-row gap-4 bg-muted p-4 rounded hover:shadow-md transition"
            >
              <div className="relative w-full md:w-48 h-32 md:h-auto">
                <Image
                  src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                  alt={post.title.rendered}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">
                  {parseHTML(post.title.rendered)}
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {formatDate(post.date)}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {parseHTML(post.excerpt.rendered)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}