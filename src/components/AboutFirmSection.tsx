import React from 'react';

const about1 = "https://kissy-lion.static.domains/about1.png"
const AboutFirmSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-playfair mb-8">About the firm</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              At NyayNiti, we are dedicated to providing exceptional legal services with integrity and a client-first approach. 
              Our team of experienced lawyers and legal consultants offers tailored solutions across diverse practice areas, 
              from complex litigation to strategic advisory. We not only provide legal representation but also serve as trusted partners, 
              empowering our clients with knowledge and unwavering support. With a deep commitment to justice, 
              we ensure your rights and interests are safeguarded at every step.
            </p>
          </div>
          
          <div className="relative">
            <div className="border-4 border-gold/20 absolute -top-4 -left-4 right-4 bottom-4 z-0"></div>
            <img 
              src={about1} 
              alt="Lawyers in meeting" 
              className="w-full h-auto relative z-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFirmSection;
