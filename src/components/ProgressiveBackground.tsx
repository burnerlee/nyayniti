import React, { useState, useEffect } from 'react';

interface ProgressiveBackgroundProps {
  lowQualityImage: string;
  highQualityImage: string;
  className?: string;
  overlayOpacity?: number; // Optional prop for customizing the dark overlay
  children?: React.ReactNode;
}

const ProgressiveBackground: React.FC<ProgressiveBackgroundProps> = ({
  lowQualityImage,
  highQualityImage,
  className = "",
  overlayOpacity = 60, // Default to 60% black overlay
  children
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

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`absolute inset-0 ${overlayClass} z-0 transition-all duration-700`}
        style={{
          backgroundImage: `url(${imageLoaded ? highQualityImage : lowQualityImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'darken',
          filter: !imageLoaded ? 'blur(8px)' : 'none',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export default ProgressiveBackground;