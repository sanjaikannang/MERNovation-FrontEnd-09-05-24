import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    // Remove token and role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Redirect to login page
    navigate("/login");
  };

  const handleViewDetails = (productId) => {
    // Redirect to the product details page
    navigate(`/admin-product-details/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:4000/product/get-all-products-all"
        );
        const data = await res.json();
        if (res.ok) {
          // Reverse the order of products to display the latest first
          setProducts(data.reverse());
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
      {/* Product Section */}
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4">Requests from the Farmer</h1>
      </div>
      <div className="">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mx-auto max-w-6xl p-5">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white overflow-hidden border-2 shadow-2xl"
                >
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Column 1: Name, Description, and Image */}
                      <div className="col-span-2 md:col-span-1 flex items-center">
                        {/* Image */}
                        <div className="md:w-1/3">
                          <img
                            className="w-30 h-30 object-cover object-center"
                            src={product.images[0]}
                            alt={product.name}
                          />
                        </div>
                        <div className="md:ml-4">
                          <h2 className="text-lg font-bold">
                            {product.name}
                          </h2>                          
                        </div>
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
    </>
  );
};

export default AdminProductPage;
