import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

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
      <br />

            {/* Upload Product Section */}
            <section className="z-10 bg-green-100 py-24 px-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-green-600">
              {t('privacy-policy')}
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="p-6 text-gray-800">
          <p>{t('welcome')}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t('information-we-collect')}
          </h2>
          <p>{t('information-we-collect-content')}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t('how-we-use')}
          </h2>
          <p>{t('how-we-use-content')}</p>
          <ul className="list-disc list-inside ml-6">
            <li>{t('personalize')}</li>
            <li>{t('process-transactions')}</li>
            <li>{t('improve-services')}</li>
            <li>{t('send-emails')}</li>
            <li>{t('administer-features')}</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t('protection-of-information')}
          </h2>
          <p>{t('protection-of-information-content')}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t('disclosure')}
          </h2>
          <p>{t('disclosure-content')}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t('your-consent')}
          </h2>
          <p>{t('your-consent-content')}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t('changes-to-policy')}
          </h2>
          <p>{t('changes-to-policy-content')}</p>

          <p className="mt-6">{t('last-modified')}</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
