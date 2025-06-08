import React, { useState, useEffect } from 'react';
import { getImagePath } from '../utils/image';

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
    img.src = getImagePath(highQualityImage);
    
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