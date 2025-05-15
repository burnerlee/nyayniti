import React from 'react';
import { FileText, Shield, Scale, Lock, BookOpen, Copyright, Trophy } from 'lucide-react';

const practiceAreas = [
  {
    icon: <FileText className="text-gold" size={24} />,
    title: "Matrimonial Law",
    description: "We offer expert legal support in divorce, custody, and alimony, with a focus on compassionate guidance and fair resolutions."
  },
  {
    icon: <Shield className="text-gold" size={24} />,
    title: "Criminal Defence",
    description: "We provide expert legal representation in criminal cases with a focus on protecting clients' rights and ensuring fair outcomes."
  },
  {
    icon: <Scale className="text-gold" size={24} />,
    title: "Civil Disputes",
    description: "We offer a streamlined and client-focused approach to resolving conflicts. We guide you through every step of the process, ensuring clear communication, efficient solutions, and a fair outcome."
  },
  {
    icon: <Lock className="text-gold" size={24} />,
    title: "Money Laundering",
    description: "We offer sensitive and expert legal support to both clients and financial institutions. We work closely to navigate complex regulations, ensuring your interests are protected with care and understanding."
  },
  {
    icon: <BookOpen className="text-gold" size={24} />,
    title: "Constitutional Matters",
    description: "We offer expert legal counsel on matters involving fundamental rights, constitutional interpretation, judicial review, and the protection of democratic principles."
  },
  {
    icon: <Copyright className="text-gold" size={24} />,
    title: "Intellectual Property Laws",
    description: "We offer strategic legal services to protect and enforce patents, trademarks, and copyrights with professionalism and expertise."
  },
  {
    icon: <Trophy className="text-gold" size={24} />,
    title: "Sports Law",
    description: "We provide legal solutions for anti-doping laws, player contracts, broadcasting rights, and sponsorship agreements, safeguarding the rights and interests of athletes, teams, and organizations."
  }
];

const PracticeAreasSection: React.FC = () => {
  return (
    <section className="py-20 bg-dark-gradient text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-0.5 bg-gold mr-4"></div>
              <h2 className="text-2xl font-playfair">Practice Areas</h2>
            </div>
            <p className="text-gray-400">
              Comprehensive legal expertise across multiple practice areas.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {practiceAreas.map((area, index) => (
            <div key={index} className="border-b border-gray-800 pb-8">
              <div className="mb-4">
                {area.icon}
              </div>
              <h3 className="text-xl font-playfair mb-3">{area.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
