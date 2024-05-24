import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductUpload from "./ProductUpload";

const FarmerProfilePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRejected, setShowRejected] = useState(false); // State to manage whether to display rejected products

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/get-login-products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user products:", error);
        setError("Failed to fetch user products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleViewDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const filterProducts = (filterType) => {
    if (filterType === "all") {
      setFilteredProducts(products);
    } else if (filterType === "rejected") {
      const rejectedProducts = products.filter(
        (product) => product.status === "rejected"
      );
      setFilteredProducts(rejectedProducts);
    } else {
      const filtered = products.filter((product) => {
        if (filterType === "accepted") {
          return product.status === "accepted";
        } else if (filterType === "pending") {
          return product.status === "pending";
        } else if (filterType === "biddingEnded") {
          return product.biddingStatus === "Bidding Ended";
        } else if (filterType === "biddingActive") {
          return product.biddingStatus === "Active";
        }
        return false;
      });
      setFilteredProducts(filtered);
    }
    setShowRejected(false); // Reset the state for showing rejected products
  };

  return (
    <>
      {/* NavBar Section  */}
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
      <br />
      <br />

      {/* Upload Product Button  */}
      <section className="relative z-10 overflow-hidden bg-green-100 py-24 px-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-left">
                <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-gray-700">
                  Start Selling Your Products on{" "}
                  <span className="text-green-500">Harvest Hub!</span>
                </h1>
                <br />
                <p className="mb-6 text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed text-gray-700">
                  Join HarvestHub and start building your own automated
                  serverless forms. Upload your own products and reach more
                  customers effortlessly.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <ProductUpload />
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mb-4">Your Own Products</h1>
        </div>
        <br />
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-4 justify-center">
            <button
              onClick={() => filterProducts("all")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
              All Products
            </button>
            <button
              onClick={() => filterProducts("accepted")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
              Accepted Products
            </button>
            <button
              onClick={() => filterProducts("rejected")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600" 
            >
              Rejected Products
            </button>
            <button
              onClick={() => filterProducts("pending")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
              Pending Products
            </button>
            <button
              onClick={() => filterProducts("biddingEnded")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
              Bidding Ended Products
            </button>
            <button
              onClick={() => filterProducts("biddingActive")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
              Bidding Active Products
            </button>
          </div>
        </div>
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 mx-auto max-w-4xl">
            {filteredProducts.length > 0 ? (
              filteredProducts
                .slice(0)
                .reverse()
                .map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="md:w-2/3">
                          <h2 className="text-xl font-bold mb-2">
                            {product.name}
                          </h2>
                          <p className="text-gray-700 mb-4">
                            {product.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:space-x-2 ">
                            <span className="bg-green-200 text-green-800 text-sm font-semibold px-2 py-1 rounded mb-2 sm:mb-0 flex flex-col justify-center items-center">
                              Product Status: {product.status}
                            </span>
                            <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-2 py-1 rounded flex flex-col justify-center items-center">
                              Bidding Status: {product.biddingStatus}
                            </span>
                          </div>
                        </div>
                        <div className="md:w-1/3 flex items-center justify-center mt-4 md:mt-0">
                          <button
                            onClick={() => handleViewDetails(product._id)}
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </div>
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
              <a className="text-lg bg-green-500 rounded-full shadow-md py-2 px-6 flex items-center gap-2 transition-all duration-500 text-white hover:bg-green-600">
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
export default FarmerProfilePage;
