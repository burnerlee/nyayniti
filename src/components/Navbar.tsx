import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const logo = "https://github.com/burnerlee/nyayniti/blob/main/src/assets/logo.png?raw=true"
const Navbar: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Set navbar visible if scrolling up or at the top of the page
      setVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
      
      // Check if we're at the top of the page
      setAtTop(currentScrollPos < 10);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 transition-all duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'} ${atTop ? 'bg-transparent' : 'bg-black bg-opacity-90 shadow-lg'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 md:h-10 mr-2" />
          <Link to="/" className="text-white text-xl font-librebaskerville">NyayNiti</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-gold transition-colors font-helvetica">Home</Link>
          <Link to="/about" className="text-white hover:text-gold transition-colors font-helvetica">About us</Link>
          <Link to="/blog" className="text-white hover:text-gold transition-colors font-helvetica">Blog</Link>
          <Link to="/contact" className="text-white hover:text-gold transition-colors font-helvetica">Contact</Link>
        </div>
        
        <div className="flex items-center">
          <a href="https://wa.me/918588993524" className="hidden md:flex items-center text-white hover:text-gold transition-colors mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Talk to us
          </a>
          <Link to="/contact" className="bg-gold hover:bg-darkGold text-white px-3 py-2 md:px-4 md:py-2 text-sm md:text-base transition-colors">
            Get free consultation
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="ml-4 md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 mt-4 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-gold transition-colors font-helvetica py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="text-white hover:text-gold transition-colors font-helvetica py-2" onClick={() => setMobileMenuOpen(false)}>About us</Link>
            <Link to="/blog" className="text-white hover:text-gold transition-colors font-helvetica py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/contact" className="text-white hover:text-gold transition-colors font-helvetica py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <a href="https://wa.me/918588993524" className="text-white hover:text-gold transition-colors font-helvetica py-2 flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Talk to us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
