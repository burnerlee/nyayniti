import React, { useState, useEffect } from 'react';

interface Video {
  url: string;
  videoId: string;
  title: string;
}

const YouTubeVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQU6o6mdXaQesAoWwv7z0uhShj8cDstexIJWUAc4Efj--vPPIdW1ia2SHxgCN7fLF7BDgOD4ORrC4lA/pub?gid=0&single=true&output=csv');
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const csvText = await response.text();
        const parsedVideos = await parseCSV(csvText);
        setVideos(parsedVideos);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const parseCSV = async (csvText: string): Promise<Video[]> => {
    // Split by lines and remove header
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const header = lines[0];
    const dataLines = lines.slice(1);
    
    const videoPromises = dataLines.map(async (line) => {
      const url = line.trim();
      // Extract video ID from YouTube URL
      const videoId = extractVideoId(url);
      
      if (!videoId) return null;
      
      // Fetch video title from YouTube API
      const title = await fetchVideoTitle(videoId);
      
      return {
        url,
        videoId,
        title: title || 'YouTube Video' // Fallback title if API fails
      };
    });
    
    const videos = await Promise.all(videoPromises);
    return videos.filter(video => video !== null) as Video[];
  };

  const fetchVideoTitle = async (videoId: string): Promise<string> => {
    try {
      // Use YouTube oEmbed API to get video information
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch video title');
      }
      
      const data = await response.json();
      return data.title;
    } catch (error) {
      console.error('Error fetching video title:', error);
      return '';
    }
  };

  const extractVideoId = (url: string): string => {
    // Handle all possible YouTube URL formats
    
    // Early return for empty URLs
    if (!url) return '';
    
    try {
      // 1. Handle youtu.be short links (e.g., https://youtu.be/FEDZ_wB9gp0?si=VqhuiuzfK7IzSFqv)
      if (url.includes('youtu.be')) {
        // Extract the path after youtu.be/
        const path = url.split('youtu.be/')[1];
        if (!path) return '';
        
        // Get the video ID (everything before any query parameters)
        return path.split('?')[0].split('/')[0].split('&')[0];
      }
      
      // 2. Handle YouTube shorts (e.g., https://youtube.com/shorts/dA9FUf0YIaI?si=Br58GkpBRGG9Qynk)
      if (url.includes('/shorts/')) {
        // Extract the path after /shorts/
        const path = url.split('/shorts/')[1];
        if (!path) return '';
        
        // Get the video ID (everything before any query parameters)
        return path.split('?')[0].split('/')[0].split('&')[0];
      }
      
      // 3. Handle standard YouTube URLs with watch parameter
      // (e.g., https://youtu.be/watch?v=FEDZ_wB9gp0?si=VqhuiuzfK7IzSFqv)
      if (url.includes('watch?v=') || url.includes('&v=')) {
        // Use regex to extract the v parameter
        const regExp = /(?:\?|&)v=([^&#]+)/;
        const match = url.match(regExp);
        return match && match[1] ? match[1] : '';
      }
      
      // 4. Handle YouTube embed URLs
      if (url.includes('/embed/')) {
        const path = url.split('/embed/')[1];
        if (!path) return '';
        
        return path.split('?')[0].split('/')[0].split('&')[0];
      }
      
      // 5. Fallback to the original regex for any other format
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : '';
      
    } catch (error) {
      console.error('Error extracting video ID:', error, url);
      return '';
    }
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

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No videos available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {videos.map((video, index) => (
        <div key={index} className="flex flex-col">
          <div className="relative">
            <a 
              href={`https://www.youtube.com/watch?v=${video.videoId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative"
            >
              <img 
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} 
                alt={video.title}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-12 flex items-center justify-center bg-red-600 rounded-lg">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="white" 
                    className="w-8 h-8"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <h3 className="text-xl font-bold mt-4">{video.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default YouTubeVideos;
