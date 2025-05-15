import React from 'react';

const anubhav = "https://kissy-lion.static.domains/anubhav-about.png";
const shubham = "https://kissy-lion.static.domains/shubham-about.png";
const founders = [
  {
    name: "Adv. Shubham Kumar",
    image: shubham,
    bio: "Adv. Shubham Kumar is a Delhi-based lawyer and member of the Supreme Court Bar Association with extensive experience in corporate and litigation practice. After beginning at a corporate law firm, he transitioned to litigation and worked with an Advocate-on-Record at the Supreme Court before founding NyayNiti in 2023. His firm has collaborated with Senior Advocates, represented the Anglo-Indian community in the Delhi High Court, and secured a landmark judgment under Section 498A IPC."
  },
  {
    name: "Adv. Anubhav Jain",
    image: anubhav,
    bio: "Adv. Anubhav Jain, co-founder of NyayNiti, specializes in Criminal and Constitutional Law and has represented clients in high-profile criminal and white-collar cases across High Courts and the Supreme Court of India. Driven by a passion for justice and social impact, he actively contributes to legal forums, supports NGOs, and promotes legal awareness among children and women through educational and empowerment initiatives."
  }
];

const FoundersProfileSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-playfair mb-16 text-center">About Founders</h2>
        
        <div className="space-y-16">
          {founders.map((founder, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              <div className="relative">
                <div className="border-4 border-gold/20 absolute -top-4 -left-4 right-4 bottom-4 z-0"></div>
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-auto relative z-1"
                />
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-2xl font-playfair mb-4">{founder.name}</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersProfileSection;
