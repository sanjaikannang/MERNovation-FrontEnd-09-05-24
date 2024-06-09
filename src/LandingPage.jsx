import React from "react";
import { useNavigate } from "react-router-dom";
import TermsConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import { FaHandshake, FaLeaf, FaChartLine } from "react-icons/fa";
import { FaSeedling, FaShoppingCart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const LandingPage = () => {
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
        <div className="flex items-center space-x-1">
          <button
            onClick={handleAbout}
            className="text-white font-medium px-1 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            About
          </button>
          <button
            onClick={handleLogin}
            className="text-white font-medium px-1 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Login
          </button>
          <button
            onClick={handleLogin}
            className="text-white font-medium px-1 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Signup
          </button>
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="text-white font-medium px-1 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-wrap">
        <div className="w-full sm:w-8/12 mb-10">
          <div className="container mx-auto h-full sm:p-10">
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-4xl lg:text-5xl font-bold text-green-600">
                  {t("heroTitle")}
                  <span className="text-gray-700">{t("heroTitle1")}</span>
                </h1>
                <div className="w-20 h-2 bg-green-600 my-4"></div>
                <p className="text-lg mb-10">{t("heroDescription")}</p>
                <button
                  onClick={() => Navigate("/login")}
                  className="bg-green-500 text-white text-xl font-semibold px-8 py-2 shadow-2xl rounded-lg hover:bg-green-600"
                >
                  {t("exploreHarvestHub")}
                </button>
              </div>
            </header>
          </div>
        </div>
        <div className="w-full sm:w-4/12">
          <img
            src="https://images.unsplash.com/photo-1664216079137-70116b4902f5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Leafs"
            className="w-full h-48 object-cover sm:h-screen"
          />
        </div>
      </div>

      {/* Key Features Section */}
      <section className="overflow-hidden px-7 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1678344177250-bfdbed89fc03?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://images.unsplash.com/photo-1664216079190-9b0bf939fe99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                    <br />
                    <img
                      src="https://plus.unsplash.com/premium_photo-1683133591246-588a6b680d74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1682092816831-69c7c3ff59a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                    <br />
                    <img
                      src="https://images.unsplash.com/photo-1509813685-e7f0e4eaf3ee?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-7 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block text-4xl text-green-600 font-bold">
                  {t("keyFeaturesTitle")}
                </span>
                <br />
                <br />
                <h2 className="mb-5 text-3xl font-bold dark:text-white sm:text-[40px]/[48px]">
                  {t("keyFeaturesDescription1")}
                </h2>
                <p className="mb-5 text-lg text-body-color dark:text-dark-6">
                  {t("keyFeaturesDescription2")}
                </p>
                <p className="mb-8 text-lg text-body-color dark:text-dark-6">
                  {t("keyFeaturesDescription3")}
                </p>
                <br />
                <button
                  onClick={() => Navigate("/login")}
                  className="bg-green-500 text-white text-xl font-semibold px-8 py-2 shadow-2xl rounded-lg hover:bg-green-600 cursor-pointer"
                >
                  {t("learnMore")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SOLUTION Section */}
      <div className="flex flex-col items-center justify-center bg-zinc-100 px-7 py-7">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-8">
            {t("ourSolutionTitle")}
          </h1>
          <p className="text-zinc-700 text-xl mb-8">
            {t("ourSolutionDescription")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FaHandshake className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {t("directTransactions")}
              </h3>
              <p className="text-zinc-700 text-lg">
                {t("directTransactionsDescription")}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FaLeaf className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {t("realTimePricing")}
              </h3>
              <p className="text-zinc-700 text-lg">
                {t("realTimePricingDescription")}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FaChartLine className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {t("advancedFeatures")}
              </h3>
              <p className="text-zinc-700 text-lg">
                {t("advancedFeaturesDescription")}
              </p>
            </div>
          </div>
          <br />
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => Navigate("/login")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl"
            >
              {t("exploreHarvestHub")}
            </button>
            <button
              onClick={() => Navigate("/about")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl"
            >
              {t("exploreAboutUs")}
            </button>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <br />
      <br />

      {/* GET STARTED Section */}
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-green-600">
            {t("getStartedTitle")}
          </h1>
          <br />
          <p className="mt-4 text-xl text-zinc-600">
            {t("getStartedDescription")}
          </p>
          <br />
          <br />
          <hr />
          <br />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaSeedling className="text-green-500 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              {t("postOfferTitle")}
            </h2>
            <p className="mt-2 text-zinc-600 text-xl mb-6">
              {t("postOfferDescription")}
            </p>
            <button
              onClick={() => Navigate("/signup")}
              className="text-xl px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl"
            >
              {t("registerSeller")}
            </button>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaShoppingCart className="text-green-500 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              {t("postBidTitle")}
            </h2>
            <p className="text-xl mt-2 text-zinc-600 mb-6">
              {t("postBidDescription")}
            </p>
            <button
              onClick={() => Navigate("/signup")}
              className="text-xl px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl"
            >
              {t("registerBuyer")}
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      {/* Testimonial Section */}
      <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6">
        <section className="text-center mb-12">
          <h2 className="text-green-600 text-3xl mb-2 font-medium tracking-wider mt-5 uppercase">
            {t("testimonialsTitle")}
          </h2>
          <h1 className="text-3xl font-bold mt-6 mb-10">
            {t("testimonialsSubtitle")}
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm transition-transform transform hover:-translate-y-2">
              <p className="mb-4 italic text-zinc-700 dark:text-zinc-300">
                {t("testimonial1")}
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="/face1.png"
                  alt={t("testimonial1Name")}
                />
                <div>
                  <h3 className="font-bold text-lg">{t("testimonial1Name")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t("testimonial1Role")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm transition-transform transform hover:-translate-y-2">
              <p className="mb-4 italic text-zinc-700 dark:text-zinc-300">
                {t("testimonial2")}
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="/face2.png"
                  alt={t("testimonial2Name")}
                />
                <div>
                  <h3 className="font-bold text-lg">{t("testimonial2Name")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t("testimonial2Role")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Success Story Section */}
      <div className="container mx-auto px-5 py-8 lg:px-32 lg:py-24">
        <h1 className="text-4xl font-bold text-green-600 mb-12 text-center">
          Success Stories
        </h1>
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-full md:w-1/2 flex-wrap">
            <div className="w-full md:w-1/2 p-1 md:p-2 transition-transform transform hover:-translate-y-4">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center shadow-md hover:shadow-lg transition duration-300"
                src="https://plus.unsplash.com/premium_photo-1682092607850-4ee61bcf73c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="w-full md:w-1/2 p-1 md:p-2 transition-transform transform hover:-translate-y-4">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center shadow-md hover:shadow-lg transition duration-300"
                src="https://plus.unsplash.com/premium_photo-1682092605397-818fd5621240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
              />
            </div>
            <div className="w-full p-1 md:p-2 transition-transform transform hover:-translate-y-4">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center shadow-md hover:shadow-lg transition duration-300"
                src="https://plus.unsplash.com/premium_photo-1682092112837-3dcf3e85ea6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          </div>
          <div className="flex w-full md:w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2 transition-transform transform hover:-translate-y-4">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center shadow-md hover:shadow-lg transition duration-300"
                src="https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241_640.jpg"
              />
            </div>
            <div className="w-full md:w-1/2 p-1 md:p-2 transition-transform transform hover:-translate-y-4">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center shadow-md hover:shadow-lg transition duration-300"
                src="https://cdn.pixabay.com/photo/2019/02/21/14/07/handshake-4011416_1280.jpg"
              />
            </div>
            <div className="w-full md:w-1/2 p-1 md:p-2 transition-transform transform hover:-translate-y-4">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center shadow-md hover:shadow-lg transition duration-300"
                src="https://plus.unsplash.com/premium_photo-1682092699213-6b0b5cdcadef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhcm1lciUyMGdhaW4lMjBwcm9maXR8ZW58MHx8MHx8fDA%3D"
              />
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* Footer Section  */}
      <Footer />
    </>
  );
};

export default LandingPage;
