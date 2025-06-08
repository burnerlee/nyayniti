import React from 'react';
import Navbar from './Navbar';
import ProgressiveBackground from './ProgressiveBackground';

const aboutUsIMG = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/aboutus.webp?raw=true"
const lowQualityImage = "lowaboutus.webp"

const AboutHero: React.FC = () => {
  return (
    <section className="relative h-screen">
      {/* Dark overlay for the background image */}
      <ProgressiveBackground
        lowQualityImage={lowQualityImage}
        highQualityImage={aboutUsIMG}
        className="absolute inset-0 bg-black/60 z-0"
      />
      <Navbar />
      
      <div className="container mx-auto px-6 md:px-12 relative z-1 h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <div className="mb-4">
            <h2 className="text-gold uppercase tracking-wider font-medium">OUR MISSION</h2>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-playfair text-white leading-tight mb-8">
            Render Finest legal representation possible cost-effectively in a setting that values collaboration, innovation, flexibility.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
