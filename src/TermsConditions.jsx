import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const TermsConditions = () => {
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
              {t("terms-and-conditions")}
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="p-6 text-gray-800">
          <p>{t("welcome")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("introduction")}
          </h2>
          <p>{t("introduction-content")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("intellectual-property-rights")}
          </h2>
          <p>{t("intellectual-property-content")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("user-responsibilities")}
          </h2>
          <p>{t("user-responsibilities-content")}</p>
          <ul className="list-disc list-inside ml-6">
            <li>{t("republish-material")}</li>
            <li>{t("sell-material")}</li>
            <li>{t("reproduce-material")}</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("user-content")}
          </h2>
          <p>{t("user-content-content1")}</p>
          <p>{t("user-content-content2")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("product-listings")}
          </h2>
          <p>{t("product-listings-content1")}</p>
          <ul className="list-disc list-inside ml-6">
            <li>{t("product-listings-content2")}</li>
            <li>{t("product-listings-content3")}</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("limitation-of-liability")}
          </h2>
          <p>{t("limitation-of-liability-content")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("indemnification")}
          </h2>
          <p>{t("indemnification-content")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("changes-to-terms")}
          </h2>
          <p>{t("changes-to-terms-content")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("governing-law")}
          </h2>
          <p>{t("governing-law-content")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
            {t("contact-info")}
          </h2>
          <p>{t("contact-info-content")} <span className="text-blue-500 underline">harvesthub@gmail.com</span></p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsConditions;
