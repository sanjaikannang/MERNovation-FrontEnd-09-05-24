import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductUpload from "./ProductUpload";

const FarmerProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRejected, setShowRejected] = useState(false); // State to track whether to show rejected products

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return; // Return early to prevent further execution
    }
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/get-all-products-all"
        );
        const data = await res.json();
        if (res.ok) {
          // Reverse the order of products to display the newest first
          setProducts(data.products.reverse());
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <>
      {/* NavBar Section */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600  -bold">Harvest</span> Hub
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

      {/* Farmer related Content */}
      <section className="relative z-10 overflow-hidden bg-green-100 py-24 px-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-left">
                <h1 className="mt-0 mb-6 text-4xl lg:text-5xl font-bold leading-tight text-gray-800">
                  Welcome to <br className="lg:hidden" />
                  <span className="text-green-600">Harvest Hub !</span>
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-gray-700">
                  Your one-stop platform for selling farm products. Join our
                  vibrant community of farmers and reach thousands of buyers
                  easily.
                </p>
                <ul className="mb-8 text-lg leading-relaxed text-gray-700 list-disc pl-6">
                  <li>Simple and user-friendly platform</li>
                  <li>Connect directly with buyers</li>
                  <li>Maximize your profits</li>
                  <li>Effortlessly manage your listings</li>
                </ul>
                <br />
                <div className="w-full lg:w-1/2 flex justify-center">
                  <ProductUpload />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="hidden md:block">
                <img
                  src="/Image.png"
                  alt="Farmers Market"
                  className="w-full lg:w-3/4 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />

      {/* Product Section */}
      <div className="flex justify-center">
        <h1 className="text-5xl font-semibold mb-5"> All Products</h1>       
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mx-auto max-w-7xl p-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => {
            if (!showRejected && product.status === "rejected") {
              return null; // Skip rendering if showRejected is false and product is rejected
            }
            return (
              <div
                key={product._id}
                className=" shadow-md overflow-hidden relative rounded-md"
              >
                {/* Displaying only the first image */}
                <img
                  className="w-full h-60 object-cover object-center"
                  src={product.images[0]}
                  alt={product.name}
                />
                {/* Stamp Image */}
                <img
                  src="/—Pngtree—verified stamp vector_9168723.png"
                  alt="Verified Stamp"
                  className="absolute top-0 right-0 h-20 w-20 shadow-3xl"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-800 mb-4 text-lg">
                    Quantity : {product.quantity} Kg
                  </p>
                  <p className="text-gray-800 mb-4 text-lg">
                    Starting Price: ₹ {product.startingPrice} Per Kg
                  </p>
                  {/* Buy Now Button */}
                  <Link
                    to={`/farmer-product/${product._id}`}
                    className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            );
          })
        )}
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
