import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BuyerChatting from "./BuyerChatting";

const BuyerProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/buyer-profile");
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
          // Filter accepted products
          const acceptedProducts = data.products.filter(
            (product) => product.status === "accepted"
          );
          // Sort products by date in ascending order (oldest first)
          acceptedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
          // Reverse the array to get newest products first
          setProducts(acceptedProducts.reverse());
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


      {/* Product Section */}
      <div className="bg-green-50">
        <br />
        <br />
        <div className="flex justify-center">
          <h1 className="text-5xl font-semibold mb-5">All Products</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mx-auto max-w-7xl p-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="shadow-md overflow-hidden relative rounded-md"
              >
                <img
                  className="w-full h-60 object-cover object-center"
                  src={product.images[0]}
                  alt={product.name}
                />
                <img
                  src="/—Pngtree—verified stamp vector_9168723.png"
                  alt="Verified Stamp"
                  className="absolute top-0 right-0 h-20 w-20 shadow-3xl"
                />
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-800 mb-4 text-lg">
                    Quantity: {product.quantity} Kg
                  </p>
                  <p className="text-gray-800 mb-4 text-lg">
                    Starting Price: ₹ {product.startingPrice} Per Kg
                  </p>
                  <Link
                    to={`/buyer-product-details/${product._id}`}
                    className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        <BuyerChatting/>
        <br />
        <br />
        <br />
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

export default BuyerProductPage;
