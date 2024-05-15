import { useNavigate } from "react-router-dom";
import ProductUpload from "./ProductUpload";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/product/get-login-products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the user's token in localStorage
            },
          }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user products:", error);
        setError("Failed to fetch user products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    // Remove token and role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Redirect to login page
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleViewDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <>
      {/* NavBar Section  */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600 font-bold">Harvest</span> Hub
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
      <div className="container mx-auto px-4 ">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mb-4">Uploaded Products</h1>
        </div>
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 mx-auto max-w-6xl">
            {products.length > 0 ? (
              products.slice(0).reverse().map((product) => (
                <div
                  key={product._id}
                  className="bg-white overflow-hidden border-2 shadow-2xl"
                >
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Column 1: Name and Description */}
                      <div className="col-span-2 md:col-span-1">
                        <h2 className="text-lg font-bold mb-2">
                          {product.name}
                        </h2>
                        <p className="text-gray-700 mb-2">
                          {product.description}
                        </p>
                      </div>
                      {/* Column 2: Status */}
                      <div className="col-span-1 flex items-center justify-center">
                        <div className="col-span-2 md:col-span-1">
                          <h2 className="text-lg font-bold mb-2">Status</h2>
                          <p className="text-gray-700 mb-2">{product.status}</p>
                        </div>
                      </div>
                      {/* Column 3: Button */}
                      <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                        <button
                          onClick={() => handleViewDetails(product._id)}
                          className="bg-green-500 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
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

export default ProfilePage;
