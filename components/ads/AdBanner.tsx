interface AdData {
  type: 'image' | 'html';
  content: string;
  link?: string;
}

interface AdBannerProps {
  size: 'horizontal' | 'square' | 'vertical';
  className?: string;
  adData?: AdData | null;
}

export default function AdBanner({ size, className = '', adData }: AdBannerProps) {
  const dimensions: Record<AdBannerProps['size'], string> = {
    horizontal: 'h-[50px] md:h-[80px]',
    square: 'h-[160px] md:h-[200px]',
    vertical: 'h-[240px] md:h-[360px]',
  };

  return (
    <div
      className={`w-full overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center ${dimensions[size]} ${className} group hover:scale-[1.01] transition-transform duration-300`}
    >
      {!adData ? (
        <div className="text-center px-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
            Advertisement Space
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Contact us for advertising</p>
        </div>
      ) : adData.type === 'image' ? (
        <a href={adData.link || '#'} target="_blank" rel="noopener noreferrer">
          <img
            src={adData.content}
            alt="Sponsored Ad"
            className="h-full w-full object-cover rounded-lg"
          />
        </a>
      ) : adData.type === 'html' ? (
        <div dangerouslySetInnerHTML={{ __html: adData.content }} />
      ) : null}
    </div>
  );
}