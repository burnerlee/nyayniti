import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, it means we're targeting a specific section
    // So we don't scroll to top in that case
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // If there is a hash, try to scroll to that specific element
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [pathname, hash]); // Only run this effect when pathname or hash changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
