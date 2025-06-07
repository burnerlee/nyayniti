import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const logo = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/logo.png?raw=true";
const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center mb-6">
              <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
              <span className="text-black text-2xl font-playfair">NyayNiti</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Guiding You on the Path to Justice,<br />
              Ensuring Justice for All
            </p>
          </div>
          
          {/* Menu */}
          <div className="md:ml-auto">
            <h3 className="text-xl font-medium mb-6">Menu</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-600 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gold transition-colors">About us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Delhi Office */}
          <div>
            <h3 className="text-xl font-medium mb-6">Delhi Head Office</h3>
            <address className="text-gray-600 not-italic">
              29/181, Vikram Vihar, Lajpat<br />
              Nagar IV, New<br />
              Delhi-110024.
            </address>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              Copyright © 2025 by NyayNiti
            </p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/nyayniti_associates" className="text-gray-500 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/nyayniti" className="text-gray-500 hover:text-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.youtube.com/@advocateshubhamkumar" className="text-gray-500 hover:text-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
