import React from 'react';

const about4 = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/about4.webp?raw=true"
const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-playfair mb-8">Why Choose Us</h2>
            
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="text-gold mr-3 mt-1">•</div>
                <p className="text-gray-700 text-lg">Personalized & Compassionate legal support</p>
              </li>
              
              <li className="flex items-start">
                <div className="text-gold mr-3 mt-1">•</div>
                <p className="text-gray-700 text-lg">Straightforward & Transparent communication</p>
              </li>
              
              <li className="flex items-start">
                <div className="text-gold mr-3 mt-1">•</div>
                <p className="text-gray-700 text-lg">Regular updates at every step</p>
              </li>
              
              <li className="flex items-start">
                <div className="text-gold mr-3 mt-1">•</div>
                <p className="text-gray-700 text-lg">Approachable, easy-to-talk-to team</p>
              </li>
              
              <li className="flex items-start">
                <div className="text-gold mr-3 mt-1">•</div>
                <p className="text-gray-700 text-lg">Your peace of mind, prioritized</p>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="border-4 border-gold/20 absolute -top-4 -left-4 right-4 bottom-4 z-0"></div>
            <img 
              src={about4}
              alt="Lawyers working together" 
              className="w-full h-auto relative z-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
