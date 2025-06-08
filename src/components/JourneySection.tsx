import React from 'react';
import { getImagePath } from '../utils/image';

const about2 = "about2.webp"
const about3 = "about3.webp"
const JourneySection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 gap-8">
              <div className="relative">
                <div className="border-4 border-gold/20 absolute -top-4 -left-4 right-4 bottom-4 z-0"></div>
                <img 
                  src={getImagePath(about2)}
                  alt="Founders working together" 
                  className="w-full h-auto relative z-1"
                />
              </div>
              
              <div className="relative">
                <div className="border-4 border-gold/20 absolute -top-4 -left-4 right-4 bottom-4 z-0"></div>
                <img 
                  src={getImagePath(about3)}
                  alt="Lawyer working" 
                  className="w-full h-auto relative z-1"
                />
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-playfair mb-8">Our Journey</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              Our journey at NyayNiti began with a shared vision, rooted in a deep passion for law and justice.
              Shubham Kumar and Anubhav Jain, both college mates, embarked on their professional paths separately, 
              each gaining invaluable experience in different areas of law before coming together to establish NyayNiti in August 2023.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              After completing their studies, Shubham started his career at an energy-based law firm, honing his skills in corporate law, 
              before transitioning into litigation. Anubhav, on the other hand, began his journey under the mentorship of a 
              renowned criminal lawyer, gaining expertise in criminal and constitutional law. Both individuals developed a strong 
              foundation in law, each gaining exposure to a wide array of practice areas.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6 text-justify">
              After years of working in diverse legal environments, we decided to unite our strengths and launch NyayNiti with a 
              shared commitment to providing strategic, innovative, and client-focused legal solutions. From the very start, we focused 
              on constitutional matters, taking on cases before the Supreme Court and High Courts, where we worked alongside Senior 
              Advocates to secure favorable outcomes for our clients. In a short span, our firm has established a reputation for 
              its dedication to justice, achieving relief for clients and successfully navigating complex legal landscapes. Together, 
              we are committed to delivering exceptional legal representation and building a legacy of integrity and excellence at NyayNiti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
