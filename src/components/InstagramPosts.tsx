import React, { useState, useEffect } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

interface InstagramPost {
  url: string;
}

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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
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
      {posts.map((post, index) => (
          <InstagramEmbed url={post.url}/>
      ))}
    </div>
  );
};

export default InstagramPosts;
