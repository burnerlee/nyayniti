import React from 'react';
import { Link } from 'react-router-dom';
import ProgressiveBackground from './ProgressiveBackground';

const heroImage = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/hero-home.webp?raw=true"
const lowQualityImage = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/lowhero-home.webp?raw=true"
const Hero: React.FC = () => {
  return (
    <section className="hero-section min-h-screen flex items-center pt-16 md:pt-20">
      <ProgressiveBackground
        lowQualityImage={lowQualityImage}
        highQualityImage={heroImage}
        className="absolute inset-0 bg-black/60 z-0 h-screen w-screen"
      />
      <div className="container mx-auto px-6 md:px-12 py-24 z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-playfair text-white leading-tight mb-6">
            Guiding You on the Path to Justice, Ensuring <span className="text-yellow-600">Justice for All</span>
          </h1>
          <p className="text-white text-lg mb-10">
            Our lawyers are enthusiastic, committed and flexible
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link to="/contact" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 transition-colors inline-block text-center">
              Get free consultation
            </Link>
            <a href="tel:+918588993524" className="border border-white text-white px-6 py-3 transition-colors inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 8588993524
            </a>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google logo" className="w-6 h-6" />
              <span className="text-white ml-2 font-semibold">5.0</span>
            </div>
            <div className="flex text-yellow-600">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <a href="https://g.co/kgs/bjFevDt" className="text-white ml-2 underline">(Read all reviews)</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
