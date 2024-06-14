import React from 'react';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const ContactUs = () => {
  const { t } = useTranslation();

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
      <br />

            {/* Upload Product Section */}
            <section className="z-10 bg-green-100 py-24 px-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-green-600">
              {t('contact-us')}
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="p-6 text-gray-800">
          <p>{t('have-question')}</p>
          <form className="mt-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t('your-name')}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t('your-email')}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder={t('your-message')}
                className="border border-gray-300 rounded-md py-2 px-4 w-full resize-none focus:outline-none focus:border-green-500"
              ></textarea>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {t('submit')}
            </button>
          </form>
          <p className="mt-8 text-center">
            {t('alternative-contact')} <a href="mailto:contact@harvesthub.com" className="text-green-500 underline">contact@harvesthub.com</a> {t('or-by-phone')} <span className="text-green-500">(123) 456-7890</span>.
          </p>
          <p className="mt-4 text-center">
            {t('office-address')} 123 Main Street, City, Country, Zip Code.
          </p>
          <p className="mt-6 text-center">
            {t('inquiries')}
          </p>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default ContactUs;
