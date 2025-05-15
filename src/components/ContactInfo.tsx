import React from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <section className="w-full">
      {/* Contact details bar */}
      <div className="w-full bg-white py-14">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center">
              <Mail className="text-black mr-3" size={24} />
              <span className="text-black text-lg">nyaynitilegal@gmail.com</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="text-black mr-3" size={24} />
              <span className="text-black text-lg">29/181, Vikram Vihar, Lajpat Nagar IV, New Delhi</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="text-black mr-3" size={24} />
              <span className="text-black text-lg">09.00 am - 09.00 pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="w-full">
        {/* Map with fixed height to match design */}
        <div className="w-full h-[400px] md:h-[450px] lg:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.1782897800904!2d77.23351727549833!3d28.564408475702052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3549197ac73%3A0xb08c6d13288e8b01!2sNyayNiti!5e0!3m2!1sen!2sin!4v1746899663755!5m2!1sen!2sin"
            width="100%" 
						height="100%"
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="NyayNiti Office Location"
            className="grayscale"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
