import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTimeIST, setCurrentTimeIST] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleViewDetails = (productId) => {
    navigate(`/admin-product-details/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/product/get-all-products-all");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products.reverse());
          setCurrentTimeIST(data.currentTimeIST);
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

    fetchProducts();
  }, []);

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
      <div className="flex justify-center">
        <h1 className="text-5xl font-semibold mb-5"> All Products</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mx-auto max-w-7xl p-5">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className={`shadow-md overflow-hidden relative ${product.status === 'Pending' ? 'border-yellow-500' : ''}`}
            >
              {/* Displaying only the first image */}
              <img
                className="w-full h-60 object-cover object-center"
                src={product.images[0]}
                alt={product.name}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>   
                {/* Displaying status below the product name */}
                <p className="text-gray-700 mb-2">Status : {product.status}</p>                   
                {/* View Product Button */}
                <br />
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
    </>
  );
};

export default AdminProductPage;
