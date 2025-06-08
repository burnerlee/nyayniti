import React, { useState, useEffect } from 'react';

interface ProgressiveBackgroundProps {
  lowQualityImage: string;
  highQualityImage: string;
  className?: string;
  overlayOpacity?: number; // Optional prop for customizing the dark overlay
}

const ProgressiveBackground: React.FC<ProgressiveBackgroundProps> = ({
  lowQualityImage,
  highQualityImage,
  className = "",
  overlayOpacity = 60, // Default to 60% black overlay
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Reset state when image sources change
    setImageLoaded(false);
    
    // Preload the high-resolution image
    const img = new Image();
    img.src = highQualityImage;
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    return () => {
      // Clean up by removing the onload handler if component unmounts
      img.onload = null;
    };
  }, [highQualityImage]);

  // Calculate the black overlay based on provided opacity
  const overlayClass = `bg-black/${overlayOpacity}`;

  // Function to handle image path
  const getImagePath = (imagePath: string) => {
    // If it's a URL (starts with http or https), use it directly
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // For local images, import from assets
    try {
      // Using dynamic import for local images
      const image = new URL(`../assets/${imagePath}`, import.meta.url).href;
      return image;
    } catch (error) {
      console.error('Error loading image:', error);
      return '';
    }
  };

  return (
      <div 
        className={`${overlayClass} ${className} transition-all duration-700`}
        style={{
          backgroundImage: `url(${imageLoaded ? getImagePath(highQualityImage) : getImagePath(lowQualityImage)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'darken',
          filter: !imageLoaded ? 'blur(8px)' : 'none',
        }}
      />
  );
};

export default ProgressiveBackground;