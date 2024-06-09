import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import {
  FaDollarSign,
  FaClipboardList,
  FaHandHoldingUsd,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const About = () => {
  const { t } = useTranslation();
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };

  const handleAbout = () => {
    Navigate("/about");
  };

  // State variables for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Function to handle opening the modal and setting the selected certificate
  const handleViewCertificate = (certificateUrl) => {
    setSelectedCertificate(certificateUrl);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  // Dummy data for Our Services
  const services = [
    {
      title: t("realTimePricingDisplay"),
      description: t("realTimePricingDescription"),
      icon: (
        <FaDollarSign className="text-5xl text-green-600 transition-transform transform hover:scale-110" />
      ),
      img: "https://ddztmb1ahc6o7.cloudfront.net/foothillsford/wp-content/uploads/2023/07/14005101/Real-Time-Market-Pricing-logo-final.png",
    },
    {
      title: t("detailedProductListings"),
      description: t("detailedProductDescription"),
      icon: (
        <FaClipboardList className="text-5xl text-green-600 transition-transform transform hover:scale-110" />
      ),
      img: "https://img.freepik.com/free-vector/paper-production-wood-processing-online-service-platform-cutting-wood-making-paper-cardboard-website-isolated-flat-vector-illustration_613284-2437.jpg?t=st=1717954700~exp=1717958300~hmac=62d721e88eca0fe73b37b27c0bc8ab7d317d4d994190edbf6be7e4dbc71b38fe&w=826",
    },
    {
      title: t("biddingSystem"),
      description: t("biddingSystemDescription"),
      icon: (
        <FaHandHoldingUsd className="text-5xl text-green-600 transition-transform transform hover:scale-110" />
      ),
      img: "https://media.licdn.com/dms/image/D5612AQHSu129fFqfIA/article-cover_image-shrink_600_2000/0/1693127487240?e=2147483647&v=beta&t=OaFPRtUEXSODqBwZlGFlqewJ2ZSDLvwDhsnb-OnKoJk",
    },
    {
      title: t("securePaymentProcessing"),
      description: t("securePaymentDescription"),
      icon: (
        <FaMoneyBillWave className="text-5xl text-green-600 transition-transform transform hover:scale-110" />
      ),
      img: "https://img.freepik.com/free-vector/flat-scene-about-e-payment_23-2147675343.jpg?t=st=1717954848~exp=1717958448~hmac=91ff7f1380c0f8ae6ea27cc5b033b2d5c9ef4d7e98df213874803180ce4f1ec8&w=740",
    },
  ];

  // Dummy data for farmer profiles
  const farmers = [
    {
      name: t("kevinSmith"),
      imgSrc: "/farmer1.png",
      rating: 4.5,
      description: t("kevinDescription"),
    },
    {
      name: t("jessicaBrown"),
      imgSrc: "/farmer2.png",
      rating: 4.8,
      description: t("jessicaDescription"),
    },
    {
      name: t("davidMartin"),
      imgSrc: "/farmer3.png",
      rating: 4.2,
      description: t("davidDescription"),
    },
  ];

  // Dummy data for Team Members
  const teamMembers = [
    {
      name: "Giovani Bacardo",
      role: "Farmer Verification Expert",
      image: "/team1.png",
      social: {
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Marianne Loreno",
      role: "Product Certification Officer",
      image: "/team2.png",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
    {
      name: "Riga Pelore",
      role: "Agricultural Quality Inspector",
      image: "/team3.png",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Keira Knightley",
      role: "Organic Product Validator",
      image: "/team4.png",
      social: {
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Scott Lawrence",
      role: "Farm Product Auditor",
      image: "/team5.png",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
    {
      name: "Karen Allen",
      role: "Certified Crop Inspector",
      image: "/team6.png",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
  ];

  return (
    <>
      {/* NavBar Section  */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600 font-bold">Harvest</span> Hub
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLogin}
            className="text-white font-medium px-1 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            {t("Login")}
          </button>
          <button
            onClick={handleLogin}
            className="text-white font-medium px-1 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            {t("Signup")}
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
      <div className="font-sans">
        {/* Hero Section */}
        <div
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/hero (4).png')" }}
        >
          <div className="absolute inset-0 opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold">
              {t("title")}
              <br />
              <span className="text-white">{t("subTitle")}</span>
              <span className="text-yellow-500">{t("f")}</span>
              <br />
              <span className="text-white">{t("directly-with")}</span>
              <span className="text-yellow-500">{t("b")}</span>
            </h1>
            <button 
            onClick={() => Navigate("/login")}
            className="mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg">
              {t("discoverMore")}
            </button>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
        <section className="py-12">
          <div className="text-center">
            <h2 className="text-green-600 text-3xl mb-5 font-semibold">
              {t("ourServices")}
            </h2>
            <h1 className="text-3xl font-bold">{t("whatWeOffer")}</h1>
          </div>
          <div className="flex flex-wrap justify-center mt-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="m-4 bg-green-50 dark:bg-zinc-800 rounded-t-3xl shadow-lg w-80 transition-transform transform hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="rounded-t-3xl h-80"
                />
                <div className="p-4">
                  <div className="flex justify-center">
                    <div className="rounded-full border-2 border-green-600 p-2.5">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-center">
                    {service.title}
                  </h3>
                  <p className="text-md mt-4 mb-2 text-center">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <br />
      </div>

      {/* Farmer Success */}
      <div className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-7xl mx-auto p-4">
          <br />
          <br />
          <div className="text-center mb-8">
            <h3 className="text-3xl text-green-600 font-bold">
              {t("meetOurFarmers")}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 mt-4 mb-8">
              {t("getToKnowFarmers")}
            </p>
            <br />
            <p className="text-zinc-600 font-bold text-2xl dark:text-zinc-300 mt-4">
              {t("featureProfiles")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {farmers.map((farmer, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={farmer.imgSrc}
                  alt={farmer.name}
                  className="w-full "
                />
                <div className="p-4">
                  <h4 className="text-xl font-bold mb-4">{farmer.name}</h4>
                  <div className="flex items-center">
                    {/* Display star icons for rating */}
                    {Array.from(Array(Math.floor(farmer.rating)), (_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                    {/* Display half star icon if rating is not whole number */}
                    {farmer.rating % 1 !== 0 && (
                      <FaRegStar className="text-yellow-400" />
                    )}
                    {/* Display rating */}
                    <span className="text-sm ml-2">{farmer.rating}</span>
                  </div>
                  {/* Display farmer's description */}
                  <p className="text-gray-600 mt-2">"{farmer.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      {/* Agriculture Section */}
      <div className="bg-zinc-50 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12">
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <img
            src="c1.png"
            alt="Main farm image"
            className="rounded-full w-3/4 lg:w-96 hidden md:block"
          />
          <img
            src="c2.png"
            alt="Secondary farm image"
            className="rounded-full w-1/4 absolute bottom-0 left-0 transform translate-x-1/4 translate-y-1/4 border-4 border-white hidden md:block"
          />
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:ml-12 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t("agricultureTitle")}
          </h2>
          <p className="text-green-500 font-semibold mb-2">
            {t("sustainableAgriculture")}
          </p>
          <p className="text-zinc-700 mb-6">{t("initiatives")}</p>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start mt-6 mb-6">
            <div className="flex items-center mr-6 mb-4 lg:mb-0">
              <FaLeaf className="w-8 h-8 text-green-500" />
              <p className="ml-2">{t("growingFruitsVegetables")}</p>
            </div>
            <div className="flex items-center">
              <FaLeaf className="w-8 h-8 text-green-500" />
              <p className="ml-2">{t("ripeningFruitsTips")}</p>
            </div>
          </div>
          <button 
          onClick={() => Navigate("/login")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mt-6 transition duration-300">
            {t("discoverMore")}
          </button>
          <br />
          <br />
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-green-100 shadow-lg rounded-lg p-8 max-w-2xl mx-4">
          <div className="text-center mb-4">
            <p className="text-green-600 font-semibold">
              {t("customerReviewsTitle")}
            </p>
            <h2 className="text-2xl font-bold">{t("whatPeopleSay")}</h2>
            <br />
            <h2 className="text-xl font-semibold">{t("reviewText")}</h2>
          </div>
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
            </div>
            <p className="text-zinc-700 italic">{t("reviewQuote")}</p>
          </div>
          <div className="flex items-center justify-center mt-4">
            <img
              className="w-16 h-16 rounded-full border-2 border-green-600"
              src="/2.jpg.png"
              alt="Reviewer"
            />
          </div>
          <div className="text-center mt-4">
            <p className="font-bold">{t("reviewerName")}</p>
            <p className="text-green-600">{t("reviewerRole")}</p>
          </div>
        </div>
      </div>

      {/* Buyer Section */}
      <div className="flex flex-col lg:flex-row items-center bg-white dark:bg-zinc-900">
        <div className="w-full lg:w-1/2">
          <img
            src="/div.png"
            alt="Farmer with fresh produce"
            className="w-full rounded-r-3xl h-auto object-cover hidden md:block"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-green-500 p-8">
          <h2 className="text-white text-3xl font-bold mb-4">
            {t("buyerSectionTitle")}
          </h2>
          <p className="text-white mb-6">{t("buyerSectionDescription")}</p>
          <div className="flex items-center mb-6">
            <div className="text-white text-2xl font-bold">
              {t("organicSolutionsPercent")}
            </div>
            <div className="text-white ml-4">{t("organicSolutionsText")}</div>
          </div>
          <ul className="text-white space-y-2">
            {t("benefitsList", { returnObjects: true }).map(
              (benefit, index) => (
                <li key={index} className="flex items-center">
                  {benefit}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="container mx-auto px-4 py-8 mt-12">
        <div className="max-w-7xl mx-auto p-4">
          <div className="text-center mb-12">
            <h2 className="text-green-600 font-semibold text-4xl mb-5">
              {t("ourTeamTitle")}
            </h2>
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
              {t("teamMemberTitle")}
            </h1>
            <p className="text-zinc-600 text-xl dark:text-zinc-400 mt-2">
              {t("teamMemberDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-74 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-zinc-800 dark:text-zinc-200 text-xl font-semibold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 text-lg">{member.role}</p>
                  <div className="flex items-center mt-4">
                    {Object.keys(member.social).map((social, idx) => (
                      <a
                        key={idx}
                        href={member.social[social]}
                        className="text-zinc-600 dark:text-zinc-400 hover:text-green-600 mx-2"
                      >
                        <i className={`fab fa-${social}`}></i>
                      </a>
                    ))}
                  </div>
                  <div className="flex float-end">
                    {/* Attach event handler to View Certificate button */}
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 text-sm mb-4 rounded-full"
                      onClick={() => handleViewCertificate(member.certificate)}
                    >
                      {t("viewCertificateButton")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 p-3">
          <div className="bg-gray-100 p-4 max-w-lg overflow-y-auto relative">
            <div className="text-center relative z-10">
              <div className="flex justify-center">
                <img
                  src="https://t4.ftcdn.net/jpg/00/92/41/19/360_F_92411937_zYksEzht4rfnmlvLevs8KJhI4l7b48Wt.jpg"
                  alt="Certificate Background"
                  className="w-24 h-24 rounded-full border-2"
                />
              </div>
              <h2 className="text-md font-semibold text-green-600">
                Certificate of Agricultural Farmer Verification Expert
              </h2>
              <p className="text-sm text-gray-700">This is to certify that</p>
              <h3 className="text-md font-bold mb-2">" Giovani Bacardo "</h3>
              <p className="text-sm text-gray-700">
                has successfully completed the Agricultural Farmer Verification
                Expert training and is hereby recognized as a qualified
                Agricultural Farmer Verification Expert.
              </p>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex flex-col">
                <p className="text-sm font-semibold flex justify-center ">
                  Issued By
                </p>
                <p className="text-sm text-gray-700">
                  Department of Agricultural Marketing Board
                </p>
              </div>
            </div>
            <div className="certificate-details mt-2">
              <p className="text-sm font-semibold">Certificate Details:</p>
              <ul className="text-gray-700 text-sm">
                <li>Course Name: Farmer Verification Expert</li>
                <li>Completion Year: 2020</li>
                <li>Valid Until: 2030</li>
              </ul>
            </div>
            <div className="certificate-signatures flex justify-between mt-2">
              <div className="flex flex-col items-center">
                <img
                  src="https://www.signwell.com/assets/vip-signatures/muhammad-ali-signature-3f9237f6fc48c3a04ba083117948e16ee7968aae521ae4ccebdfb8f22596ad22.svg"
                  alt="Signature 1"
                  className="w-20 h-10"
                />
                <p className="text-sm text-gray-700">Certification Officer</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://www.signwell.com/assets/vip-signatures/clint-eastwood-signature-e5a46a2363ef513d4fc0a45d8c0340943082ce60229084e3a12b82539321094b.png"
                  alt="Signature 2"
                  className="w-20 h-10"
                />
                <p className="text-sm text-gray-700">Training Instructor</p>
              </div>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 mt-8 rounded w-full"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Organic Agriculture Section */}
      <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-12 bg-green-50">
        <div className="md:w-1/2">
          <img
            src="/1.jpg.png"
            alt={t("Organic Agriculture Section: Farmer working")}
            className="w-full h-full shadow-md rounded-full"
          />
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
          <h1 className="text-2xl md:text-4xl font-bold text-zinc-800">
            {t(
              "Organic Agriculture Section: Agriculture & Organic Product Farm"
            )}
          </h1>
          <p className="mt-4 text-zinc-600">
            {t(
              "Organic Agriculture Section: Explore our organic farming practices and commitment to sustainability. HarvestHub connects you with farmers who prioritize the health of the soil and the quality of their produce."
            )}
          </p>
          <div className="mt-6 text-4xl md:text-5xl font-bold text-green-600">
            25M
          </div>
          <p className="text-zinc-600">
            {t("Organic Agriculture Section: Growth Tons of Harvest")}
          </p>
          <div className="flex flex-col md:flex-row mt-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 p-4 bg-yellow-100 rounded-lg shadow-md">
              <img
                src="/2.png.png"
                alt={t("Organic Agriculture Section: Organic Product")}
                className="w-12 h-12"
              />
              <h2 className="mt-2 text-lg font-semibold text-zinc-800">
                {t(
                  "Organic Agriculture Section: 100% Guaranteed Organic Product"
                )}
              </h2>
              <p className="mt-1 text-zinc-600">
                {t(
                  "Organic Agriculture Section: Always fresh and healthy for ultimate enjoyment."
                )}
              </p>
            </div>
            <div className="flex-1 p-4 bg-green-100 rounded-lg shadow-md">
              <img
                src="/3.png.png"
                alt={t("Organic Agriculture Section: Healthy Foods")}
                className="w-12 h-12"
              />
              <h2 className="mt-2 text-lg font-semibold text-zinc-800">
                {t(
                  "Organic Agriculture Section: Top-Quality Healthy Foods Production"
                )}
              </h2>
              <p className="mt-1 text-zinc-600">
                {t(
                  "Organic Agriculture Section: High standards of food safety and quality."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section  */}
      <Footer />
    </>
  );
};

export default About;
