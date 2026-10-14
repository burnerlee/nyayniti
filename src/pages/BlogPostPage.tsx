import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ShareButtons from '../components/ShareButtons';
import ShareMenu from '../components/ShareMenu';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { AUTHOR_PHOTO, blogPosts, formatDate, getPost } from '../utils/blogs';
import { useSeo } from '../utils/useSeo';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);

  useSeo(
    post ? `${post.title} | NyayNiti` : 'Post not found | NyayNiti',
    post?.excerpt
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-16 pt-40 pb-24 text-center">
          <h1 className="text-3xl font-playfair mb-4">Post not found</h1>
          <Link to="/blog" className="text-gold hover:text-darkGold">Back to all blogs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-12">
        <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-gold transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" />
          All blogs
        </Link>

        <header className="text-center mb-10">
          {post.tags[0] && (
            <p className="text-gold font-medium uppercase tracking-wider text-sm mb-4">{post.tags[0]}</p>
          )}
          <h1 className="text-3xl md:text-5xl font-playfair font-bold leading-tight mb-6">{post.title}</h1>
          <div className="flex items-center justify-center">
            <img src={AUTHOR_PHOTO} alt={post.author} className="w-10 h-10 rounded-full object-cover object-top mr-3" />
            <p className="text-gray-500 text-sm text-left">
              <span className="block font-medium text-gray-800">{post.author}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time> • {post.readTime}
            </p>
          </div>
        </header>

        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            className="w-full max-h-[32rem] object-cover rounded-sm mb-12"
          />
        )}

        <div className="blog-content text-lg mx-auto max-w-4xl" dangerouslySetInnerHTML={{ __html: post.html }} />

        <div className="max-w-4xl mx-auto border-t border-gray-200 mt-12 pt-8">
          <ShareButtons url={`https://nyayniti.in/blog/${post.slug}`} title={post.title} />
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto border-t border-gray-200 mt-12 pt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-sm text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <div className="container mx-auto max-w-6xl px-6 md:px-12 mt-8 mb-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <Link to="/blog" className="text-sm border border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <div key={p.slug}>
                {p.cover && (
                  <Link to={`/blog/${p.slug}`}>
                    <img src={p.cover} alt={p.title} className="w-full h-60 object-cover mb-4" loading="lazy" />
                  </Link>
                )}
                <div className="text-sm text-gray-600 mb-2">{p.readTime}</div>
                <h3 className="text-xl font-bold mb-3">
                  <Link to={`/blog/${p.slug}`} className="hover:text-gold transition-colors">{p.title}</Link>
                </h3>
                <p className="text-gray-600 mb-3 text-sm">{p.excerpt}</p>
                <div className="flex items-center justify-between">
                  <Link to={`/blog/${p.slug}`} className="inline-flex items-center text-gray-700 hover:text-gold transition-colors text-sm">
                    Read more <ChevronRight size={16} className="ml-1" />
                  </Link>
                  <ShareMenu url={`https://nyayniti.in/blog/${p.slug}`} title={p.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
