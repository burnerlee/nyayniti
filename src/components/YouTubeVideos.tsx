import React, { useState, useEffect } from 'react';

interface Video {
  url: string;
  videoId: string;
  title: string | null; // null until its oEmbed request settles
}

const SKELETON_COUNT = 6;

const Spinner: React.FC = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold" />
);

// Same footprint as a real card, so the grid doesn't change size when data arrives.
const VideoSkeleton: React.FC = () => (
  <div className="flex flex-col">
    <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
      <Spinner />
    </div>
    <div className="mt-4 space-y-2 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-11/12" />
      <div className="h-5 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [thumb, setThumb] = useState(`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`);

  return (
    <div className="flex flex-col">
      <a
        href={`https://www.youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video w-full bg-gray-100 overflow-hidden"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <img
          src={thumb}
          alt={video.title ?? 'YouTube video'}
          loading="lazy"
          onLoad={(e) => {
            // maxresdefault is missing for some videos; YouTube then serves a 120px placeholder.
            if (e.currentTarget.naturalWidth <= 120 && thumb.includes('maxresdefault')) {
              setThumb(`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`);
              return;
            }
            setImgLoaded(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-12 flex items-center justify-center bg-red-600 rounded-lg">
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </a>
      {video.title === null ? (
        <div className="mt-4 space-y-2 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-11/12" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
        </div>
      ) : (
        <h3 className="text-xl font-bold mt-4">{video.title}</h3>
      )}
    </div>
  );
};

const YouTubeVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQU6o6mdXaQesAoWwv7z0uhShj8cDstexIJWUAc4Efj--vPPIdW1ia2SHxgCN7fLF7BDgOD4ORrC4lA/pub?gid=0&single=true&output=csv');
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const csvText = await response.text();
        const parsed = parseCSV(csvText);
        setVideos(parsed);
        setLoading(false);

        // Titles arrive independently; each card swaps its skeleton for text when ready.
        parsed.forEach(async (video) => {
          const title = (await fetchVideoTitle(video.videoId)) || 'YouTube Video';
          if (!cancelled) {
            setVideos((prev) => prev.map((v) => (v.videoId === video.videoId ? { ...v, title } : v)));
          }
        });
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
        setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      cancelled = true;
    };
  }, []);

  const parseCSV = (csvText: string): Video[] => {
    const lines = csvText.split('\n').filter((line) => line.trim() !== '');
    return lines
      .slice(1) // header
      .map((line) => {
        const url = line.trim();
        const videoId = extractVideoId(url);
        return videoId ? { url, videoId, title: null } : null;
      })
      .filter((v): v is Video => v !== null);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" aria-busy="true">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <VideoSkeleton key={i} />
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

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No videos available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
};

export default YouTubeVideos;
