import React from 'react';
import ContactForm from './ContactForm';
import ProgressiveBackground from './ProgressiveBackground';

const contactIMG = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/contact.webp?raw=true"
const lowQualityImage = "lowcontact.webp"
const ContactHero: React.FC = () => {
  return (
    <section className="relative bg-dark-gradient text-white py-20">
      {/* Dark overlay for the background image */}
      <ProgressiveBackground
        lowQualityImage={lowQualityImage}
        highQualityImage={contactIMG}
        className="absolute inset-0 bg-black/60 z-0"
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <p className="text-gold text-xl mb-4">Have any questions ?</p>
            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-8">
              Book a free<br />
              consultation with us!
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+918588993524" 
                className="inline-flex items-center justify-center border border-white text-white px-6 py-4 hover:bg-white hover:text-dark-bg transition-colors group hover:text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:text-dark-bg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +91 8588993524
              </a>
              <a 
                href="tel:+918375887003" 
                className="inline-flex items-center justify-center border border-white text-white px-6 py-4 hover:bg-white hover:text-dark-bg transition-colors hover:text-black"
              >
                or +91 8375887003
              </a>
            </div>
          </div>
          
          <div className="relative z-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
