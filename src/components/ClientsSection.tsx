import React from 'react';
import { getImagePath } from '../utils/image';

const NV = "clients/nv.png"
const TLS = "clients/tls.png"
const BB = "clients/bb.png"
const Lotus = "clients/lotus.png"
const HLP = "clients/hlp.png"

const ClientsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-4">
        <div className="flex items-center mb-12">
          <div className="w-12 h-0.5 bg-gold mr-4"></div>
          <h2 className="text-2xl font-playfair">Our Clients</h2>
        </div>
          <div className="flex items-center justify-center">
            <img src={getImagePath(NV)} alt="Client 1" className="h-14" />
          </div>
          <div className="flex items-center justify-center">
            <img src={getImagePath(TLS)} alt="Client 2" className="h-14" />
          </div>
          <div className="flex items-center justify-center">
            <img src={getImagePath(Lotus)} alt="Client 3" className="h-14" />
          </div>
          <div className="flex items-center justify-center">
            <img src={getImagePath(HLP)} alt="Client 4" className="h-14" />
          </div>
          <div className="flex items-center justify-center">
            <img src={getImagePath(BB)} alt="Client 5" className="h-14" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
