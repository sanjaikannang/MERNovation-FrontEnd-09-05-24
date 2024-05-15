import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleAccept = async () => {
    try {
      setAccepting(true);
      const res = await fetch(
        `http://localhost:4000/product/verify/${productId}`,
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
        setSuccessMessage("Product accepted successfully.");
      } else {
        throw new Error(data.message || "Failed to accept product");
      }
    } catch (error) {
      console.error("Error accepting product:", error);
      setErrorMessage(error.message || "Failed to accept product");
    } finally {
      setAccepting(false);
    }
  };

  const handleReject = async () => {
    try {
      setRejecting(true);
      const res = await fetch(
        `http://localhost:4000/product/verify/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "rejected", rejectionReason: rejectReason }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
        setSuccessMessage("Product rejected successfully.");
      } else {
        throw new Error(data.message || "Failed to reject product");
      }
    } catch (error) {
      console.error("Error rejecting product:", error);
      setErrorMessage(error.message || "Failed to reject product");
    } finally {
      setRejecting(false);
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
                className="w-full h-60 object-cover object-center"
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
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              {/* Product and Farmer Details */}
              <div className="bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-16 shadow-2xl">
                {/* Product Details */}
                <div className="mb-8 md:mb-0">
                  <h3 className="text-xl font-bold mb-4">Product Details</h3>
                  <p className="text-gray-600">
                    <strong>Name:</strong> {product.name}
                  </p>
                  <p className="text-gray-600">
                    <strong>Description:</strong> {product.description}
                  </p>
                  <p className="text-gray-600">
                    <strong>Starting Price:</strong> ₹ {product.startingPrice}{" "}
                    Per Kg
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
                {/* Farmer Details */}
                <div>
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
                  <br />
                  <br />
                  <div className="flex justify-end gap-5">
                    <button
                      onClick={handleAccept}
                      disabled={accepting || rejecting}
                      className="text-white font-medium px-4 py-1 rounded-lg bg-green-500 shadow-2xl hover:bg-green-600"
                    >
                      {accepting ? "Accepting..." : "Accept"}
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      disabled={accepting || rejecting}
                      className="text-white font-medium px-4 py-1 rounded-lg bg-red-500 shadow-2xl hover:bg-red-600"
                    >
                      {rejecting ? "Rejecting..." : "Reject"}
                    </button>
                  </div>
                  {/* Reject Modal */}
                  {showRejectModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <div
                          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="modal-headline"
                        >
                          <div className="bg-green-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                  className="text-2xl leading-6 font-medium text-gray-900 flex justify-center"
                                  id="modal-headline"
                                >
                                  Reject Product
                                </h3>
                                <br />
                                <div className="mt-2">
                                  <p className="text-md font-semibold text-gray-700">
                                    Please Provide an Valid Reason for Rejecting the
                                    Product !
                                  </p>
                                  <br />
                                  <textarea
                                    className="mt-2 p-3 h-40 w-full border-gray-300 rounded-md shadow-sm "
                                    placeholder="Enter Rejection Reason..."
                                    value={rejectReason}
                                    onChange={(e) =>
                                      setRejectReason(e.target.value)
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-green-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              onClick={handleReject}
                              disabled={!rejectReason || rejecting}
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              {rejecting ? "Rejecting..." : "Reject"}
                            </button>
                            <button
                              onClick={() => setShowRejectModal(false)}
                              disabled={rejecting}
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Product not found</div>
        )}
        {/* Success and Error Messages */}
        {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AdminProductDetails;
