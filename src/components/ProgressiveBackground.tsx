import React, { useState, useEffect } from 'react';
import { getImagePath } from '../utils/image';

interface ProgressiveBackgroundProps {
  lowQualityImage: string;
  highQualityImage: string;
  className?: string;
}

// The low-quality image is a tiny (~32px) placeholder that Vite inlines as a data URI, so it paints
// immediately; the full image fades in over it once decoded.
const ProgressiveBackground: React.FC<ProgressiveBackgroundProps> = ({
  lowQualityImage,
  highQualityImage,
  className = "",
}) => {
  const [loaded, setLoaded] = useState(false);
  const high = getImagePath(highQualityImage);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = high;
    // Cached images can finish before onload is attached.
    if (img.complete) setLoaded(true);
    return () => {
      img.onload = null;
    };
  }, [high]);

  const layer = (url: string): React.CSSProperties => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  return (
    <div className={`${className} overflow-hidden`}>
      <div
        className="absolute inset-0 scale-110 blur-xl"
        style={layer(getImagePath(lowQualityImage))}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={layer(high)}
        aria-hidden="true"
      />
      {/* Dark overlay must sit above both image layers. */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
    </div>
  );
};

export default ProgressiveBackground;
