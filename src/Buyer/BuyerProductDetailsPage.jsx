import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyerPayment from "./BuyerPayment";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const BuyerProductDetailsPage = () => {
  const { t } = useTranslation();
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
  const [remainingTime, setRemainingTime] = useState(null);
  const [bidEnded, setBidEnded] = useState(false);
  const [order, setOrder] = useState(null); // State to hold order details
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState(0); // State to hold amount for payment
  const [shipping, setShipping] = useState(null); // State to hold shipping details
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [errorShipping, setErrorShipping] = useState(null);
  const [shippingUpdates, setShippingUpdates] = useState([]);

  let timer;

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
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/get-specific-product/${productId}`
        );
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          setOrder(data.order); // Ensure to set the order state
          // console.log("Order Data:", data.order); // Log the order data
          setAmount(data.startingPrice); // Set amount for payment
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
          startTimer(data.bidEndTime);
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

    return () => clearInterval(timer);
  }, [productId]);

  const startTimer = (endTime) => {
    const end = moment(endTime).valueOf();

    setRemainingTime(end - moment().valueOf());

    timer = setInterval(() => {
      const now = new Date(new Date().getTime() + 330 * 60 * 1000);
      const remaining = end - now;
      if (remaining <= 0) {
        clearInterval(timer);
        setRemainingTime(0);
        setBidEnded(true); // Set bid ended flag to true
        toast.info("Bidding has Ended");
      } else {
        setRemainingTime(remaining);
      }
    }, 1000);
  };

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

      const data = await res.json(); // Parse response as JSON

      if (res.ok) {
        // Success case
        setBids((prevBids) => [
          ...prevBids,
          {
            bidder: { name: localStorage.getItem("userName") },
            amount: parseFloat(bidAmount), // Ensure the bid amount is stored as a number
          },
        ]);
        setBidAmount("");
        toast.success(data.message); // Show success message
      } else {
        // Error cases based on message from the backend
        if (
          data.message === "Bid Amount Want to Be Higher Than The Highest Bid"
        ) {
          toast.error(
            "Bid Amount Must Be Higher Than The Starting Price and Other Bids."
          );
        } else if (data.message === "Bidding Time is Not Valid") {
          toast.error("Bidding has Ended.");
        } else {
          toast.error(data.message); // General error message
        }
      }
    } catch (error) {
      toast.error("Internal Server Error"); // Display error message to the user
    }
  };

  const formatRemainingTime = (milliseconds) => {
    if (milliseconds <= 0) return "Bidding Ended";
    const duration = moment.duration(milliseconds);
    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Determine the winning bidder
  const winningBid = bids.length > 0 ? bids[0] : null;

  useEffect(() => {
    // Fetch the token from local storage
    const fetchedToken = localStorage.getItem("token"); // Make sure the key matches your local storage key
    if (fetchedToken) {
      setToken(fetchedToken);
    } else {
      console.error("Token not found in local storage");
    }
  }, []);

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
      <div className="bg-green-50">
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

        {/* Product Details */}
        <div className="mx-auto max-w-7xl p-5">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : product ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-white shadow-md p-6 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4 text-center">
                    {t("b-product-details")}
                  </h3>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("b-name")} </strong> {product.name}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("b-desc1")} </strong> {product.description}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("b-availability")} </strong> From{" "}
                    {new Date(product.startingDate).toLocaleDateString()} to{" "}
                    {new Date(product.endingDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("b-bid-s-time")} </strong>{" "}
                    {/* {new Date(product.bidStartTime).toLocaleString()} */}
                    {moment(bidStartTime).utc().format("DD-MM-yyyy HH:mm:ss")}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("b-bid-e-time")} </strong>{" "}
                    {/* {new Date(product.bidEndTime).toLocaleString()} */}
                    {moment(bidEndTime).utc().format("DD-MM-yyyy HH:mm:ss")}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("b-quantity1")} </strong> {product.quantity} Kg
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("b-starting-price")}</strong> ₹{" "}
                    {product.startingPrice} Per Kg
                  </p>
                  <p className="text-gray-600 text-center">
                    <strong>{t("b-total-bid-amount")} </strong> ₹{" "}
                    {product.totalBidAmount}
                  </p>
                </div>

                {/* admin and farmer details */}
                <div className="grid grid-rows-2 gap-5">
                  <div className="bg-white shadow-md p-2 rounded-3xl flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold mb-2">
                      {t("b-admin-details")}{" "}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <strong>{t("b-status")}</strong> {product.status}
                    </p>
                    {product.quality === "Verified" ? (
                      <img
                        src="/—Pngtree—verified stamp vector_9168723.png"
                        alt="Verified"
                        className="h-20 w-20 mx-auto text-center"
                      />
                    ) : (
                      <p className="text-red-500 mt-4">Not Verified</p>
                    )}
                  </div>
                  <div className="bg-white shadow-md p-2 rounded-3xl flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold mb-2">
                      {t("b-farmer-details")}{" "}
                    </h3>
                    <p className="text-gray-600">
                      <strong>{t("b-name1")} </strong>{" "}
                      {product.farmer ? product.farmer.name : "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>{t("b-email1")} </strong>{" "}
                      {product.farmer ? product.farmer.email : "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>{t("b-phone1")} </strong>{" "}
                      {product.farmer ? product.farmer.phoneNo : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Product not found</div>
          )}
          {/* Bidding Details */}
          <div className="bg-white shadow-md p-6 rounded-3xl">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-xl font-bold mb-4">{t("b-bid-details")} </h3>
              <p className="text-gray-600">
                <strong>{t("b-bid-s-time1")}</strong>{" "}
                {/* {new Date(bidStartTime).toLocaleString()} */}
                {moment(bidStartTime).utc().format("DD-MM-yyyy HH:mm:ss")}
              </p>
              <p className="text-gray-600">
                <strong>{t("b-bid-e-time1")} </strong>{" "}
                {/* {new Date(bidEndTime).toLocaleString()} */}
                {moment(bidEndTime).utc().format("DD-MM-yyyy HH:mm:ss")}
              </p>
              <br />
              {remainingTime !== null && (
                <p className="text-red-500 text-2xl font-bold bg-slate-200 p-3 rounded-md">
                  {formatRemainingTime(remainingTime)}
                </p>
              )}
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              <div className="bg-white border-2 p-6 rounded-3xl flex flex-col justify-center items-center h-80 overflow-y-scroll">
                <h3 className="text-xl font-bold mb-6">
                  {t("b-current-bid")}{" "}
                </h3>
                {bids.length > 0 ? (
                  <>
                    <h4 className="text-lg font-bold mb-4">
                      {t("b-highest-bid1")} ₹{bids[0].amount}
                    </h4>
                    <ul className="space-y-4">
                      {bids
                        .sort((a, b) => b.amount - a.amount) // Sort bids by amount in descending order
                        .map((bid, index) => (
                          <li
                            key={index}
                            className={`flex items-center py-2 ${
                              index === 0
                                ? "bg-yellow-100 p-5 rounded-xl"
                                : "bg-white p-4"
                            }`}
                          >
                            {index === 0 ? (
                              // Render trophy image for the highest bidder
                              <img
                                src="https://img.freepik.com/premium-vector/gold-trophy-first-position-winner-championship-winner-trophy-vector-illustration_530733-2231.jpg?w=740"
                                alt="Winner Trophy"
                                className="w-10 h-10 rounded-full shadow-2xl mr-4"
                              />
                            ) : (
                              // Render serial number for other bidders
                              <span className="font-semibold mr-4">
                                {index + 1}.
                              </span>
                            )}
                            <div>
                              <span className="font-semibold">
                                {bid.bidder.name ===
                                localStorage.getItem("userName")
                                  ? "Your Bid"
                                  : bid.bidder.name}{" "}
                                :
                              </span>{" "}
                              ₹ {bid.amount}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <p>No bids exist for this product</p>
                )}
              </div>
              <div className="bg-white border-2 p-6 rounded-3xl flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-6">
                  {t("b-place-your-bid")}{" "}
                </h3>
                <p className="mb-4 text-xl">
                  <strong>{t("b-highest-bid")} </strong>
                  {bids.length > 0 ? `₹${bids[0].amount}` : "No bids yet"}
                </p>
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="text-center font-semibold">{t("b-bid-desc")}</p>
                </div>

                <br />
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

        {/* Winner Card */}
        {bidEnded &&
          winningBid &&
          winningBid.bidder &&
          winningBid.bidder.email === localStorage.getItem("email") && (
            <div className="p-5 flex justify-center items-center">
              <div className="bg-white shadow-md p-8 rounded-3xl max-w-lg w-full">
                <div className="text-center">
                  <img
                    src="https://img.freepik.com/premium-vector/gold-trophy-first-position-winner-championship-winner-trophy-vector-illustration_530733-2231.jpg?w=740"
                    alt="Winner Trophy"
                    className="h-40 w-40 mx-auto mb-4 rounded-full shadow-2xl"
                  />
                  <h3 className="text-xl font-bold mb-4">
                    {t("b-congrats")} {winningBid.bidder.name}!
                  </h3>
                  <p className="text-gray-600">
                    {t("b-congrats-desc1")} ₹{winningBid.amount}
                    .
                    <br />
                    <br />
                    {t("b-congrats-desc2")}
                    <br />
                    <br />
                    {t("b-thankyou")}
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Payment Details Card */}
        {bidEnded &&
          winningBid &&
          winningBid.bidder &&
          winningBid.bidder.email === localStorage.getItem("email") && (
            <div className="mx-auto max-w-7xl p-5">
              <div className="bg-white shadow-lg p-6 rounded-3xl">
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold mb-4">
                    {t("b-payment-details")}{" "}
                  </h3>
                </div>
                {/* Grid Container for Order Details and Invoice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                  {/* Order Details */}
                  <div className="bg-white border-2 p-6 rounded-3xl flex flex-col justify-center h-auto">
                    <h3 className="text-2xl font-semibold mb-4">
                      {t("b-order-desc1")}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>{t("b-name2")} </strong> {product?.name}
                    </p>
                    <div className="text-left">
                      {order && (
                        <>
                          <p className="text-gray-700 mb-2">
                            <strong>{t("b-order-status")} </strong>{" "}
                            {order.status}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <strong>{t("b-created-at")} </strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <strong>{t("b-currency")} </strong> {order.currency}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <strong>{t("b-amount")} </strong> ₹ {bids[0].amount}{" "}
                            /-
                          </p>                          
                        </>
                      )}
                    </div>
                  </div>
                  {/* Invoice */}
                  <div className="bg-green-50 border-2 p-6 rounded-3xl flex flex-col justify-center h-auto">
                    <h3 className="text-2xl font-semibold mb-4">
                      {t("invoice")}
                    </h3>
                    <div className="text-left">
                      <p className="text-gray-700 mb-2">
                        <strong>{t("b-invoice-name")}</strong> {product?.name}
                      </p>

                      <p className="text-gray-700 mb-2">
                        <strong>{t("b-invoice-quantity")} </strong>{" "}
                        {product?.quantity} {product?.unit}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>{t("b-invoice-starting-price")} </strong> ₹{" "}
                        {product?.startingPrice} Per {product?.unit}
                      </p>
                      <p className="text-gray-700 mb-6">
                        <strong>{t("b-invoice-totaal-bid-amount")} </strong>{" "}
                        {product?.quantity} * ₹ {product?.startingPrice} = ₹
                        {product?.quantity * product?.startingPrice}
                      </p>
                      {bids.length > 0 && (
                        <>
                          <h4 className="text-lg font-bold mb-8">
                            {t("b-invoice-your-bid-amount")}{" "}
                            <span className="bg-gray-200 p-2 rounded-md text-green-700">
                              ₹ {bids[0].amount}/-
                            </span>
                          </h4>
                          <h4 className="text-lg font-bold mb-4">
                            {t("b-invoice-payment-process")}{" "}
                            <span className="bg-gray-100 p-2 rounded-lg px-5 text-green-700">
                              {order && order.status}
                            </span>
                          </h4>                          
                        </>
                      )}                         
                      <div>
                        {token && (
                          <BuyerPayment
                            productId={productId}
                            amount={bids[0]?.amount || 0}
                            token={token}
                          />
                        )}
                      </div>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Loser Card */}
        {bidEnded &&
          (!winningBid ||
            !winningBid.bidder ||
            winningBid.bidder.email !== localStorage.getItem("email")) && (
            <div className="p-5 flex justify-center items-center">
              <div className="bg-white shadow-md p-8 rounded-3xl max-w-lg w-full">
                <div className="text-center mb-8">
                  <br />
                  <h3 className="text-xl text-red-500 font-bold mb-4">
                    {t("b-looser-heading1")}
                  </h3>
                  <h3 className="text-xl font-bold mb-4">
                    {t("b-looser-heading2")}
                  </h3>
                  <p className="text-gray-600">
                    {t("b-looser-desc")}
                    <br />
                    <br />
                    {t("b-looser-thank")}
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Conditionally render shipping progress card */}
        {bidEnded &&
          winningBid &&
          winningBid.bidder &&
          winningBid.bidder.email === localStorage.getItem("email") &&
          order &&
          order.status === "Paid" && (
            <div className="mx-auto max-w-7xl p-5">
              <div className="bg-white shadow-md p-6 rounded-3xl mt-8 mb-8">
                <div className="flex flex-col justify-center items-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {t("b-ship-progress")}{" "}
                  </h2>
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping for this Product is in Progress !.
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
                            {t("b-step")} {index + 1}
                          </div>
                          <div className="bs-wizard-info text-lg mt-2 mb-2">
                            {update ? (
                              <>
                                <div>{update.stage}</div>
                                <div className="text-sm text-gray-500">
                                  {new Date(update.timestamp).toLocaleString()}
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
            </div>
          )}
      </div>

      {/* Footer Section  */}
      <Footer />

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default BuyerProductDetailsPage;
