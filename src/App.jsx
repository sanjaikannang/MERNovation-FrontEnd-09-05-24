import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
// Farmer Imports
import FarmerProductPage from "./Farmer/FarmerProductPage";
import FarmerProfilePageProductDetails from "./Farmer/FarmerProfilePageProductDetails";
// Admin Imports
import AdminProductPage from "./Admin/AdminProductPage";
import AdminProductDetails from "./Admin/AdminProductDetails";
// Buyer Imports
import BuyerProductPage from "./Buyer/BuyerProductPage";
import BuyerProductDetailsPage from "./Buyer/BuyerProductDetailsPage";
// Others
import About from "./About"
import TermsConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import ContactUs from "./ContactUs";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* -----------------FARMER---------------- */}       
        <Route path="/farmer" element={<FarmerProductPage/>} />
        <Route path="/farmer-product-details/:productId" element={<FarmerProfilePageProductDetails/>} />       
        {/* -----------------ADMIN---------------- */}    
        <Route path="/admin" element={<AdminProductPage />} /> 
        <Route path="/admin-product-details/:productId" element={<AdminProductDetails/>} />                  
         {/* -----------------Buyer---------------- */}    
         <Route path="/buyer" element={<BuyerProductPage />} /> 
        <Route path="/buyer-product-details/:productId" element={< BuyerProductDetailsPage/>} />      
         {/* -----------------OTHERS---------------- */}    
         <Route path="/terms-conditions" element={< TermsConditions/>} />      
         <Route path="/privacy-policy" element={< PrivacyPolicy/>} />      
         <Route path="/contact-us" element={< ContactUs/>} />      
      </Routes>
    </>
  );
};

export default App;
