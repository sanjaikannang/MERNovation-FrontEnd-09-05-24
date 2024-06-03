import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ProductUpload from "./ProductUpload";
import FarmerChatting from "./FarmerChatting";

const FarmerProductPage = () => {
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
        <FarmerChatting />
      </section>
      <br />
      <br />

      {/* your own product section */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <h1 className="text-5xl font-semibold mb-8">Your Products</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mx-auto max-w-7xl p-5">
            {filteredProducts.length > 0 ? (
              filteredProducts
                .slice(0)
                .reverse()
                .map((product) => (
                  <div
                    key={product._id}
                    className="shadow-md overflow-hidden relative rounded-md"
                  >
                    <img
                      className="w-full h-60 object-cover object-center"
                      src={product.images[0]}
                      alt={product.name}
                    />
                    {product.quality === "Verified" && (
                      <img
                        src="/—Pngtree—verified stamp vector_9168723.png"
                        alt="Verified Stamp"
                        className="absolute top-0 right-0 h-20 w-20 shadow-3xl"
                      />
                    )}
                    <div className="p-4 bg-white">
                      <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        {product.name}
                      </h2>
                      <div className="flex flex-col mb-5 ">
                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded mb-2">
                          Product Status - {product.status}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                          Bidding Status - {product.biddingStatus}
                        </span>
                      </div>
                      <Link
                        to={`/farmer-product-details/${product._id}`}
                        className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                      >
                        View Product
                      </Link>
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
export default FarmerProductPage;
