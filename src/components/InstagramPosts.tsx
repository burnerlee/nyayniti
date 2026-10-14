import React, { useState, useEffect, useRef } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

interface InstagramPost {
  url: string;
}

const SKELETON_COUNT = 3;
// Instagram reel embeds settle around this height; the box is fixed so the page doesn't jump.
const BOX_HEIGHT = 'h-[640px]';

const Spinner: React.FC = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold" />
);

// Fixed-size box: spinner shows until Instagram's iframe appears, then the embed fades in.
const InstagramCard: React.FC<{ url: string }> = ({ url }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const frame = el.querySelector('iframe[src*="instagram.com"]');
      if (frame && !ready) setReady(true);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(el, { childList: true, subtree: true });
    // If the embed never renders (blocked script), stop showing the spinner.
    const timeout = window.setTimeout(() => setReady(true), 15000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [ready]);

  return (
    <div className={`relative ${BOX_HEIGHT} w-full bg-gray-100 overflow-hidden`}>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div
        ref={ref}
        className={`h-full w-full overflow-y-auto transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
      >
        <InstagramEmbed url={url} width="100%" />
      </div>
    </div>
  );
};

const InstagramPosts: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQU6o6mdXaQesAoWwv7z0uhShj8cDstexIJWUAc4Efj--vPPIdW1ia2SHxgCN7fLF7BDgOD4ORrC4lA/pub?gid=806438669&single=true&output=csv');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        
        const csvText = await response.text();
        const parsedPosts = parseCSV(csvText);
        setPosts(parsedPosts);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError('Failed to load Instagram posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const parseCSV = (csvText: string): InstagramPost[] => {
    // Split by lines and remove header
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const header = lines[0];
    const dataLines = lines.slice(1);
    
    return dataLines.map((line) => {
      const url = line.trim();
      
      // Create a mock Instagram post with sample data
      // In a real app, you would fetch this data from Instagram API
      return {
        url,
      };
    }).filter(post => post.url !== '');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" aria-busy="true">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <div key={i} className={`${BOX_HEIGHT} w-full bg-gray-100 flex items-center justify-center`}>
            <Spinner />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-gold text-white hover:bg-darkGold transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No Instagram posts available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <InstagramCard key={post.url} url={post.url} />
      ))}
    </div>
  );
};

export default InstagramPosts;
