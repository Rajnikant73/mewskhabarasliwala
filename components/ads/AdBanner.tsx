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
    horizontal: 'h-[90px] md:h-[120px]',
    square: 'h-[250px] md:h-[300px]',
    vertical: 'h-[400px] md:h-[600px]',
  };

  const renderAdContent = () => {
    if (!adData) {
      return (
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
            Advertisement Space
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Contact us for advertising</p>
        </div>
      );
    }

    if (adData.type === 'image') {
      return (
        <a href={adData.link || '#'} target="_blank" rel="noopener noreferrer">
          <img
            src={adData.content}
            alt="Sponsored Ad"
            className="h-full w-full object-cover rounded-lg"
          />
        </a>
      );
    }

    if (adData.type === 'html') {
      return <div dangerouslySetInnerHTML={{ __html: adData.content }} />;
    }

    return null;
  };

  return (
    <div
      className={`w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${dimensions[size]} ${className} group hover:scale-[1.01] transition-transform duration-300`}
    >
      {renderAdContent()}
    </div>
  )
}