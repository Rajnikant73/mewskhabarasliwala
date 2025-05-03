export interface AdData {
    type: 'html' | 'image';
    content: string;
    size: 'horizontal' | 'square' | 'vertical';
    link?: string;
  }
  
  export async function getAdBySize(size: AdData['size']): Promise<AdData | null> {
    try {
      const res = await fetch(
        'https://news.mewskhabar.com/wp-json/wp/v2/ad_banner?acf_format=standard&per_page=100',
        {
          // Optional: revalidate every 60s (Next.js caching)
          next: { revalidate: 60 }
        }
      );
  
      const data = await res.json();
  
      const matching = data.filter(
        (item: any) => item.acf?.ad_size === size && item.acf?.ad_type
      );
  
      if (matching.length === 0) return null;
  
      const randomAd = matching[Math.floor(Math.random() * matching.length)];
  
      return {
        type: randomAd.acf.ad_type,
        content:
          randomAd.acf.ad_type === 'html'
            ? randomAd.acf.ad_html
            : randomAd.acf.ad_image__url,
        link: randomAd.acf.ad_link,
        size: randomAd.acf.ad_size,
      };
    } catch (error) {
      console.error('Failed to fetch ad:', error);
      return null;
    }
  }