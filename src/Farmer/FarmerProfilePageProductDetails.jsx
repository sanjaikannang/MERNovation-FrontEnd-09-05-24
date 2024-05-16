import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FarmerProfilePageProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:4000/product/get-specific-product/${productId}`
        );
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          if (data.status === "rejected") {
          }
        } else {
          throw new Error(data.message || "Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <div className="bg-green-50">
        {/* NavBar Section  */}
        <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
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
        <br />
        {/* Product Images */}
        <div className="mx-auto max-w-7xl p-5">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.images.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className="w-full h-60 object-cover object-center rounded-3xl"
                />
              ))}
            </div>
          ) : (
            <div>Product not found</div>
          )}
        </div>
        <br />
        <br />
        <br />
        {/* Product Details */}
        <div className="mx-auto max-w-7xl p-5">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : product ? (
            <>
              <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <p className="text-gray-600">
                  <strong>Name:</strong> {product.name}
                </p>
                <p className="text-gray-600">
                  <strong>Description:</strong> {product.description}
                </p>
                <p className="text-gray-600">
                  <strong>Starting Price:</strong> ₹ {product.startingPrice} Per Kg
                </p>
                <p className="text-gray-600">
                  <strong>Availability:</strong> From{" "}
                  {new Date(product.startingDate).toLocaleDateString()} to{" "}
                  {new Date(product.endingDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Quantity:</strong> {product.quantity} Kg
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold mb-4">Admin Details</h3>
                  <p className="text-gray-600">
                    <strong>Status:</strong> {product.status}
                  </p>
                  {product.quality === "Verified" ? (
                    <img
                      src="/—Pngtree—verified stamp vector_9168723.png"
                      alt="Verified"
                      className="mt-4 h-28 w-28"
                    />
                  ) : (
                    <div>
                      {product.status === "rejected" && (
                        <>
                          <p className="text-red-500 mt-3"><strong className="text-gray-800">Rejection Reason : </strong> {product.rejectionReason}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold mb-4">Farmer Details</h3>
                  <p className="text-gray-600">
                    <strong>Name:</strong>{" "}
                    {product.farmer ? product.farmer.name : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong>{" "}
                    {product.farmer ? product.farmer.email : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong>{" "}
                    {product.farmer ? product.farmer.phoneNo : "N/A"}
                  </p>
                </div>
              </div>
              <br />
              <br />
              <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-4">Bidding Details</h3>                
              </div>
            </>
          ) : (
            <div>Product not found</div>
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
                <a
                  className="text-lg bg-green-500 rounded-full shadow-md py-2 px-6 flex items-center gap-2 transition-all duration-500 text-white hover:bg-green-600"
                >
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
      </div>
    </>
  );
};

export default FarmerProfilePageProductDetails;
