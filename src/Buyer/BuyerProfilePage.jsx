import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const BuyerProfilePage = () => {
  const navigate = useNavigate();
  const [buyerDetails, setBuyerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchBuyerDetails = async () => {
        try {
          const response = await fetch(
            "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/get-login-buyer-details",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch buyer details");
          }
          const data = await response.json();
          setBuyerDetails(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBuyerDetails();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/buyer-profile");
  };

  return (
    <>
      {/* NavBar Section */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className="text-green-600 font-bold">Harvest</span> Hub
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleProfile}
            className="text-white font-medium px-4 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="text-white font-medium px-4 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-green-600">
            Welcome to Your Buyer Profile
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Here you can view your profile details, check your winning products,
            and manage your purchases efficiently.
          </p>
        </div>
      </div>
      {/* About Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">
            About HarvestHub
          </h2>
          <p className="text-lg text-gray-700">
            HarvestHub is a digital platform connecting farmers directly with
            buyers. We aim to streamline the agricultural market by offering a
            transparent and efficient system for buying and selling produce. Our
            platform ensures fair pricing and quality products, helping you
            maximize your profits and minimize your efforts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8eS0w8bI9_mx7GcEiAJ_t8L9_1oYvBzinkHRbiZtgkA&s"
              alt="Marketplace"
              className="rounded-lg shadow-lg hidden sm:block h-44 w-44 sm:h-56 sm:w-56"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/9382/9382295.png"
              alt="Alternative Marketplace"
              className="rounded-lg shadow-lg hidden sm:block h-44 w-44 p-5 sm:h-56 sm:w-56"
            />
            <img
              src="https://images.moneycontrol.com/static-mcnews/2024/01/Buy_1280x720_3.png"
              alt="Community"
              className="rounded-lg shadow-lg hidden sm:block h-44 w-44 sm:h-56 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-semibold text-gray-800">
              Your Winning Product
            </h2>
            <br />
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 p-5">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : buyerDetails && buyerDetails.winningProduct ? (
                <div
                  key={buyerDetails.winningProduct._id}
                  className="shadow-md overflow-hidden relative rounded-md"
                >
                  <img
                    className="w-full h-60 object-cover object-center"
                    src={buyerDetails.winningProduct.images[0]}
                    alt={buyerDetails.winningProduct.name}
                  />
                  <img
                    src="/—Pngtree—verified stamp vector_9168723.png"
                    alt="Verified Stamp"
                    className="absolute top-0 right-0 h-20 w-20 shadow-3xl"
                  />
                  <div className="p-4 bg-white">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {buyerDetails.winningProduct.name}
                    </h2>
                    <p className="text-gray-800 mb-4 text-lg">
                      Quantity: {buyerDetails.winningProduct.quantity} Kg
                    </p>
                    <p className="text-gray-800 mb-4 text-lg">
                      Starting Price: ₹{" "}
                      {buyerDetails.winningProduct.startingPrice} Per Kg
                    </p>
                    <Link
                      to={`/buyer-product-details/${buyerDetails.winningProduct._id}`}
                      className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ) : (
                <div>No winning product found</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
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
                href="#"
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
              <ul className="flex items-center text-sm text-gray500 gap-9">
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BuyerProfilePage;
