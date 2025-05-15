import React, { useState, useEffect } from 'react';

interface DisclaimerProps {
  onAccept: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  const handleAccept = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    onAccept();
  };

  const handleReject = () => {
    window.close();
    // Fallback for browsers that don't allow programmatic closing
    alert('Please close this tab as you have not accepted our disclaimer.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-auto">
        <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4">Legal Disclaimer</h2>
        <div className="prose prose-sm mb-6">
          <p className="text-gray-700">
          Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. NyayNiti is, therefore, constrained from providing any further information on this web page. The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. The user wishes to gain more information about NyayNiti, its practice areas and its attorneys, for his/her own information and use. The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user’s volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship. None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice. NyayNiti is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Disagree
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
