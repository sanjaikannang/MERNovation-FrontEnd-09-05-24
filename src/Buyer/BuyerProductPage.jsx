import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BuyerChatting from "./BuyerChatting";
import Footer from "../Footer";

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
            onClick={handleLogout}
            className="text-white font-medium px-4 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Discover Products Section */}
      <section className="relative z-10 overflow-hidden bg-green-50 py-10 px-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-left">
                <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-gray-700">
                  Discover Fresh Products on{" "}
                  <span className="text-green-500">Harvest Hub!</span>
                </h1>
                <br />
                <p className="mb-6 text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed text-gray-700">
                  Join HarvestHub to explore a wide variety of fresh and
                  high-quality products directly from farmers. Enjoy the
                  convenience of finding exactly what you need with just a few
                  clicks.
                </p>
                <ul className="list-disc text-lg list-inside text-left text-gray-700">
                  <li className="mb-2">
                    <span className="font-bold text-green-500">Browse :</span>{" "}
                    Vast selection of products.
                  </li>
                  <li className="mb-2">
                    <span className="font-bold text-green-500">Support :</span>{" "}
                    Local farmers and fresh produce.
                  </li>
                  <li className="mb-2">
                    <span className="font-bold text-green-500">
                      Seamless Transactions :
                    </span>{" "}
                    Secure and easy.
                  </li>
                  <li className="mb-2">
                    <span className="font-bold text-green-500">
                      Competitive Pricing :
                    </span>{" "}
                    Special offers and deals.
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/div.png"
                alt="Discover Products"
                className="rounded-full shadow-2xl w-3/3 mt-10 lg:w-full"
              />
            </div>
          </div>
        </div>
        <BuyerChatting />
      </section>

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

        <br />
        <br />
        <br />
      </div>

      {/* Footer Section  */}
     <Footer/>
    </>
  );
};

export default BuyerProductPage;
