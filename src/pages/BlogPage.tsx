import React, { useState } from 'react';
import Footer from '../components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import YouTubeVideos from '../components/YouTubeVideos';
import InstagramPosts from '../components/InstagramPosts';
import ProgressiveBackground from '../components/ProgressiveBackground';

// reference to the local image
const blogImg = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/blog.webp?raw=true"
const lowQualityImage = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/lowblog.webp?raw=true"

const BlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'videos'>('blogs');
  
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "How does writing influence your personal brand?",
      category: "Personal Injury",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/3985368/pexels-photo-3985368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      title: "How to get bail for the offense under section 498A of IPC",
      category: "Personal Injury",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      title: "How to get bail for the offense under section 498A of IPC",
      category: "Personal Injury",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  // Sample podcast videos data
  const podcastVideos = [
    {
      id: 1,
      title: "How to get bail for the offense under section 498A of IPC",
      thumbnail: "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "How to get bail for the offense under section 498A of IPC",
      thumbnail: "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "How to get bail for the offense under section 498A of IPC",
      thumbnail: "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      youtubeId: "dQw4w9WgXcQ"
    }
  ];

  // Sample social media posts
  const socialPosts = [
    {
      id: 1,
      username: "behold.social",
      followers: "94 followers",
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 0,
      caption: "The public demanded peremptorily that the seas should at any price be relieved from this formidable cetacean.",
      photoCredit: "Photo credit: Martin Widenka",
      link: "https://behold.so",
      hashtags: "#aass #indiepreneur #indehacker #ui #uiux #nocode #webaccessibility #a11y #uiserveme"
    },
    {
      id: 2,
      username: "behold.social",
      followers: "94 followers",
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 0,
      caption: "The public demanded peremptorily that the seas should at any price be relieved from this formidable cetacean.",
      photoCredit: "Photo credit: Martin Widenka",
      link: "https://behold.so",
      hashtags: "#aass #indiepreneur #indehacker #ui #uiux #nocode #webaccessibility #a11y #uiserveme"
    },
    {
      id: 3,
      username: "behold.social",
      followers: "94 followers",
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 0,
      caption: "The public demanded peremptorily that the seas should at any price be relieved from this formidable cetacean.",
      photoCredit: "Photo credit: Martin Widenka",
      link: "https://behold.so",
      hashtags: "#aass #indiepreneur #indehacker #ui #uiux #nocode #webaccessibility #a11y #uiserveme"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Dark Overlay */}
      <div className="relative bg-black h-[550px]">
        {/* Background Image with Overlay */}
        <ProgressiveBackground
          lowQualityImage={lowQualityImage}
          highQualityImage={blogImg}
          className="absolute inset-0 bg-black/60 z-0"
        />
        
        {/* Hero Content */}
        <div className="container mx-auto px-6 md:px-16 pt-32 relative z-10">
          <div className="max-w-md">
            <p className="text-gold font-medium mb-4">See how we work</p>
            <h1 className="text-6xl font-playfair text-white leading-tight">Blogs that show our expertise</h1>
          </div>
        </div>
      </div>
      
      {/* Tabs - positioned at the bottom of the hero section */}
      <div className="container mx-auto px-6 md:px-16 relative">
        <div className="absolute -top-[50px] left-0 inline-flex shadow-md">
          <button 
            className={`px-12 py-4 ${activeTab === 'blogs' ? 'bg-gold text-white' : 'bg-white text-black'}`}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs
          </button>
          <button 
            className={`px-12 py-4 ${activeTab === 'videos' ? 'bg-gold text-white' : 'bg-white text-black'}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-6 md:px-16 py-24">
        {activeTab === 'blogs' ? (
          <>
            <h2 className="text-2xl font-bold mb-12">Featured blog posts</h2>
            
            {/* Coming Soon Message */}
            <div className="flex flex-col items-center justify-center py-20">
              <h3 className="text-3xl font-playfair text-gray-800 mb-4">Coming Soon</h3>
              <p className="text-lg text-gray-600 text-center max-w-2xl">
                We're currently working on creating insightful legal content for you. 
                Our blog section will be available shortly with expert legal advice, case studies, 
                and the latest updates in Indian law.
              </p>
              <div className="mt-8 w-24 h-1 bg-gold"></div>
            </div>

            {/* Original Blog Posts - Commented Out
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-white overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-60 object-cover"
                  />
                  <div className="pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>{post.category}</span>
                      <span className="flex items-center">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-gold hover:text-darkGold transition-colors">
                      Read more <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            */}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-12">Featured Podcasts</h2>
            
            {/* YouTube Videos from Google Sheets */}
            <YouTubeVideos />
            
            {/* Social Media Presence Section */}
            <div className="mt-24">
              <h2 className="text-2xl font-bold mb-12">Social Presence</h2>
              <InstagramPosts />
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
