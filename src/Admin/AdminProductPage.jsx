import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminChatting from "./AdminChatting";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:4000/product/get-all-products-all"
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products.reverse());
      } else {
        throw new Error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleViewDetails = (productId) => {
    navigate(`/admin-product-details/${productId}`);
  };

  const handleFilter = (status) => {
    setFilter(status);
    setShowMessages(false); // Ensure products are shown when filtering
  };

  const handleMessagesClick = () => {
    setShowMessages(true);
  };

  // Filter products based on the selected filter
  const filteredProducts = filter
    ? products.filter((product) => {
        if (filter === "Bidding Active") {
          return product.biddingStatus === "Active";
        } else if (filter === "Bidding Ended") {
          return product.biddingStatus === "Bidding Ended";
        } else {
          return product.status === filter.toLowerCase();
        }
      })
    : products;

  return (
    <>
      <nav className="bg-white p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className="text-green-600 font-bold">Harvest</span> Hub
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Logout
          </button>
        </div>
      </nav>
      <br />
      <br />
      <div className="flex justify-center">
        <h1 className="text-5xl font-semibold mb-5"> Admin Dashboard</h1>
      </div>
      <br />
      {/* Filter buttons */}
      <div className="max-w-8xl p-5 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-1 mb-4 justify-center">
          <button
            className="bg-green-500 rounded-full p-1 px-4 py-1 text-white hover:bg-green-700 font-semibold transition duration-300"
            onClick={() => handleFilter(null)}
          >
            All Products
          </button>
          <button
            className="bg-green-500 rounded-full p-1 px-4 py-1 text-white  hover:bg-green-700 font-semibold transition duration-300"
            onClick={() => handleFilter("pending")}
          >
            Pending Products
          </button>
          <button
            className="bg-green-500 rounded-full p-1 px-4 py-1 text-white  hover:bg-green-700 font-semibold transition duration-300"
            onClick={() => handleFilter("accepted")}
          >
            Accepted Products
          </button>
          <button
            className="bg-green-500 rounded-full p-1 px-4 py-1 text-white  hover:bg-green-700 font-semibold transition duration-300"
            onClick={() => handleFilter("rejected")}
          >
            Rejected Products
          </button>
          <button
            className="bg-green-500 rounded-full p-1 px-4 py-1 text-white  hover:bg-green-700 font-semibold transition duration-300"
            onClick={() => handleFilter("Bidding Active")}
          >
            Bidding Active Products
          </button>
          <button
            className="bg-green-500 rounded-full p-1 px-4 py-1 text-white  hover:bg-green-700 font-semibold transition duration-300"
            onClick={() => handleFilter("Bidding Ended")}
          >
            Bidding Ended Products
          </button>
          <button
            className="bg-green-500 rounded-full p-1 px-4 py-1 text-white  hover:bg-green-700 font-semibold transition duration-300"
            onClick={handleMessagesClick}
          >
            Messages
          </button>
        </div>
      </div>
      <hr className="mb-4 bg-black border-b-2 max-w-8xl" />
      <br />
      {showMessages ? (
        <AdminChatting />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mx-auto max-w-7xl p-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`overflow-hidden relative bg-green-50 rounded-lg ${
                  product.status === "Pending" ? "border-yellow-500" : ""
                }`}
              >
                {/* Displaying only the first image */}
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
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <div className="flex flex-col mb-5 ">
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded mb-2">
                      Product Status - {product.status}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded mb-2">
                      Bidding Status - {product.biddingStatus}
                    </span>
                  </div>
                  {/* View Product Button */}
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <br />
      <br />
      <br />
    </>
  );
};

export default AdminProductPage;
