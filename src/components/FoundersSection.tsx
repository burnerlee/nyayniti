import React from 'react';
import { Link } from 'react-router-dom';

const anubhav = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/anubhav-home.webp?raw=true"
const shubham = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/shubham-home.webp?raw=true"
const founders = [
  {
    name: "Shubham Kumar",
    role: "FOUNDER",
    image: shubham
  },
  {
    name: "Anubhav Jain",
    role: "CO-FOUNDER",
    image: anubhav
  }
];

const FoundersSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        {/* Desktop layout (hidden on mobile) */}
        <div className="hidden md:flex md:flex-row md:justify-between">
          <div className="flex flex-col justify-center pb-32">
            <div className="flex items-center mb-6">
              <div className="w-12 h-0.5 bg-gold mr-4"></div>
              <h2 className="text-2xl font-playfair">Meet Our Founders</h2>
            </div>
            <p className="text-gray-600">
              Experienced legal professionals dedicated to client success.
            </p>
          </div>
          
          <div className="flex flex-col gap-8 mb-12">
            <div className="flex flex-row gap-8">
              {founders.map((founder, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 overflow-hidden" style={{ maxWidth: '350px' }}>
                    <img 
                      src={founder.image} 
                      alt={founder.name} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-playfair mb-1">{founder.name}</h3>
                  <p className="text-gray-500 text-sm">{founder.role}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link to="/about#founders" className="border border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 transition-colors">
                Know the team
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile layout (hidden on desktop) */}
        <div className="md:hidden">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-0.5 bg-gold mr-3"></div>
              <h2 className="text-2xl font-playfair">Meet Our Founders</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Experienced legal professionals dedicated to client success.
            </p>
          </div>
          
          <div className="space-y-8">
            {founders.map((founder, index) => (
              <div key={index} className="text-center">
                <div className="mb-3 overflow-hidden mx-auto" style={{ maxWidth: '280px' }}>
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-playfair mb-1">{founder.name}</h3>
                <p className="text-gray-500 text-sm">{founder.role}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Link to="/about#founders" className="border border-gold text-gold hover:bg-gold hover:text-white px-6 py-2 transition-colors w-full text-center">
              Know the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
