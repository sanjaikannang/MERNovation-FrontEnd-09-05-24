import React, { useState } from 'react';
import axios from 'axios';
import { useFormik, useFormikContext } from 'formik'; // Import useFormik and useFormikContext

const FileInput = ({ field, form, ...props }) => {
  const { setFieldValue } = form; // Destructure setFieldValue from form instead of useFormikContext

  const handleChange = (e) => {
    const files = e.currentTarget.files;

    if (files.length > 3) {
      // If more than 3 files are selected, slice the array to get only the first 3 files
      const slicedFiles = Array.from(files).slice(0, 3);
      setFieldValue(field.name, slicedFiles);
    } else {
      setFieldValue(field.name, files);
    }
  };

  return (
    <input
      {...field}
      {...props}
      type="file"
      onChange={handleChange}
      multiple
    />
  );
};

const ProductUpload = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use useFormik hook to create the form
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      startingPrice: '',
      startingDate: '',
      endingDate: '',
      quantity: '',
      images: [], // Initial value for images
    },
    onSubmit: async (values) => {
      try {
        // Validation
        if (!values.name || !values.description || !values.startingPrice || !values.startingDate || !values.endingDate || !values.quantity || values.images.length !== 3) {
          setError('Please fill in all fields and upload exactly 3 images.');
          return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('startingPrice', values.startingPrice);
        formData.append('startingDate', values.startingDate);
        formData.append('endingDate', values.endingDate);
        formData.append('quantity', values.quantity);

        // Append each image with the correct key
        values.images.forEach((image, index) => {
          formData.append(`photos[${index}]`, image);
        });

        const res = await axios.post('http://localhost:4000/product/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.status === 201) {
          console.log('Product uploaded successfully');
          setShowModal(false);
          formik.resetForm(); // Reset form after successful submission
          alert('Product uploaded successfully');
        }
      } catch (error) {
        console.error('Error uploading product:', error.response.data);
        setError(error.response.data.message || 'Failed to upload product');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600 flex justify-between items-center"
      >
        Upload Product
      </button>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={formik.handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Product</h3>
                      <div className="mt-2">
                        <div className="mt-4">
                          <input type="text" placeholder="Name" className="w-full border border-gray-300 rounded-md p-2" {...formik.getFieldProps('name')} />
                        </div>
                        <div className="mt-4">
                          <input type="text" placeholder="Description" className="w-full border border-gray-300 rounded-md p-2" {...formik.getFieldProps('description')} />
                        </div>
                        <div className="mt-4">
                          <input type="number" placeholder="Starting Price" className="w-full border border-gray-300 rounded-md p-2" {...formik.getFieldProps('startingPrice')} />
                        </div>
                        <div className="mt-4">
                          <input type="date" placeholder="Starting Date" className="w-full border border-gray-300 rounded-md p-2" {...formik.getFieldProps('startingDate')} />
                        </div>
                        <div className="mt-4">
                          <input type="date" placeholder="Ending Date" className="w-full border border-gray-300 rounded-md p-2" {...formik.getFieldProps('endingDate')} />
                        </div>
                        <div className="mt-4">
                          <input type="number" placeholder="Quantity" className="w-full border border-gray-300 rounded-md p-2" {...formik.getFieldProps('quantity')} />
                        </div>
                        <div className="mt-4">
                          <FileInput name="images" form={formik} />
                        </div>
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    {loading ? 'Uploading...' : 'Upload'}
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
