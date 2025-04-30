interface AdBannerProps {
  size: 'horizontal' | 'square' | 'vertical';
  className?: string;
}

export default function AdBanner({ size, className = '' }: AdBannerProps) {
  const dimensions = {
    horizontal: 'h-[90px] md:h-[120px]',
    square: 'h-[250px] md:h-[300px]',
    vertical: 'h-[400px] md:h-[600px]'
  };

  return (
    <div className={`w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center ${dimensions[size]} ${className} group hover:scale-[1.01] transition-transform duration-300`}>
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">Advertisement Space</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Contact us for advertising</p>
      </div>
    </div>
  );
}