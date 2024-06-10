import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import moment from "moment";

const FarmerProfilePageProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [order, setOrder] = useState(null);
  const [shippingUpdates, setShippingUpdates] = useState([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isStartTimeStarted, setIsStartTimeStarted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const calculateRemainingTime = () => {
    if (isAccepted && isStartTimeStarted) {
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
    }
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
          setIsAccepted(data.status === "accepted");
          setIsStartTimeStarted(new Date() >= new Date(data.bidStartTime));
          if (
            data.status === "accepted" &&
            new Date() >= new Date(data.bidStartTime)
          ) {
            calculateRemainingTime();
          }
          if (data.bids && data.bids.length > 0) {
            const highest = data.bids.reduce((prev, current) =>
              prev.amount > current.amount ? prev : current
            );
            setHighestBid(highest);
          }
          if (data.order) {
            setOrder(data.order);
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
    let timer;
    if (isAccepted && isStartTimeStarted) {
      timer = setInterval(() => {
        calculateRemainingTime();
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isAccepted, isStartTimeStarted]);

  // Fetch shipping details
  const fetchShippingDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/shipping/get/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setShippingUpdates(data.shippingUpdates || []);
      } else {
        throw new Error(data.message || "Failed to fetch shipping details");
      }
    } catch (error) {
      console.error("Error fetching shipping details:", error);
      setError(error.message || "Failed to fetch shipping details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch shipping details when component mounts
  useEffect(() => {
    fetchShippingDetails();
  }, [productId]);

  // Sort shipping updates by timestamp
  const sortedUpdates = shippingUpdates.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  // Get dynamic steps from shipping updates
  const steps = sortedUpdates.map((update) => update.stage);

  // Determine the active step
  const activeStep = steps.length;

  return (
    <>
      <div className="bg-green-50 min-h-screen">
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
        <br />
        <br />
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
                    className="w-full h-60 object-cover object-center rounded-3xl shadow-2xl"
                  />
                ))}
              </div>
              <br />

              {/* Product Details and Admin & Farmer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {/* Product Details */}
                <div className="bg-white shadow-md p-6 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4 text-center">
                    Product Details
                  </h3>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>Name:</strong> {product.name}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>Description:</strong> {product.description}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>Availability:</strong> From{" "}
                    {new Date(product.startingDate).toLocaleDateString()} to{" "}
                    {new Date(product.endingDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>Bid Start Time:</strong>{" "}
                    {/* {new Date(product.bidStartTime).toLocaleString()} */}
                    {moment(product.bidStartTime).utc().format("DD-MM-yyyy HH:mm:ss")}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>Bid End Time:</strong>{" "}
                    {/* {new Date(product.bidEndTime).toLocaleString()} */}
                    {moment(product.bidEndTime).utc().format("DD-MM-yyyy HH:mm:ss")}
                  </p>
                  <p className="text-gray-600 text-center mb-2">
                    <strong>Quantity:</strong> {product.quantity} Kg
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>Starting Price:</strong> ₹{product.startingPrice}{" "}
                    Per Kg
                  </p>
                  <p className="text-gray-600 text-center">
                    <strong>Total Bid Amount:</strong> ₹{" "}
                    {product.totalBidAmount}
                  </p>
                </div>

                {/* Admin & Farmer Details */}
                <div className="grid grid-rows-2 gap-5">
                  {/* Admin Details */}
                  <div className="bg-white shadow-md p-2 rounded-3xl">
                    <h3 className="text-xl font-bold mb-2 text-center">
                      Admin Details
                    </h3>
                    <p className="text-gray-600 mb-2 text-center">
                      <strong>Status:</strong> {product.status}
                    </p>
                    {product.quality === "Verified" ? (
                      <img
                        src="/—Pngtree—verified stamp vector_9168723.png"
                        alt="Verified"
                        className="h-20 w-20 mx-auto text-center"
                      />
                    ) : (
                      <div>
                        {product.status === "rejected" && (
                          <>
                            <p className="text-red-500 mt-3 text-center">
                              <strong className="text-gray-800 text-center">
                                Rejection Reason:
                              </strong>{" "}
                              {product.rejectionReason}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Farmer Details */}
                  <div className="bg-white shadow-md p-2 rounded-3xl">
                    <h3 className="text-xl font-bold mb-2 text-center">
                      Farmer Details
                    </h3>
                    <p className="text-gray-600 mb-2 text-center">
                      <strong>Name:</strong>{" "}
                      {product.farmer ? product.farmer.name : "N/A"}
                    </p>
                    <p className="text-gray-600 mb-2 text-center">
                      <strong>Email:</strong>{" "}
                      {product.farmer ? product.farmer.email : "N/A"}
                    </p>
                    <p className="text-gray-600 text-center">
                      <strong>Phone:</strong>{" "}
                      {product.farmer ? product.farmer.phoneNo : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bidding Details */}
              <div className="bg-white shadow-md p-6 rounded-3xl mb-8">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  Bidding Details
                </h3>
                <p className="text-gray-600 mb-2 text-center">
                  <strong>Bid Start Time:</strong>{" "}
                  {/* {new Date(product.bidStartTime).toLocaleString()} */}
                  {moment(product.bidStartTime).utc().format("DD-MM-yyyy HH:mm:ss")}
                </p>
                <p className="text-gray-600 mb-2 text-center">
                  <strong>Bid End Time:</strong>{" "}
                  {/* {new Date(product.bidEndTime).toLocaleString()} */}
                  {moment(product.bidEndTime).utc().format("DD-MM-yyyy HH:mm:ss")}
                </p>
                {/* Display remaining time */}
                <div className="text-center mb-4">
                  <p className="text-red-500 text-2xl font-bold bg-slate-200 p-3 rounded-md">
                    {remainingTime}
                  </p>
                </div>
                {/* Display all bidders */}
                {product.bids && product.bids.length > 0 ? (
                  <div className="overflow-y-auto ">
                    <ul>
                      {/* Display all bidders */}
                      {product.bids
                        .sort((a, b) => b.amount - a.amount)
                        .map((bid, index) => (
                          <li
                            key={bid._id}
                            className={`py-4 px-6 ${
                              index === 0 ? "bg-yellow-100" : "bg-gray-100"
                            } rounded-xl mb-3 text-center`}
                          >
                            <div className="flex flex-col justify-between items-center">
                              <div className="flex items-center">
                                {index === 0 ? (
                                  <div className="flex items-center gap-3">
                                    <img
                                      src="https://img.freepik.com/premium-vector/gold-trophy-first-position-winner-championship-winner-trophy-vector-illustration_530733-2231.jpg?w=740"
                                      alt="Winner Trophy"
                                      className="w-14 h-14 rounded-full shadow-2xl mr-4"
                                    />
                                    <span className="font-semibold text-gray-800">
                                      {bid.bidder.name} :
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-semibold text-gray-800">
                                    {index + 1}. {bid.bidder.name} :
                                  </span>
                                )}
                                <span className="text-gray-600 ml-2">
                                  ₹{bid.amount}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-center text-gray-600">No bids yet</p>
                )}
              </div>

              {/* Winner Announcement */}
              {remainingTime === "Bidding Ended" && highestBid && (
                <>
                  <div className="bg-white shadow-md p-6 rounded-3xl mb-8">
                    <h3 className="text-xl font-bold mb-4 text-center text-green-600">
                      Winner
                    </h3>
                    <div className="text-center">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="https://img.freepik.com/premium-vector/gold-trophy-first-position-winner-championship-winner-trophy-vector-illustration_530733-2231.jpg?w=740"
                          alt="Winner Trophy"
                          className="h-24 w-24 mb-4"
                        />
                        <p className="text-xl text-gray-600 mb-2">
                          <strong>Name : </strong> {highestBid.bidder.name}
                        </p>
                        <p className="text-xl text-gray-600">
                          <strong>Winning Bid : </strong> ₹{highestBid.amount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details section */}
                  {order && (
                    <div className="bg-white shadow-md p-6 rounded-3xl">
                      <h3 className="text-xl font-bold mb-4 text-center text-green-600">
                        Payment Details
                      </h3>
                      <div className="text-center">
                        <div className="flex flex-col items-center justify-center">
                          <h4 className="text-lg font-bold mb-4">
                            Payment Process :{" "}
                            <span className="bg-gray-100 p-2 rounded-lg px-5 text-green-700">
                              {order.status}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Conditionally render shipping progress card */}
              {order && order.status === "Paid" && (
                <div className="bg-white shadow-md p-6 rounded-3xl mt-8 mb-8">
                  <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                      Shipping Progress
                    </h2>
                  </div>
                  <div className="container mx-auto">
                    <div className="flex flex-wrap">
                      {steps.map((step, index) => {
                        const update = sortedUpdates.find(
                          (update) => update.stage === step
                        );
                        return (
                          <div
                            key={index}
                            className={`w-full sm:w-1/2 lg:w-1/4 text-center mb-4 sm:mb-0 ${
                              index < activeStep
                                ? "complete"
                                : index === activeStep
                                ? "active"
                                : "disabled"
                            }`}
                          >
                            <div className="bs-wizard-stepnum text-lg mb-2">
                              {step}
                            </div>
                            <div className="progress h-4 relative bg-gray-200 mb-2">
                              <div
                                className={`progress-bar h-full ${
                                  index < activeStep ? "bg-green-500" : ""
                                }`}
                                style={{
                                  width:
                                    index === activeStep
                                      ? "50%"
                                      : index < activeStep
                                      ? "100%"
                                      : "0%",
                                }}
                              ></div>
                            </div>
                            <div className="bs-wizard-info text-sm mt-2 mb-2">
                              Step {index + 1}
                            </div>
                            <div className="bs-wizard-info text-lg mt-2 mb-2">
                              {update ? (
                                <>
                                  <div>{update.stage}</div>
                                  <div className="text-sm text-gray-500">
                                    {new Date(
                                      update.timestamp
                                    ).toLocaleString()}
                                  </div>
                                </>
                              ) : (
                                `Step ${index + 1} Info`
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>Product not found</div>
          )}
        </div>
      </div>

      {/* Footer Section */}
    <Footer/>
    </>
  );
};

export default FarmerProfilePageProductDetails;
