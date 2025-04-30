import { cache } from 'react';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export interface Post {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
    }>;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
  const timeout = 10000; // 10 seconds
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const getCategories = cache(async (): Promise<Category[]> => {
  if (!WP_API_URL) {
    console.error('WordPress API URL not configured');
    return [];
  }
  
  try {
    const res = await fetchWithTimeout(`${WP_API_URL}/categories?per_page=100`);
    if (!res.ok) {
      console.error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});

export const getPosts = cache(async (params: { 
  category?: number;
  page?: number;
  per_page?: number;
} = {}): Promise<Post[]> => {
  if (!WP_API_URL) {
    console.error('WordPress API URL not configured');
    return [];
  }
  
  try {
    const searchParams = new URLSearchParams({
      _embed: 'true',
      per_page: String(params.per_page || 10),
      page: String(params.page || 1),
      ...(params.category ? { categories: String(params.category) } : {})
    });

    const url = `${WP_API_URL}/posts?${searchParams}`;
    const res = await fetchWithTimeout(url);
    
    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!WP_API_URL) {
    console.error('WordPress API URL not configured');
    return null;
  }
  
  try {
    const res = await fetchWithTimeout(`${WP_API_URL}/posts?slug=${slug}&_embed=true`);
    if (!res.ok) {
      console.error(`Failed to fetch post: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const posts = await res.json();
    return posts.length ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
});

export const getLatestPosts = cache(async (count: number = 5): Promise<Post[]> => {
  return getPosts({ per_page: count });
});

export const getPostsByCategory = cache(async (
  categoryId: number,
  count: number = 10
): Promise<Post[]> => {
  return getPosts({ category: categoryId, per_page: count });
});