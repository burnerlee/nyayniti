import data from '../generated/blogs.json';

export interface BlogPost {
  slug: string;
  aliases?: string[];
  title: string;
  excerpt: string;
  date: string;
  updated: string;
  author: string;
  tags: string[];
  cover: string | null;
  readTime: string;
  html: string;
}

export const blogPosts: BlogPost[] = data.posts as BlogPost[];

export const getPost = (slug?: string) => blogPosts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const AUTHOR_PHOTO = '/authors/anubhav-jain.png';
