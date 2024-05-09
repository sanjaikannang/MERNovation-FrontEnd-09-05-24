import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };

  return (
    <>
      {/* NavBar Section  */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600 font-bold">Harvest</span>
          Hub
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Login
          </button>
          <button
            onClick={handleLogin}
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-wrap">
        <div className="w-full sm:w-8/12 mb-10">
          <div className="container mx-auto h-full sm:p-10">
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-4xl lg:text-5xl font-bold text-zinc-700">
                  'HarvestHub' -{" "}
                  <span className="text-green-600">
                    Empowering Farmers, Connecting Communities
                  </span>
                </h1>
                <div className="w-20 h-2 bg-green-600 my-4"></div>
                <p className="text-lg mb-10">
                  'HarvestHub' is a application designed to farmers in rural
                  areas connect with buyers, eliminating middlemen and ensuring
                  fair prices for agricultural products. By providing real-time
                  pricing information, enabling product listings, implementing a
                  bidding system, and offering inventory management features,
                  HarvestHub aims to empower farmers and improve market access,
                  ultimately fostering rural development.
                </p>
                <button
                onClick={() => Navigate("/login")}
                className="bg-green-500 text-white text-xl font-semibold px-8 py-2 shadow-2xl rounded-lg hover:bg-green-600">
                  Explore HarvestHub
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
      <section className="overflow-hidden px-7 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] p-7 bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1678344177250-bfdbed89fc03?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full rounded-2xl "
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
                <span className="block  text-4xl text-green-600 font-bold text-primary">
                  Key Features
                </span>
                <br />
                <br />
                <h2 className="mb-5 text-3xl font-bold  dark:text-white sm:text-[40px]/[48px]">
                  Revolutionize the Way{" "}
                  <span className="text-4xl font-bold text-green-600  ">
                    {" "}
                    Farmers Connect with Buyers
                  </span>
                </h2>
                <p className="mb-5 text-lg text-body-color dark:text-dark-6">
                  HarvestHub empowers farmers by providing real-time pricing
                  information, enabling product listings, implementing a bidding
                  system, and offering inventory management features.
                </p>
                <p className="mb-8 text-lg text-body-color dark:text-dark-6">
                  Connect directly with farmers, ensure fair prices, and enjoy a
                  wide range of fresh agricultural produce with HarvestHub.
                </p>
                <br />
                <a 
                onClick={() => Navigate("/login")}
                className="bg-green-500 text-white text-xl font-semibold px-8 py-2 shadow-2xl rounded-lg hover:bg-green-600">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SOLUTION Section */}
      <div className="flex flex-col items-center justify-center bg-zinc-100 px-7 p-7">
        <div className="max-w-6xl mx-auto">
          <br />
          <br />
          <br />
          <h1 className="text-4xl font-bold text-green-600 mb-8">
            Our Solution
          </h1>
          <div className="text-zinc-700 space-y-4 text-xl">
            <p>
              HarvestHub is a digital platform designed to revolutionize the way
              farmers and buyers connect in agricultural markets.
            </p>
            <p>
              We facilitate direct transactions between farmers and buyers,
              eliminating middlemen and ensuring fair prices for agricultural
              produce. Through our platform, farmers can list their products,
              including real-time pricing information, enabling buyers to make
              informed decisions.
            </p>
            <p>
              HarvestHub provides features such as a bidding system, inventory
              management, and secure payment processing, making it easier for
              farmers to manage their sales and for buyers to access quality
              products.
            </p>
            <br />
            <div className="flex space-x-4">
              <button 
              onClick={() => Navigate("/login")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl">
                Explore HarvestHub
              </button>
              <button
              onClick={() => Navigate("/login")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl">
                Learn more about us
              </button>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <br />
      <br />

      {/* GET STARTED Section */}
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-green-600">Get Started</h1>
          <br />
          <p className="mt-4 text-xl text-zinc-600">
            HarvestHub opens the door to thousands of buyers and sellers. Post
            your crop bid as a registered buyer, or create your crop offer as a
            platform verified seller. Through our rigorous customer compliance
            we make sure that only reliable users gain access to our digital
            marketplace. There are two ways to get started:
          </p>
          <br />
          <br />
          <hr />
          <br />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              POST OFFER AS A SELLER
            </h2>
            <br />
            <p className="mt-2 text-zinc-600 text-xl">
              As a seller, post offers for the agricultural crop you are looking
              to sell, and gain immediate access to credit-verified buyers. Or
              simply react to an existing buyer’s bid and start your
              transaction.
            </p>
            <br />
            <button
            onClick={() => Navigate("/login")}
            className="text-xl px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl">
              Register as a seller
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              POST BID AS A BUYER
            </h2>
            <br />
            <p className="text-xl mt-2 text-zinc-600">
              As a buyer, post bids for the agricultural crop you are looking to
              buy. Communicate to the market what you are looking for, and get
              rapid reactions from interested farmers or sellers.
            </p>
            <br />
            <button
            onClick={() => Navigate("/login")}
            className="text-xl px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-2xl">
              Register as a buyer
            </button>
          </div>
        </div>
      </div>

      <br />

      {/* Success Story Section */}
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-full md:w-1/2 flex-wrap">
            <div className="w-full md:w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://plus.unsplash.com/premium_photo-1682092607850-4ee61bcf73c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="w-full md:w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://plus.unsplash.com/premium_photo-1682092605397-818fd5621240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
              />
            </div>
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://plus.unsplash.com/premium_photo-1682092112837-3dcf3e85ea6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          </div>
          <div className="flex w-full md:w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241_640.jpg"
              />
            </div>
            <div className="w-full md:w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://cdn.pixabay.com/photo/2019/02/21/14/07/handshake-4011416_1280.jpg"
              />
            </div>
            <div className="w-full md:w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://plus.unsplash.com/premium_photo-1682092699213-6b0b5cdcadef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhcm1lciUyMGdhaW4lMjBwcm9maXR8ZW58MHx8MHx8fDA%3D"
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      {/* Footer Section  */}
      <footer className="w-full bg-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="py-8 text-center">
              <h3 className="font-manrope text-4xl text-green-600 font-bold mb-4">
                Empower your agricultural business today!
              </h3>
              <p className="text-gray-500">
                Join HarvestHub and connect directly with buyers or sellers.
                Maximize your profits and streamline your transactions with our
                digital platform.
              </p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <a
              onClick={() => Navigate("/login")}
              className="text-lg bg-green-500 rounded-full shadow-md py-2 px-6 flex items-center gap-2 transition-all duration-500 text-white hover:bg-green-600">
                Get started
              </a>
            </div>
          </div>
          <div className="py-7 border-t border-gray-200">
            <div className="flex items-center justify-center flex-col gap-7 lg:justify-between lg:flex-row">
              <span className="text-sm text-gray-500">
                © HarvestHub 2024, All rights reserved.
              </span>
              <ul className="flex items-center text-sm text-gray-500 gap-9">
                <li>
                  <a>Terms</a>
                </li>
                <li>
                  <a>Privacy</a>
                </li>
                <li>
                  <a>Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
