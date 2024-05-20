import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FarmerProfilePageProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const calculateRemainingTime = () => {
    if (product && product.bidEndTime) {
      const endTime = new Date(product.bidEndTime).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = endTime - currentTime;
      if (timeDifference > 0) {
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setRemainingTime("Bidding Ended");
      }
    }
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
          calculateRemainingTime();
          if (data.bids && data.bids.length > 0) {
            const highest = data.bids.reduce((prev, current) =>
              prev.amount > current.amount ? prev : current
            );
            setHighestBid(highest);
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

  useEffect(() => {
    const timer = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  return (
    <>
      <div className="bg-green-50 min-h-screen">
        {/* NavBar Section */}
        <nav className="bg-white p-4 shadow-md flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-green-600">Harvest</span> Hub
          </div>
          <button
            onClick={handleLogout}
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow hover:bg-green-600"
          >
            Logout
          </button>
        </nav>
        <div className="mx-auto max-w-7xl p-5">
          {/* Product Images */}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : product ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {product.images.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index}`}
                    className="w-full h-60 object-cover object-center rounded-xl shadow-md"
                  />
                ))}
              </div>

              {/* Product Details */}
              <div className="bg-white shadow-md p-6 rounded-xl mb-8 flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Name:</strong> {product.name}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Description:</strong> {product.description}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Starting Price:</strong> ₹{product.startingPrice} Per
                  Kg
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Availability:</strong> From{" "}
                  {new Date(product.startingDate).toLocaleDateString()} to{" "}
                  {new Date(product.endingDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Bid Start Time:</strong>{" "}
                  {new Date(product.bidStartTime).toLocaleString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Bid End Time:</strong>{" "}
                  {new Date(product.bidEndTime).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <strong>Quantity:</strong> {product.quantity} Kg
                </p>
              </div>

              {/* Admin and Farmer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold mb-4">Admin Details</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> {product.status}
                  </p>
                  {product.quality === "Verified" ? (
                    <img
                      src="/—Pngtree—verified stamp vector_9168723.png"
                      alt="Verified"
                      className="h-28 w-28"
                    />
                  ) : (
                    <div>
                      {product.status === "rejected" && (
                        <>
                          <p className="text-red-500 mt-3">
                            <strong className="text-gray-800">
                              Rejection Reason:
                            </strong>{" "}
                            {product.rejectionReason}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold mb-4">Farmer Details</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Name:</strong>{" "}
                    {product.farmer ? product.farmer.name : "N/A"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong>{" "}
                    {product.farmer ? product.farmer.email : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong>{" "}
                    {product.farmer ? product.farmer.phoneNo : "N/A"}
                  </p>
                </div>
              </div>

              {/* Bidding Details */}
              <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-4">Bidding Details</h3>
                <div className="text-center mb-4">
                  <div className="text-red-500 text-2xl font-bold">
                    {remainingTime}
                  </div>
                </div>
                {product.bids && product.bids.length > 0 ? (
                  <div className="overflow-y-auto max-h-80 w-full">
                    <div className="flex flex-col justify-center items-center">
                      <h4 className="text-lg font-semibold mb-2">Bids:</h4>
                      <ul className="divide-y divide-gray-200 w-full flex flex-col justify-center items-center">
                        {product.bids.map((bid) => (
                          <li
                            key={bid._id}
                            className={`py-4 px-6 ${
                              highestBid && bid._id === highestBid._id
                                ? "bg-yellow-100 rounded-xl"
                                : ""
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <span className="font-medium">
                              {bid.bidder.name}
                                </span>
                                <span className="text-gray-600">
                                  ₹{bid.amount}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p>No bids yet</p>
                )}
              </div>

              {/* Winner Announcement */}
              {remainingTime === "Bidding Ended" && highestBid && (
                <div className="bg-white shadow-md p-6 rounded-xl flex flex-col justify-center items-center mt-8">
                  <h3 className="text-xl font-bold mb-4">Winner</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Name:</strong> {highestBid.bidder.name}
                  </p>
                  <p className="text-gray-600">
                    <strong>Winning Bid:</strong> ₹{highestBid.amount}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div>Product not found</div>
          )}
        </div>
        {/* Footer Section */}
        <footer className="w-full bg-zinc-100 mt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-20">
              <div className="py-8 text-center">
                <h3 className="font-manrope text-4xl text-green-600 font-bold mb-4">
                  Empower your agricultural business today!
                </h3>
                <p className="text-gray-500">
                  Join HarvestHub and connect directly with buyers or sellers.
                  Maximize your profits and streamline your transactions with
                  our digital platform.
                </p>
              </div>
              <div className="flex justify-center items-center gap-3">
                <a
                  href="#"
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
                    <a href="#">Terms</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Conditions</a>
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
