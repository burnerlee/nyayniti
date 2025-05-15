import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Link2, Linkedin, Twitter, Facebook, ChevronRight } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock blog post data
  const blogPost = {
    id: id || '1',
    title: "How does writing influence your personal brand?",
    image: "https://images.pexels.com/photos/3985368/pexels-photo-3985368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: {
      name: "Jennifer Aniston",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "11 Jan 2022",
      readTime: "5 min read"
    },
    content: {
      introduction: [
        "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.",
        "Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.",
        "Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat."
      ],
      quote: "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus.",
      conclusion: [
        "Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.",
        "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.",
        "Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.",
        "Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam."
      ]
    },
    categories: ["Books", "Personal Injury"]
  };

  // Mock recommended blog posts
  const recommendedPosts = [
    {
      id: 2,
      title: "How to Celebrate Halloween From Home",
      category: "Mom",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
    },
    {
      id: 3,
      title: "Winter Car Seat Safety Tips",
      category: "DIY",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
    },
    {
      id: 4,
      title: "Mindfulness Activities for Kids & Toddlers",
      category: "Fitness",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-16 py-12">
        {/* Back to blogs link */}
        <Link to="/blog" className="inline-flex items-center text-gray-600 mb-8">
          <ArrowLeft size={16} className="mr-2" />
          All blogs
        </Link>
        
        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-8 max-w-3xl">{blogPost.title}</h1>
        
        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src={blogPost.image} 
            alt={blogPost.title} 
            className="w-full max-w-3xl h-auto object-cover rounded-sm"
          />
        </div>
        
        {/* Blog Content */}
        <div className="max-w-3xl">
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            {blogPost.content.introduction.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </div>
          
          {/* Quote */}
          <div className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-8">
            <p>"{blogPost.content.quote}"</p>
          </div>
          
          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            {blogPost.content.conclusion.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </div>
          
          {/* Author Info */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex items-center">
              <img 
                src={blogPost.author.avatar} 
                alt={blogPost.author.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-medium">{blogPost.author.name}</p>
                <p className="text-gray-500 text-sm">{blogPost.author.date} • {blogPost.author.readTime}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Link2 size={20} className="text-gray-600" />
              <Linkedin size={20} className="text-gray-600" />
              <Twitter size={20} className="text-gray-600" />
              <Facebook size={20} className="text-gray-600" />
            </div>
          </div>
          
          {/* Share Section */}
          <div className="mb-12">
            <p className="font-medium mb-4">Share this post</p>
            <div className="flex space-x-4">
              <Link2 size={20} className="text-gray-600" />
              <Linkedin size={20} className="text-gray-600" />
              <Twitter size={20} className="text-gray-600" />
              <Facebook size={20} className="text-gray-600" />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex space-x-2">
              {blogPost.categories.map((category, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-sm text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recommended Blog Posts Section */}
        <div className="mt-20 mb-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <Link to="/blog" className="text-sm border border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedPosts.map(post => (
              <div key={post.id} className="bg-white">
                <Link to={`/blog/${post.id}`}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-60 object-cover mb-4"
                  />
                </Link>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="mr-4">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <Link to={`/blog/${post.id}`} className="hover:text-gold transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-3 text-sm">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-gray-700 hover:text-gold transition-colors text-sm">
                  Read more <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
