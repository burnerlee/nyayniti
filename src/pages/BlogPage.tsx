import React, { useState } from 'react';
import Footer from '../components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import YouTubeVideos from '../components/YouTubeVideos';
import InstagramPosts from '../components/InstagramPosts';
import ProgressiveBackground from '../components/ProgressiveBackground';
import { AUTHOR_PHOTO, blogPosts, formatDate } from '../utils/blogs';
import { useSeo } from '../utils/useSeo';
import pages from '../utils/pages.json';

// reference to the local image
const blogImg = "blog.webp"
const lowQualityImage = "lowblog.webp"

const BlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'videos'>('blogs');
  useSeo(pages['/blog'].title, pages['/blog'].description);
  
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
      <div className="container mx-auto max-w-7xl px-6 md:px-12 py-24">
        {activeTab === 'blogs' ? (
          <>
            <h2 className="text-3xl font-playfair font-bold mb-12 text-center">Featured blog posts</h2>

            {blogPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <h3 className="text-3xl font-playfair text-gray-800 mb-4">Coming Soon</h3>
                <p className="text-lg text-gray-600 text-center max-w-2xl">
                  We're currently working on creating insightful legal content for you.
                </p>
                <div className="mt-8 w-24 h-1 bg-gold"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {blogPosts.map(post => (
                  <article key={post.slug} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
                    {post.cover && (
                      <Link to={`/blog/${post.slug}`}>
                        <img src={post.cover} alt={post.title} className="w-full h-56 object-cover" loading="lazy" />
                      </Link>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <span>{post.tags[0] ?? formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-playfair font-bold mb-3 leading-snug">
                        <Link to={`/blog/${post.slug}`} className="hover:text-gold transition-colors">{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={AUTHOR_PHOTO} alt={post.author} className="w-8 h-8 rounded-full object-cover object-top mr-2" />
                          <span className="text-sm text-gray-700">{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-gold hover:text-darkGold transition-colors">
                          Read more <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
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
