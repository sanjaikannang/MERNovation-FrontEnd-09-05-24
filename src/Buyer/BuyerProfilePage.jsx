import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Footer";

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

      {/* Product Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-semibold text-gray-800">
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
      <Footer/>
     
    </>
  );
};

export default BuyerProfilePage;
