import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileInput = ({ form, ...props }) => {
  const { setFieldValue } = form;

  const handleChange = (e) => {
    const files = e.currentTarget.files;

    if (files.length > 3) {
      const slicedFiles = Array.from(files).slice(0, 3);
      setFieldValue("images", slicedFiles);
    } else {
      setFieldValue("images", Array.from(files));
    }
  };

  return (
    <div className="mt-4">
      <input {...props} type="file" onChange={handleChange} multiple />
      <p>Upload exactly 3 Images</p>
    </div>
  );
};

const subtractTime = (dateString, hours, minutes) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() - hours);
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString().slice(0, 16); // Returning in "YYYY-MM-DDTHH:MM" format for datetime-local input
};

const ProductUpload = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startingPrice: "",
      startingDate: "",
      endingDate: "",
      bidStartTime: "",
      bidEndTime: "",
      quantity: "",
      images: [],
    },
    onSubmit: async (values) => {
      try {
        setError(null);

        // Validate form values
        if (
          !values.name ||
          !values.description ||
          !values.startingPrice ||
          !values.startingDate ||
          !values.endingDate ||
          !values.bidStartTime ||
          !values.bidEndTime ||
          !values.quantity ||
          values.images.length !== 3
        ) {
          toast.error("Please fill in all fields and upload exactly 3 images.");
          return;
        }

        // Subtract 5 hours and 30 minutes from the bid start time
        const adjustedBidStartTime = subtractTime(values.bidStartTime, 5, 30);

        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("startingPrice", values.startingPrice);
        formData.append("startingDate", values.startingDate);
        formData.append("endingDate", values.endingDate);
        formData.append("bidStartTime", adjustedBidStartTime);
        formData.append("bidEndTime", values.bidEndTime);
        formData.append("quantity", values.quantity);

        values.images.forEach((image) => {
          formData.append("photos", image);
        });

        const res = await axios.post(
          "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 201 && res.data && res.data.product) {
          toast.success("Product uploaded successfully!");
          setShowModal(false);
          formik.resetForm();
        } else {
          throw new Error("Product upload failed");
        }
      } catch (error) {
        console.error("Error uploading product:", error.message);
        setError(
          error.response
            ? error.response.data.message || "Failed to upload product"
            : "Failed to upload product"
        );
        toast.error("Failed to upload product");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="text-white font-medium text-2xl px-12 py-3 rounded-md bg-green-500 shadow-2xl hover:bg-green-600 flex justify-between items-center"
      >
        <span>Upload Product</span>
      </button>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={formik.handleSubmit}>
                <div className="bg-green-50 flex justify-center">
                  <div className="px-4 pt-5 pb-4 sm:p-2 sm:pb-4 w-full">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <br />
                        <div className="flex justify-center">
                          <h3 className="text-xl leading-6 font-medium text-gray-900">
                            Upload Your Own Product In{" "}
                            <span className="text-green-600">
                              "HarvestHub!"
                            </span>
                          </h3>
                        </div>
                        <br />
                        <div className="mt-2">
                          <div className="gap-4">
                            <div className="col-span-1 mb-5">
                              <label>Name of The Product</label>
                              <input
                                type="text"
                                placeholder="Enter the product name, e.g., Organic Apples"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("name")}
                              />
                              <small className="text-gray-500">
                                Provide a descriptive name for your product.
                              </small>
                            </div>
                            <div className="col-span-1 mb-5">
                              <label>Description of The Product</label>
                              <input
                                type="text"
                                placeholder="Enter a brief description of the product"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("description")}
                              />
                              <small className="text-gray-500">
                                Include details like origin, quality, etc.
                              </small>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 mb-5">
                              <label>Price Per Kg / Lt</label>
                              <input
                                type="number"
                                placeholder="Enter the starting price per Kg"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("startingPrice")}
                              />
                              <small className="text-gray-500">
                                Set an initial price for bidding.
                              </small>
                            </div>
                            <div className="col-span-1">
                              <label>Quantity Per Kg / Lt</label>
                              <input
                                type="number"
                                placeholder="Enter the quantity available in Kg"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("quantity")}
                              />
                              <small className="text-gray-500">
                                Specify the total quantity available for sale.
                              </small>
                            </div>
                          </div>
                          <h3 className="mb-2 mt-5">
                            Bidding Starting Time and Bidding Ending Time Needs
                            to be Between Minimum 10 Minutes to Maximun 1 Hour !
                          </h3>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 mb-5">
                              <label>Bidding Starting Time</label>
                              <input
                                type="datetime-local"
                                placeholder="Select bid start time"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("bidStartTime")}
                              />
                              <small className="text-gray-500">
                                Set the date and time when bidding should start.
                              </small>
                            </div>
                            <div className="col-span-1">
                              <label>Bidding Ending Time</label>
                              <input
                                type="datetime-local"
                                placeholder="Select bid end time"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("bidEndTime")}
                              />
                              <small className="text-gray-500">
                                Set the date and time when bidding should end.
                              </small>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 mb-5">
                              <label>Bidding Starting Date</label>
                              <input
                                type="date"
                                placeholder="Select the starting date"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("startingDate")}
                              />
                              <small className="text-gray-500">
                                Enter the date when the product will be
                                available. Eg : (01/01/2024)
                              </small>
                            </div>
                            <div className="col-span-1">
                              <label>Bidding Ending Date</label>
                              <input
                                type="date"
                                placeholder="Select the ending date"
                                className="w-full border border-gray-300 rounded-md mt-2 p-2"
                                {...formik.getFieldProps("endingDate")}
                              />
                              <small className="text-gray-500">
                                Enter the date when the product listing ends. Eg
                                : (02/01/2024)
                              </small>
                            </div>
                          </div>
                          <FileInput form={formik} />
                          {error && (
                            <div className="mt-4 text-red-500">{error}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      </div>
                    ) : (
                      "Upload Product"
                    )}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductUpload;