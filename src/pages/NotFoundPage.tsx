import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSeo } from '../utils/useSeo';

const NotFoundPage: React.FC = () => {
  useSeo('Page not found | NyayNiti');
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 pt-40 pb-24 text-center">
        <h1 className="text-4xl font-playfair mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <Link to="/" className="text-gold hover:text-darkGold">Back to home</Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
