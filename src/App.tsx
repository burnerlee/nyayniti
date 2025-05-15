import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Disclaimer from './components/Disclaimer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const hasAccepted = localStorage.getItem('disclaimerAccepted') === 'true';
    setShowDisclaimer(!hasAccepted);
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
  };

  return (
    <>
      <Router>
        {!showDisclaimer && <Navbar />}
        <ScrollToTop />
        <div className={showDisclaimer ? 'pointer-events-none' : ''}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Router>
      {showDisclaimer && <Disclaimer onAccept={handleAcceptDisclaimer} />}
    </>
  );
}

export default App;
