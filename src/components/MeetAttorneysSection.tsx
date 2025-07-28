import React from 'react';
import { getImagePath } from '../utils/image';
const shubham = "attorneys/shubham.webp"
const anubhav = "attorneys/anubhav.webp"
const udit = "attorneys/udit.webp"
const rimmi = "attorneys/rimmi.webp"
const dev = "attorneys/dev.webp"
const newAssociate = "attorneys/new-associate.webp";

interface AttorneyProps {
  name: string;
  title: string;
  image: string;
}

const attorneys: AttorneyProps[] = [
  {
    name: "Adv. Shubham Kumar",
    title: "FOUNDER",
    image: getImagePath(shubham)
  },
  {
    name: "Adv. Anubhav Jain",
    title: "CO-FOUNDER",
    image: getImagePath(anubhav)
  },
  {
    name: "Adv. Udit wadhwa",
    title: "ASSOCIATE",
    image: getImagePath(udit)
  },
  {
    name: "Ms. Rimmi Panjrath",
    title: "PARALEGAL",
    image: getImagePath(rimmi)
  },
  {
    name: "Mr. Dev Malik",
    title: "ASSOCIATE",
    image: getImagePath(dev)
  },
  {
    name: "Mr. Rishabh Rajpoot",
    title: "ASSOCIATE",
    image: getImagePath(newAssociate)
  }
];

const AttorneyCard: React.FC<AttorneyProps> = ({ name, title, image }) => {
  return (
    <div className="relative overflow-hidden group">
      <div className="border border-gold/30 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-[340px] object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-xl font-playfair mb-1">{name}</h3>
          <p className="text-sm tracking-wider text-gold">{title}</p>
        </div>
      </div>
    </div>
  );
};

const MeetAttorneysSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-playfair mb-16 text-center text-white">Meet Our Attorneys</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
          {attorneys.slice(0, 2).map((attorney, index) => (
            <AttorneyCard key={index} {...attorney} />
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {attorneys.slice(2).map((attorney, index) => (
            <div key={index} className="w-full md:w-[calc(33.333%-1rem)]">
              <AttorneyCard {...attorney} />
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-playfair mb-6">Interested in joining us?</h3>
          <p className="text-lg mb-2">Drop your CV's at nyaynitilegal@gmail.com</p>
          <p className="text-sm text-gray-400">We'll get back to you when we are open for hiring!</p>
        </div>
      </div>
    </section>
  );
};

export default MeetAttorneysSection;
