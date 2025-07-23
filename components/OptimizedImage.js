import React, { useState } from 'react';
import Image from 'next/image';

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleError = (e) => {
    console.error('OptimizedImage: Error loading image:', src, e);

    // Try to use a different Cloudinary transformation as fallback
    if (src.includes('cloudinary.com')) {
      const originalUrl = src.replace('/c_scale,w_400/', '/');
      if (originalUrl !== src) {
        console.log('Trying original URL as fallback:', originalUrl);
        e.target.src = originalUrl;
        return;
      }
    }

    setImageError(true);
    setImageLoading(false);
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  // If there's an error, show fallback
  if (imageError) {
    return (
      <div className={`w-full h-48 bg-gray-800 flex items-center justify-center ${className}`} {...props}>
        <span className="text-white/60 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-48 overflow-hidden ${className}`} {...props}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={192}
        className={`w-full h-48 object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={true}
        priority={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
