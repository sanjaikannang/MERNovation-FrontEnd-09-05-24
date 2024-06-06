import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };

  const handleAbout = () => {
    Navigate("/about");
  };

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
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Privacy Policy
        </h1>
        <div className=" p-6 text-gray-800">
          <p>
            Welcome to Harvest Hub's Privacy Policy. This policy describes how
            we collect, use, and protect your personal information when you use
            our website and services.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information when you register on our site, place
            an order, subscribe to our newsletter, respond to a survey, fill out
            a form, or interact with our website in any other way. This
            information may include your name, email address, mailing address,
            phone number, payment information, and any other information you
            provide to us.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            2. How We Use Your Information
          </h2>
          <p>We may use the information we collect from you to:</p>
          <ul className="list-disc list-inside ml-6">
            <li>
              Personalize your experience and respond to your individual needs.
            </li>
            <li>Process transactions and provide customer service.</li>
            <li>Improve our website and services.</li>
            <li>
              Send periodic emails regarding your orders or other products and
              services.
            </li>
            <li>
              Administer contests, promotions, surveys, or other site features.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            3. Protection of Your Information
          </h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information when you place an order or enter,
            submit, or access your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            4. Disclosure of Information to Third Parties
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties without your consent. This does not
            include trusted third parties who assist us in operating our
            website, conducting our business, or servicing you, as long as those
            parties agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            5. Your Consent
          </h2>
          <p>By using our website, you consent to our Privacy Policy.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            6. Changes to Our Privacy Policy
          </h2>
          <p>
            If we decide to change our Privacy Policy, we will update the
            modification date below.
          </p>

          <p className="mt-6">Last Modified: [Date]</p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;
