import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "NyayNiti Law Firm's cutting-edge expertise in IT Law and registration was a transformative force for us. Their proactive support in securing trademarks streamlined our innovations, making them seamless and secure. With deep industry connections and state-of-the-art legal solutions, they have optimized our operations and ensured a robust legal framework for our drone spare parts and service business. Additionally, their guidance on data protection, cybersecurity, and AI regulations has been indispensable, keeping us ahead of the curve in 2025's fast-evolving legal landscape.",
    quote: "For top-notch legal help, try NyayNiti Law Firm. I strongly recommend their expertise.",
    author: "NV Drone Store",
    initials: "ND"
  },
  {
    text: "Collaborating with NyayNiti Law Firm was a pleasure. Their real estate expertise and arbitration skills ensured that our transactions were seamless. The trademark support they provided was indispensable. The firm's ability to streamline legal processes, have greatly enhanced the efficiency of our residential, commercial, and institutional construction projects. Furthermore, their guidance on policy-making laws, financial matters, and control and ownership issues has been invaluable in driving our success. They truly are an exceptional partner in all our legal endeavors.",
    quote: "In need of legal support like this? NyayNiti Law Firm comes highly recommended.",
    author: "D.K Heights Private Limited",
    initials: "DK"
  },
  {
    text: "NyayNiti Law Firm's legal vetting and business dealings advice were spot-on. Their efficient registration process and expertise gave us a solid legal foundation. Their proficiency in labour law, employee contracts, and other essential legal areas has been instrumental in our success, ensuring that all aspects of our business are well-protected and compliant.",
    quote: "If you also need such legal services, try NyayNiti Law Firm. I endorse them highly.",
    author: "Jukaso Pest Control Services",
    initials: "JP"
  },
  {
    text: "In the wellness sector, NyayNiti Law Firm's expertise in health and safety regulations, privacy laws, labor laws, intellectual property, and consumer protection is unparalleled. They efficiently handle registration, confidentiality, and trademark protection, ensuring our company's compliance and success. Their profound knowledge and guidance in navigating complex legalities have been invaluable in optimizing our operations and securing our business's future. NyayNiti Law Firm truly excels in providing comprehensive legal support tailored to the specific needs of the wellness industry.",
    quote: "For top-notch legal services like these, try NyayNiti Law Firm. They are fantastic.",
    author: "M/S Eight Pettaled Lotus",
    initials: "EP"
  },
  {
    text: "Working with NyayNiti Law Firm made handling IT legal matters simple and stress-free. Their deep understanding of IT law, company registration, and trademark protection helped keep our tech projects legally secure and compliant. NyayNiti's practical legal solutions helped streamline our operations and support our mission of empowering skilled professionals. Their reliable legal support has been a key part of our success in India's growing tech and outsourcing sector.",
    quote: "When in need of this kind of legal assistance, try NyayNiti Law Firm. They excel.",
    author: "Visionkrid Studios Pvt. Ltd",
    initials: "VS"
  },
  {
    text: "NyayNiti Law Firm's expertise in school and education law has been a true asset to The Learning Space School. Their guidance in legal vetting, registration, and arbitration helped us run smoothly and stay compliant. From student safety and staff contracts to privacy, compliance, and trademark protection, their support has been invaluable. They also helped us navigate complex issues like curriculum standards and intellectual property rights. Thanks to NyayNiti's legal support, we can focus on providing a safe, enriching environment where students grow and thrive",
    quote: "For legal services of this caliber, NyayNiti Law Firm is highly praised by many.",
    author: "The Learning Space School",
    initials: "LS"
  },
  {
    text: "NyayNiti Law Firm's unparalleled expertise in navigating IT legalities and content creation laws has been a game-changer for us. Their meticulous support in registration, IT Law guidance, and content creator-specific regulations ensured our seamless and compliant growth. With their extensive knowledge in intellectual property, data privacy, cybersecurity, and compliance with digital content standards, we have been able to innovate confidently. Their comprehensive legal assistance has elevated our business practices, enabling us to maintain the highest standards and thrive in the digital landscape.",
    quote: "In need of top-quality legal aid? NyayNiti Law Firm is a must-try. I strongly urge you.",
    author: "Backend Bytes",
    initials: "BB"
  },
  {
    text: "NyayNiti Law Firm's expertise in media law was essential to our success in the media and entertainment industry. Their support with registrations, intellectual property, and trademark protection made a big difference. Their legal advice was practical and effective, and their understanding of the industry helped streamline our work. For our niche in camera photography, wedding functions, and albums, their guidance was especially valuable and deeply appreciated.",
    quote: "If you're in need of such legal advice, give NyayNiti Law Firm a try. They're excellent.",
    author: "Himanshu Luthra Productions",
    initials: "HL"
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to generate random background color for initials avatar
  const getInitialsColor = (initials: string) => {
    // Generate a consistent color based on the initials
    const hash = initials.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 65%, 30%)`; // Dark, professional color
  };

  return (
    <section className="py-20 bg-dark-gradient text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-0.5 bg-gold mr-4"></div>
              <h2 className="text-2xl font-playfair">What People Say</h2>
            </div>
            <p className="text-gray-400">
              Client testimonials showcasing our impactful legal services.
            </p>
          </div>
          
          <div className="md:col-span-2 relative">
            <div className="absolute -top-10 left-0 text-6xl text-gold opacity-50">"</div>
            <div className="bg-gray-800 p-6 md:p-8 rounded-sm h-[400px] md:h-[500px] flex flex-col">
              <div className="flex text-gold mb-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              
              <div className="mb-6 text-gray-200 flex-grow overflow-y-auto custom-scrollbar">
                <p>{testimonials[currentIndex].text}</p>
                <p className="mt-4 italic">"{testimonials[currentIndex].quote}"</p>
              </div>
              
              <div className="flex items-center mt-auto pt-4 border-t border-gray-700">
                <div 
                  className="w-10 h-10 rounded-full overflow-hidden mr-3 flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: getInitialsColor(testimonials[currentIndex].initials) }}
                >
                  {testimonials[currentIndex].initials}
                </div>
                <span>{testimonials[currentIndex].author}</span>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end mt-4 md:absolute md:bottom-[-60px] md:right-0">
              <button 
                onClick={goToPrevious}
                className="w-12 h-12 border border-gray-700 flex items-center justify-center mr-2 hover:bg-gold hover:border-gold transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={goToNext}
                className="w-12 h-12 bg-gold flex items-center justify-center hover:bg-darkGold transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
