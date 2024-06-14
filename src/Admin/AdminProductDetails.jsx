import moment from "moment";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const AdminProductDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [order, setOrder] = useState(null);
  const [updatingShipping, setUpdatingShipping] = useState(false);
  const [newShippingStatus, setNewShippingStatus] = useState("");
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [shipping, setShipping] = useState([]);
  const [bidEnded, setBidEnded] = useState(false);

  let timer;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

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

  const formatRemainingTime = (milliseconds) => {
    if (milliseconds <= 0) return "Bidding Ended";
    const duration = moment.duration(milliseconds);
    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleAccept = async () => {
    try {
      setAccepting(true);
      const res = await fetch(
        `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/verify/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
        toast.success("Product accepted successfully.");
      } else {
        throw new Error(data.message || "Failed to accept product");
      }
    } catch (error) {
      console.error("Error accepting product:", error);
      toast.error(error.message || "Failed to accept product");
    } finally {
      setAccepting(false);
    }
  };

  const handleReject = async () => {
    try {
      setShowRejectModal(true);
      setRejecting(true);
      const res = await fetch(
        `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/verify/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: "rejected",
            rejectionReason: rejectReason,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
        toast.success("Product rejected successfully.");
      } else {
        throw new Error(data.message || "Failed to reject product");
      }
    } catch (error) {
      console.error("Error rejecting product:", error);
      toast.error(error.message || "Failed to reject product");
    } finally {
      setRejecting(false);
    }
  };

  // Fetch shipping details
  const fetchShippingDetails = async () => {
    try {
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
        setShipping(data.shippingUpdates || []);
      } else {
        throw new Error(data.message || "Failed to fetch shipping details");
      }
    } catch (error) {
      console.error("Error fetching shipping details:", error);
      toast.error(error.message || "Failed to fetch shipping details");
    }
  };

  // Fetch shipping details when component mounts
  useEffect(() => {
    fetchShippingDetails();
  }, []);

  // Sort shipping updates by timestamp
  const sortedUpdates = shipping.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  // Get dynamic steps from shipping updates
  const steps = sortedUpdates.map((update) => update.stage);

  // Determine the active step
  const activeStep = steps.length;

  const handleUpdateShippingStatus = async () => {
    try {
      setUpdatingShipping(true);
      const res = await fetch(
        "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/shipping/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ productId, stage: newShippingStatus }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Shipping status updated successfully.");
        // Fetch updated shipping details
        fetchShippingDetails();
        setShowUpdateStatusModal(false);
      } else {
        throw new Error(data.message || "Failed to update shipping status");
      }
    } catch (error) {
      console.error("Error updating shipping status:", error);
      toast.error(error.message || "Failed to update shipping status");
    } finally {
      setUpdatingShipping(false);
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
          startTimer(data.bidEndTime);
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

  return (
    <>
      <div className="bg-green-50 min-h-screen">
        <ToastContainer />
        {/* NavBar Section */}
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
        <div className="mx-auto max-w-7xl p-5">
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
              <br />

              {/* Product DetailsmSection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-white shadow-md p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-center">
                  {t("a-product-details")} 
                  </h3>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong> {t("a-name")} </strong> {product.name}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong> {t("a-desc")} </strong> {product.description}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong> {t("a-availability")} </strong> From{" "}
                    {new Date(product.startingDate).toLocaleDateString()} to{" "}
                    {new Date(product.endingDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong> {t("a-bid-s-time")}</strong>{" "}
                    {/* {new Date(product.bidStartTime).toLocaleString()} */}
                    {moment(product.bidStartTime)
                      .utc()
                      .format("DD-MM-yyyy HH:mm:ss")}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong>{t("a-bid-e-time")} </strong>{" "}
                    {/* {new Date(product.bidEndTime).toLocaleString()} */}
                    {moment(product.bidEndTime)
                      .utc()
                      .format("DD-MM-yyyy HH:mm:ss")}
                  </p>
                  <p className="text-gray-600 mb-2 text-center">
                    <strong> {t("a-starting-price")} </strong> ₹ {product.startingPrice}{" "}
                    Per Kg
                  </p>
                  <p className="text-gray-600 text-center mb-2">
                    <strong>{t("a-quanity")} </strong> {product.quantity} Kg
                  </p>
                  <p className="text-gray-600 text-center">
                    <strong>{t("a-total-bid-amount")} </strong> ₹{" "}
                    {product.totalBidAmount}
                  </p>
                </div>

                <div className="grid grid-rows-2 gap-5">
                  <div className="bg-white shadow-md p-2 rounded-xl">
                    <h3 className="text-xl font-bold mb-2 text-center">
                    {t("a-admin-details")}
                    </h3>
                    <p className="text-gray-600 mb-2 text-center">
                      <strong> {t("a-status")}  </strong> {product.status}
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
                              {t("a-reject-reason")}
                              </strong>{" "}
                              {product.rejectionReason}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="bg-white shadow-md p-2 rounded-xl">
                    <h3 className="text-xl font-bold mb-2 text-center">
                    {t("a-farmer-details")} 
                    </h3>
                    <p className="text-gray-600 mb-2 text-center">
                      <strong>{t("a-farmer-name")} </strong>{" "}
                      {product.farmer ? product.farmer.name : "N/A"}
                    </p>
                    <p className="text-gray-600 mb-2 text-center">
                      <strong>{t("a-farmer-email")} </strong>{" "}
                      {product.farmer ? product.farmer.email : "N/A"}
                    </p>
                    <p className="text-gray-600 mb-2 text-center">
                      <strong>{t("a-farmer-phone")} </strong>{" "}
                      {product.farmer ? product.farmer.phoneNo : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Verification Section */}
              {product.status === "pending" && (
                <div className="flex justify-center mb-8">
                  <div className="bg-white shadow-md p-6 rounded-xl w-full md:w-2/3 lg:w-1/2">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                    {t("a-product-verification")} 
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 text-center">
                    {t("a-product-desc")} 
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handleAccept}
                        className={`px-4 py-2 rounded ${
                          accepting ? "bg-green-300" : "bg-green-500"
                        } text-white font-bold`}
                        disabled={accepting}
                      >
                        {accepting ? "Accepting..." : "Accept Product"}
                      </button>
                      <button
                        onClick={() => setShowRejectModal(true)}
                        className="px-4 py-2 bg-red-500 rounded text-white font-bold"
                      >
                        Reject Product
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Reject Modal */}
              {showRejectModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-md shadow-md max-w-sm w-full">
                    <h2 className="text-xl text-red-500 font-bold mb-4 text-center">
                    {t("a-product-reject")} 
                    </h2>
                    <p className="text-gray-600 text-lg mb-4 text-center">
                    {t("a-reject-heading")} 
                      <br />
                      {t("a-reject-desc")} 
                    </p>
                    <textarea
                      className="w-full h-24 border rounded-md resize-none mb-4 p-3"
                      placeholder="Enter Rejection Reason..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-4"
                        onClick={() => setShowRejectModal(false)}
                        disabled={rejecting}
                      >
                         Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={handleReject}
                        disabled={rejecting}
                      >
                        {rejecting ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bidding Details */}
              <div className="bg-white shadow-md p-6 rounded-xl mt-8">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                {t("a-bid-details")} 
                </h3>
                <p className="text-gray-600 mb-2 text-center">
                  <strong>{t("a-bid-s-time")} </strong>{" "}
                  {/* {new Date(product.bidStartTime).toLocaleString()} */}
                  {moment(product.bidStartTime)
                    .utc()
                    .format("DD-MM-yyyy HH:mm:ss")}
                </p>
                <p className="text-gray-600 mb-2 text-center">
                  <strong>{t("a-bid-e-time")} </strong>{" "}
                  {/* {new Date(product.bidEndTime).toLocaleString()} */}
                  {moment(product.bidEndTime)
                    .utc()
                    .format("DD-MM-yyyy HH:mm:ss")}
                </p>
                <div className="text-center mb-4">
                  {remainingTime !== null && (
                    <p className="text-red-500 text-2xl font-bold bg-slate-200 p-3 rounded-md">
                      {formatRemainingTime(remainingTime)}
                    </p>
                  )}
                </div>
                {product.bids && product.bids.length > 0 ? (
                  <div className="overflow-y-auto">
                    <ul>
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
                  <p className="text-center text-gray-600">
                    No Bids Yet For This Product !
                  </p>
                )}
              </div>

              {/* Winner Card Section */}
              {/* {remainingTime === "Bidding Ended" && highestBid && ( */}
              {bidEnded &&
                highestBid &&
                product.biddingStatus === "Bidding Ended" && (
                  <div className="bg-white shadow-md p-6 rounded-xl mt-8">
                    <h3 className="text-xl font-bold mb-4 text-center text-green-600">
                    {t("a-winner")} 
                    </h3>
                    <div className="text-center">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="https://img.freepik.com/premium-vector/gold-trophy-first-position-winner-championship-winner-trophy-vector-illustration_530733-2231.jpg?w=740"
                          alt="Winner Trophy"
                          className="h-24 w-24 mb-4"
                        />
                        <p className="text-xl text-gray-600 mb-2">
                          <strong>{t("a-winner-name")} </strong> {highestBid.bidder.name}
                        </p>
                        <p className="text-xl text-gray-600">
                          <strong>{t("a-winner-bid")} </strong> ₹{highestBid.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </>
          ) : (
            <div>Product not found</div>
          )}
          <br />

          {/* Payment Details section */}
          {order && (
            <div className="bg-white shadow-md p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-center text-green-600">
              {t("a-payment-details")} 
              </h3>
              <div className="text-center">
                <div className="flex flex-col items-center justify-center">
                  <h4 className="text-lg font-bold mb-4">
                  {t("a-payment-process")} {" "}
                    <span className="bg-gray-100 p-2 rounded-lg px-5 text-green-700">
                      {order.status}
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Details Section */}
          {bidEnded &&
            highestBid &&
            
            product.biddingStatus === "Bidding Ended" && (
              <div className="bg-white shadow-md p-6 rounded-xl mt-8">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                {t("a-shipping-details")} 
                </h3>
                <div className="flex flex-col justify-center items-center">
                  <button
                    onClick={() => setShowUpdateStatusModal(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold"
                  >
                    {t("a-update-status")} 
                  </button>
                </div>
                {shipping.length > 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-4"></div>
                    {/* Progress Bar */}
                    <div className="p-8">
                      <div className="container mx-auto">
                        <div className="flex flex-wrap ">
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
                                {t("a-step")} {index + 1}
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
                  </>
                ) : (
                  <p className="text-center text-gray-600 mt-5">
                    Shipping Details Not Available For this Product !
                  </p>
                )}

                {/* Update Status Modal */}
                {showUpdateStatusModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md max-w-sm w-full">
                      <h2 className="text-xl text-green-500 font-bold mb-4 text-center">
                      {t("a-update-ship-status")}
                      </h2>
                      <p className="text-gray-600 text-lg mb-4 text-center">
                      {t("a-enter-new-ship-status")}
                      </p>
                      <input
                        className="w-full h-12 border rounded-md mb-4 px-3"
                        type="text"
                        placeholder="Enter new shipping status..."
                        value={newShippingStatus}
                        onChange={(e) => setNewShippingStatus(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-4"
                          onClick={() => setShowUpdateStatusModal(false)}
                          disabled={updatingShipping}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md"
                          onClick={handleUpdateShippingStatus}
                          disabled={updatingShipping}
                        >
                          {updatingShipping ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default AdminProductDetails;
