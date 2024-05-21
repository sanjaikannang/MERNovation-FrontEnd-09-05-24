import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const BuyerProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]);
  const [biddingStatus, setBiddingStatus] = useState("");
  const [bidStartTime, setBidStartTime] = useState("");
  const [bidEndTime, setBidEndTime] = useState("");
  const [bidAmount, setBidAmount] = useState("");

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
          `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/get-specific-product/${productId}`
        );
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
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

    const fetchBids = async () => {
      try {
        const res = await fetch(
          `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/get-all-bids/${productId}`
        );
        const data = await res.json();
        if (res.ok) {
          setBids(data.bids);
          setBiddingStatus(data.biddingStatus);
          setBidStartTime(data.bidStartTime);
          setBidEndTime(data.bidEndTime);
        } else if (res.status === 404) {
          setBids([]);
          setBiddingStatus("Not Started");
          setBidStartTime(data.bidStartTime);
          setBidEndTime(data.bidEndTime);
        } else {
          throw new Error(data.message || "Failed to fetch bids");
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    fetchProduct();
    fetchBids();
  }, [productId]);

  const handleBidChange = (e) => setBidAmount(e.target.value);

  const handlePlaceBid = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/bid-product/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bidAmount: parseFloat(bidAmount) }), // Ensure the bid amount is sent as a number
        }
      );

      const text = await res.text(); // Get response text for debugging
      if (res.ok) {
        const data = JSON.parse(text);
        setBids((prevBids) => [
          ...prevBids,
          {
            bidder: { name: localStorage.getItem("userName") },
            amount: parseFloat(bidAmount), // Ensure the bid amount is stored as a number
          },
        ]);
        setBidAmount("");
      } else {
        throw new Error(`Failed to place bid: ${text}`);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert(error.message); // Display error message to the user
    }
  };

  return (
    <>
      <div className="bg-green-50">
        {/* NavBar Section */}
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
                  <strong>Starting Price:</strong> ₹ {product.startingPrice} Per
                  Kg
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
                    <p className="text-red-500 mt-4">Not Verified</p>
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
            </>
          ) : (
            <div>Product not found</div>
          )}
          {/* Bidding Details */}
          <div className="bg-white shadow-md p-6 rounded-xl">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-xl font-bold mb-4">Bidding Details</h3>
              <p>Bidding Status: {biddingStatus}</p>
              <p>Bidding Start Time: {bidStartTime}</p>
              <p>Bidding End Time: {bidEndTime}</p>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white border-2 p-6 rounded-xl flex flex-col justify-center items-center h-80 overflow-y-scroll">
                <h3 className="text-xl font-bold mb-6">Current Bids</h3>
                {bids.length > 0 ? (
                  <>
                    <h4 className="text-lg font-bold mb-4">
                      Highest Bid: ₹{bids[0].amount}
                    </h4>
                    <ul>
                      {bids
                        .sort((a, b) => b.amount - a.amount)
                        .map((bid, index) => (
                          <li
                            key={index}
                            className={`py-2 ${
                              index === 0 ? "bg-yellow-100 p-5 rounded-xl" : ""
                            }`}
                          >
                            <span className="font-semibold">{index + 1}. </span>
                            <span className="font-semibold">
                              {bid.bidder.name ===
                              localStorage.getItem("userName")
                                ? "Your Bid"
                                : "Unknown User"}
                              :
                            </span>{" "}
                            ₹{bid.amount}
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <p>No bids exist for this product</p>
                )}
              </div>
              <div className="bg-white border-2 p-6 rounded-xl flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-6">Place Your Bid</h3>
                <p className="mb-4"></p>
                <p className="mb-4">
                  <strong>Highest Bid: </strong>
                  {bids.length > 0 ? `₹${bids[0].amount}` : "No bids yet"}
                </p>
                <input
                  type="number"
                  placeholder="Enter Bid Amount"
                  value={bidAmount}
                  onChange={handleBidChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                />
                <button
                  onClick={handlePlaceBid}
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerProductDetailsPage;
