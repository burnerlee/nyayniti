import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xnndoqel");
  const services = ["Family Law", "Criminal Law", "Corporate Law", "Real Estate Law", "Intellectual Property"];

  // Calculate approximate form height based on content
  // This ensures the success message container has similar dimensions
  const formMinHeight = "min-h-[600px]"; // Adjust this value based on your form's actual height

  return (
    <div className="bg-dark-gradient bg-opacity-90 p-8 text-white h-full">
      {state.succeeded ? (
        <div className={`bg-green-50 border border-green-200 text-green-800 rounded-md p-6 text-center ${formMinHeight} flex flex-col justify-center`}>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-lg">Your message has been successfully submitted. We will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`${formMinHeight}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="w-full px-4 py-3 bg-white text-black focus:outline-none"
                required
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 mt-1" />
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-2">Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                className="w-full px-4 py-3 bg-white text-black focus:outline-none"
              />
              <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-400 mt-1" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-white text-black focus:outline-none"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 mt-1" />
            </div>
            
            <div>
              <label htmlFor="service" className="block mb-2">Service</label>
              <input
                id="service"
                name="service"
								type="text"
                className="w-full px-4 py-3 bg-white text-black focus:outline-none appearance-none"
                required
              />
              <ValidationError prefix="Service" field="service" errors={state.errors} className="text-red-400 mt-1" />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block mb-2">Subject</label>
            <input
              id="subject"
              type="text"
              name="subject"
              className="w-full px-4 py-3 bg-white text-black focus:outline-none"
              required
            />
            <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-400 mt-1" />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-3 bg-white text-black focus:outline-none resize-none"
              required
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 mt-1" />
          </div>
          
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-gold hover:bg-darkGold text-white py-4 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {state.submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
