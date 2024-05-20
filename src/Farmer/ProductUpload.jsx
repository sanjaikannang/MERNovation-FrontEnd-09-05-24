import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";

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

const ProductUpload = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
          setError("Please fill in all fields and upload exactly 3 images.");
          return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("startingPrice", values.startingPrice);
        formData.append("startingDate", values.startingDate);
        formData.append("endingDate", values.endingDate);
        formData.append("bidStartTime", values.bidStartTime);
        formData.append("bidEndTime", values.bidEndTime);
        formData.append("quantity", values.quantity);

        values.images.forEach((image) => {
          formData.append("photos", image);
        });

        const res = await axios.post(
          "https://sanjai-kannan-g-mernovation-backend.onrender.com/product/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 201 && res.data && res.data.product) {
          setSuccessMessage("Product uploaded successfully!!");
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
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
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
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
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
                          <div className="mt-4">
                            <input
                              type="text"
                              placeholder="Name of the Product"
                              className="w-full border border-gray-300 rounded-md p-2"
                              {...formik.getFieldProps("name")}
                              />
                              </div>
                              <div className="mt-4">
                                <input
                                  type="text"
                                  placeholder="Description of the Product"
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  {...formik.getFieldProps("description")}
                                />
                              </div>
                              <div className="mt-4">
                                <input
                                  type="number"
                                  placeholder="Starting Price of the Product Per Kg"
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  {...formik.getFieldProps("startingPrice")}
                                />
                              </div>
                              <div className="mt-4">
                                <label>Bidding Starting Time</label>
                                <input
                                  type="datetime-local"
                                  placeholder="Bid Start Time"
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  {...formik.getFieldProps("bidStartTime")}
                                />
                              </div>
                              <div className="mt-4">
                                <label>Bidding Ending Time</label>
                                <input
                                  type="datetime-local"
                                  placeholder="Bid End Time"
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  {...formik.getFieldProps("bidEndTime")}
                                />
                              </div>
                              <div className="mt-4">
                                <label>Starting Date</label>
                                <input
                                  type="date"
                                  placeholder="Starting Date of the Product"
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  {...formik.getFieldProps("startingDate")}
                                />
                              </div>
                              <div className="mt-4">
                                <label>Ending Date</label>
                                <input
                                  type="date"
                                  placeholder="Ending Date of the Product"
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  {...formik.getFieldProps("endingDate")}
                                />
                              </div>
                              <div className="mt-4">
                                <input
                                  type="number"
                                  placeholder="Quantity of the Product In Kg"
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  {...formik.getFieldProps("quantity")}
                                />
                              </div>
                              <FileInput form={formik} />
                              {successMessage && (
                                <p className="mt-4 text-green-600">
                                  {successMessage}
                                </p>
                              )}
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
    
