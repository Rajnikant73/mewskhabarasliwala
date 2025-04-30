'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">केही गडबड भयो</h2>
      <p className="text-muted-foreground mb-8">माफ गर्नुहोस्, एउटा त्रुटि भयो। कृपया पुन: प्रयास गर्नुहोस्।</p>
      <Button onClick={reset}>पुन: प्रयास गर्नुहोस्</Button>
    </div>
  );
}