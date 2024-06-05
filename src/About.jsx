import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };

  const handleAbout = () => {
    Navigate("/about");
  };

  const projects = [
    { image: "/elements.png" },
    { image: "/elements (1).png" },
    { image: "/elements (2).png" },
    { image: "/elements (3).png" },
  ];

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

      <div className="font-sans">
        {/* Hero Section */}
        <div
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/hero (4).png')" }}
        >
          <div className="absolute inset-0 opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold">
              Revolutionize the agricultural market
              <br />
              by connecting <span className="text-yellow-500">Farmers</span>
              <br />
              directly with <span className="text-yellow-500">Buyers</span>
            </h1>
            <button className="mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg">
              Discover More
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="py-16 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-yellow-500 text-lg">Get to know us</h2>
              <h3 className="text-3xl md:text-4xl font-bold mt-2">
                Leader in Agriculture Market
              </h3>
              <p className="mt-4 text-zinc-600">
                HarvestHub is designed to tackle the inefficiencies in the
                agricultural market. We empower farmers by providing direct
                access to buyers, ensuring fair prices, and fostering rural
                development.
              </p>

              <button className="mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg">
                Discover More
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/sec-2 img-1.png"
                alt="Farmer"
                className="w-full h-full object-cover rounded-lg"
              />
              <img
                src="/sec-2 img-2.png"
                alt="Farm"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
        <section className="py-12">
          <div className="text-center">
            <h2 className="text-yellow-600 text-lg">Our Services</h2>
            <h1 className="text-3xl font-bold">What We Offer</h1>
          </div>
          <div className="flex flex-wrap justify-center mt-8">
            {[
              {
                title: "Real-time Pricing Display",
                img: "/offer-1.png",
              },
              {
                title: "Detailed Product Listings",
                img: "/offer-2.png",
              },
              {
                title: "Bidding System",
                img: "/offer-3.png",
              },
              {
                title: "Payment",
                img: "/offer-3.png",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="m-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-80"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="rounded-t-lg"
                />
                <div className="p-4">
                  <div className="text-3xl">{service.icon}</div>
                  <h3 className="text-xl font-semibold mt-2">
                    {service.title}
                  </h3>
                  {/* <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                    Lorem ipsum is simply free available. Aenean leo quam.
                    Pellentesque ornare sem lacinia.
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Recent Work Section */}
        <section className="py-12 p-5">
          <div className="text-center">
            <h2 className="text-yellow-600 text-lg">Our Latest Initiatives</h2>
            <h1 className="text-3xl font-bold">Recently Completed Projects</h1>
            <p className="text-zinc-600 dark:text-zinc-300 mt-4">
              Discover our recent projects aimed at enhancing market
              transparency and improving rural livelihoods.
            </p>
          </div>

          <div className="py-12 px-4 md:px-8 lg:px-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Explore Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="relative w-full h-64 md:h-80 lg:h-full overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={project.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end">
                    <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold"></h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-7xl mx-auto p-4">
          <br />
          <br />
          <div className="bg-green-500 text-white p-8 rounded-lg mb-8">
            <h1 className="text-3xl font-bold">
              Built the best agriculture market
            </h1>
            <p className="mt-4">
              HarvestHub offers a range of services to bridge the gap between
              farmers and buyers. HarvestHub is designed to tackle the
              inefficiencies in the agricultural market. We empower farmers by
              providing direct access to buyers, ensuring fair prices, and
              fostering rural development.
            </p>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-yellow-600">Team Members</h2>
            <h3 className="text-2xl font-bold">Meet Our Farmers</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mt-4 mb-8">
              Get to know the dedicated farmers who bring fresh produce to your
              table.
            </p>
            <br />
            <p className="text-zinc-600  font-bold text-2xl dark:text-zinc-300 mt-4">
              Feature profiles of a few farmers with their stories and photos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
              <img
                src="/farmer1.png"
                alt="Kevin Smith"
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold">Kevin Smith</h4>
                <p className="text-zinc-500 dark:text-zinc-400">Farmer</p>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
              <img
                src="/farmer2.png"
                alt="Jessica Brown"
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold">Jessica Brown</h4>
                <p className="text-zinc-500 dark:text-zinc-400">Farmer</p>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
              <img
                src="/farmer3.png"
                alt="David Martin"
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold">David Martin</h4>
                <p className="text-zinc-500 dark:text-zinc-400">Farmer</p>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>

      {/* Agriculture Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12">
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <img
            src="c1.png"
            alt="Main farm image"
            className="rounded-full w-3/4 lg:w-96"
          />
          <img
            src="c2.png"
            alt="Secondary farm image"
            className="rounded-full w-1/4 absolute bottom-0 left-0 transform translate-x-1/4 translate-y-1/4 border-4 border-white"
          />
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:ml-12 text-center lg:text-left">
          <br />
          <br />
          <p className="text-yellow-500 font-semibold">for Agriculture</p>
          <h1 className="text-3xl lg:text-4xl font-bold mt-2">
            Agriculture & Organic Product Farm
          </h1>
          <p className="text-green-500 font-semibold mt-2">
            Fostering Sustainable Agriculture
          </p>
          <p className="text-zinc-700 mt-4">
            Learn about our initiatives to promote sustainable farming practices
            and support rural development.
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start mt-6">
            <div className="flex items-center mr-6 mb-4 lg:mb-0">
              <img
                src="/Icon.png"
                alt="Growing fruits and vegetables"
                className="w-12 h-12"
              />
              <p className="ml-2">Growing fruits & vegetables</p>
            </div>
            <div className="flex items-center">
              <img
                src="/Icon (1).png"
                alt="Tips for ripening your fruits"
                className="w-12 h-12"
              />
              <p className="ml-2">Tips for ripening your fruits</p>
            </div>
          </div>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg mt-6">
            Discover More
          </button>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>

      {/* TestiMonial Section */}
      <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6">
        <section className="text-center mb-12">
          <h2 className="text-yellow-600 text-sm uppercase mb-2">
            For Testimonials
          </h2>
          <h1 className="text-3xl font-bold mb-6">What They Say</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm">
              <p className="mb-4">
                "HarvestHub has significantly improved my income by connecting
                me directly with buyers."
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="/face1.png"
                  alt="Bonnie Tolbet"
                />
                <div>
                  <h3 className="font-bold">Bonnie Tolbet</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Customer
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm">
              <p className="mb-4">
                "I love being able to access fresh produce directly from farmers
                at fair prices."
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="/face2.png"
                  alt="Sarah Albert"
                />
                <div>
                  <h3 className="font-bold">Sarah Albert</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Customer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <br />
        <br />
      </div>

      <div className="flex flex-col lg:flex-row items-center bg-white dark:bg-zinc-900">
        <div className="w-full lg:w-1/2">
          <img
            src="/div.png"
            alt="Farmer with fresh produce"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-green-500 p-8">
          <h2 className="text-white text-3xl font-bold mb-4">
            Healthy Life with Fresh Products
          </h2>
          <p className="text-white mb-6">
            Enjoy the benefits of fresh, organic produce directly from the farm
            to your table. HarvestHub ensures the highest quality products for a
            healthier lifestyle.
          </p>
          <div className="flex items-center mb-6">
            <div className="text-white text-2xl font-bold">87%</div>
            <div className="text-white ml-4">Organic Solutions</div>
          </div>
          <ul className="text-white space-y-2">
            <li className="flex items-center">Biodynamic food</li>
            <li className="flex items-center">Organic gardening</li>
            <li className="flex items-center">Organic food certification</li>
          </ul>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
        {/* Header Section */}
        <div className="relative flex flex-col md:flex-row items-center justify-between p-8 bg-white dark:bg-zinc-800">
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-green-600">
              Fresh & Natural
            </h1>
            <h2 className="text-2xl mt-2">Produce In Our Store</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Our commitment to providing fresh and natural products ensures
              that you get the best from our farms.
            </p>
            <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg">
              Purchase Now
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/div1.png"
              alt="Fresh Vegetables"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-4">
          <div className="text-center mb-4">
            <p className="text-green-600 font-semibold">Customers' Review</p>
            <h2 className="text-2xl font-bold">What people say?</h2>
            <br />
            <h2 className="text-xl font-semibold">
              Read reviews from our satisfied customers who have experienced the
              benefits of HarvestHub.
            </h2>
          </div>
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
            </div>
            <p className="text-zinc-700 italic">
              “The quality of the produce is outstanding, and the prices are
              fair. It's great to know where my food comes from and support
              local farmers.”
            </p>
          </div>
          <div className="flex items-center justify-center mt-4">
            <img
              className="w-16 h-16 rounded-full border-2 border-green-600"
              src="/2.jpg.png"
              alt="Reviewer"
            />
          </div>
          <div className="text-center mt-4">
            <p className="font-bold">Emily R.</p>
            <p className="text-green-600">BUYER</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-12">
        <div className="md:w-1/2">
          <img
            src="/1.jpg.png"
            alt="Farmer working"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
          <h1 className="text-2xl md:text-4xl font-bold">
            Agriculture & Organic Product Farm
          </h1>
          <p className="mt-4 text-zinc-600">
            Explore our organic farming practices and commitment to
            sustainability. HarvestHub connects you with farmers who prioritize
            the health of the soil and the quality of their produce.
          </p>
          <div className="mt-6 text-4xl md:text-5xl font-bold text-green-600">
            25M
          </div>
          <p className="text-zinc-600">Growth Tons of Harvest</p>
          <div className="flex flex-col md:flex-row mt-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 p-4 bg-yellow-100 rounded-lg shadow-md">
              <img
                src="/2.png.png"
                alt="Organic Product"
                className="w-12 h-12"
              />
              <h2 className="mt-2 text-lg font-semibold">
                100% Guaranteed Organic Product
              </h2>
              <p className="mt-1 text-zinc-600">
                Always fresh and healthy for ultimate enjoyment.
              </p>
            </div>
            <div className="flex-1 p-4 bg-green-100 rounded-lg shadow-md">
              <img src="/3.png.png" alt="Healthy Foods" className="w-12 h-12" />
              <h2 className="mt-2 text-lg font-semibold">
                Top-Quality Healthy Foods Production
              </h2>
              <p className="mt-1 text-zinc-600">
                High standards of food safety and quality.
              </p>
            </div>
          </div>
        </div>
      </div>

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
                className="text-lg bg-green-500 rounded-full shadow-md py-2 px-6 flex items-center gap-2 transition-all duration-500 text-white hover:bg-green-600"
              >
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

export default About;
