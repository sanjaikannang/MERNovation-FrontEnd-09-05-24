import React from 'react';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const ContactUs = () => {

  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };

  const handleAbout = () => {
    Navigate("/about");
  }

  return (
    <>
        {/* NavBar Section  */}
        <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600 font-bold">Harvest</span>
          Hub
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAbout}
            className="text-white font-medium px-2 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            About
          </button>
          <button
            onClick={handleLogin}
            className="text-white font-medium px-2 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Login
          </button>
          <button
            onClick={handleLogin}
            className="text-white font-medium px-2 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Signup
          </button>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="p-6 text-gray-800">
          <p>Have a question, comment, or suggestion? We'd love to hear from you! Please fill out the form below to get in touch with us.</p>
          <form className="mt-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-green-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-green-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Your Message" className="border border-gray-300 rounded-md py-2 px-4 w-full resize-none focus:outline-none focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          </form>
          <p className="mt-8 text-center">Alternatively, you can reach us via email at <a href="mailto:contact@harvesthub.com" className="text-green-500 underline">contact@harvesthub.com</a> or by phone at <span className="text-green-500">(123) 456-7890</span>.</p>
          <p className="mt-4 text-center">Our office address: 123 Main Street, City, Country, Zip Code.</p>
          <p className="mt-6 text-center">For any inquiries related to Harvest Hub's services, partnerships, or any other business-related matters, feel free to contact us. We are here to assist you!</p>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default ContactUs;
