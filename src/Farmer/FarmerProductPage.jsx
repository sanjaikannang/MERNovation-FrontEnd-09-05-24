import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ProductUpload from "./ProductUpload";
import FarmerChatting from "./FarmerChatting";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const FarmerProductPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/product/get-login-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProducts([]);
          setFilteredProducts([]);
        } else {
          setError("Failed to fetch user products");
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const filterProducts = (filterType) => {
    if (filterType === "all") {
      setFilteredProducts(products);
    } else if (filterType === "rejected") {
      const rejectedProducts = products.filter(
        (product) => product.status === "rejected"
      );
      setFilteredProducts(rejectedProducts);
    } else {
      const filtered = products.filter((product) => {
        if (filterType === "accepted") {
          return product.status === "accepted";
        } else if (filterType === "pending") {
          return product.status === "pending";
        } else if (filterType === "biddingEnded") {
          return product.biddingStatus === "Bidding Ended";
        } else if (filterType === "biddingActive") {
          return product.biddingStatus === "Active";
        }
        return false;
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      {/* NavBar Section */}
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
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="text-white font-medium px-1 py-1 rounded-full bg-green-500 shadow-2xl hover:bg-green-600"
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
      </nav>
      <br />
      <br />

      {/* Upload Product Section */}
      <section className="relative z-10 overflow-hidden bg-green-100 py-24 px-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-left">
                <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-gray-700">
                {t("f-title1")} {" "}
                  <span className="text-green-500">{t("f-title2")}</span>
                </h1>
                <br />
                <p className="mb-6 text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed text-gray-700">
                {t("f-desc")}                  
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <ProductUpload />
            </div>
          </div>
        </div>
        <FarmerChatting />
      </section>
      <br />
      <br />

      {/* Products Section */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <h1 className="text-5xl font-semibold mb-8">{t("f-title3")}</h1>
        </div>
        <br />
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-4 justify-center">
            <button
              onClick={() => filterProducts("all")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
              {t("f-filter1")}
            </button>
            <button
              onClick={() => filterProducts("accepted")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
               {t("f-filter2")}
            </button>
            <button
              onClick={() => filterProducts("rejected")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
               {t("f-filter3")}
            </button>
            <button
              onClick={() => filterProducts("pending")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
               {t("f-filter4")}
            </button>
            <button
              onClick={() => filterProducts("biddingEnded")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
               {t("f-filter5")}
            </button>
            <button
              onClick={() => filterProducts("biddingActive")}
              className="text-white font-medium px-2 py-1 rounded-2xl bg-green-500 shadow-2xl hover:bg-green-600"
            >
               {t("f-filter6")}
            </button>
          </div>
        </div>
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mx-auto max-w-7xl p-5">
            {filteredProducts
              .slice(0)
              .reverse()
              .map((product) => (
                <div
                  key={product._id}
                  className="shadow-md overflow-hidden relative rounded-md"
                >
                  <img
                    className="w-full h-60 object-cover object-center"
                    src={product.images[0]}
                    alt={product.name}
                  />
                  {product.quality === "Verified" && (
                    <img
                      src="/—Pngtree—verified stamp vector_9168723.png"
                      alt="Verified Stamp"
                      className="absolute top-0 right-0 h-20 w-20 shadow-3xl"
                    />
                  )}
                  <div className="p-4 bg-white">
                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                      {product.name}
                    </h2>
                    <div className="flex flex-col mb-5">
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded mb-2">
                       {t("f-product-status")} - {product.status}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                      {t("f-bidding-status")} - {product.biddingStatus}
                      </span>
                    </div>
                    <Link
                      to={`/farmer-product-details/${product._id}`}
                      className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                      {t("f-view-product")} 
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="flex flex-col justify-center items-center font-medium text-xl">
            No products found.
          </p>
        )}
        <br />
      </div>
      {/* Footer Section */}
      <Footer/>
    </>
  );
};

export default FarmerProductPage;
