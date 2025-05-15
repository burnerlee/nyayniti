import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "Understanding Section 498A: Legal Protections and Misuse",
    excerpt: "An in-depth analysis of Section 498A of the Indian Penal Code, its purpose, implementation, and concerns regarding potential misuse.",
    date: "May 15, 2023",
    author: "Shubham Kumar",
    image: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Navigating Divorce Proceedings in India: A Comprehensive Guide",
    excerpt: "A step-by-step guide to understanding divorce proceedings in India, including grounds for divorce, alimony considerations, and child custody.",
    date: "June 22, 2023",
    author: "Anubhav Jain",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "Property Rights in Marriage: What You Need to Know",
    excerpt: "An exploration of property rights within marriage in India, covering joint ownership, inheritance, and protection of assets.",
    date: "July 10, 2023",
    author: "Shubham Kumar",
    image: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

// Sample video data
const videos = [
  {
    id: 1,
    title: "Section 498A Explained: Rights and Remedies",
    duration: "15:24",
    date: "April 18, 2023",
    thumbnail: "https://images.pexels.com/photos/8112139/pexels-photo-8112139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/watch?v=example1"
  },
  {
    id: 2,
    title: "Divorce Process in India: Legal Steps and Timeline",
    duration: "22:37",
    date: "May 5, 2023",
    thumbnail: "https://images.pexels.com/photos/8111965/pexels-photo-8111965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/watch?v=example2"
  },
  {
    id: 3,
    title: "Matrimonial Property Rights: Legal Perspective",
    duration: "18:42",
    date: "June 12, 2023",
    thumbnail: "https://images.pexels.com/photos/8112136/pexels-photo-8112136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/watch?v=example3"
  }
];

const BlogsVideosSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'videos'>('blogs');

  return (
    <section className="bg-dark-gradient text-white py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-12">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-0.5 bg-gold mr-3"></div>
            <h2 className="text-lg text-gold">See how we work</h2>
          </div>
          <h3 className="text-4xl md:text-6xl font-playfair mb-12">
            {activeTab === 'blogs' ? 'Blogs that show our expertise' : 'Videos that explain complex legal matters'}
          </h3>
        </div>
      </div>

      {/* Tab selector - Fixed with proper padding on mobile */}
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex w-full md:w-1/2 mb-12">
          <button
            className={`w-1/2 py-4 text-center text-lg font-medium transition-colors ${
              activeTab === 'blogs' ? 'bg-gold text-white' : 'bg-white text-black'
            }`}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs
          </button>
          <button
            className={`w-1/2 py-4 text-center text-lg font-medium transition-colors ${
              activeTab === 'videos' ? 'bg-gold text-white' : 'bg-white text-black'
            }`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12">
        {activeTab === 'blogs' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-black/30 backdrop-blur-sm p-6 rounded-sm hover:shadow-lg transition-shadow">
                <div className="mb-4 aspect-video overflow-hidden rounded-sm">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                <div className="mb-2 flex justify-between text-sm text-gray-400">
                  <span>{blog.date}</span>
                  <span>{blog.author}</span>
                </div>
                <h4 className="text-xl font-medium mb-3">{blog.title}</h4>
                <p className="text-gray-300 mb-4">{blog.excerpt}</p>
                <Link to={`/blog/${blog.id}`} className="text-gold hover:underline">Read more →</Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-black/30 backdrop-blur-sm p-6 rounded-sm hover:shadow-lg transition-shadow">
                <div className="mb-4 aspect-video overflow-hidden rounded-sm relative group">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-sm rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="mb-2 text-sm text-gray-400">
                  <span>{video.date}</span>
                </div>
                <h4 className="text-xl font-medium mb-3">{video.title}</h4>
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Watch video →
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to={activeTab === 'blogs' ? "/blogs" : "/videos"} className="inline-block border border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 transition-colors">
            View all {activeTab === 'blogs' ? 'blogs' : 'videos'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsVideosSection;
