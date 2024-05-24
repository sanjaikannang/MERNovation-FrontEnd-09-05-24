import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
// Farmer Imports
import FarmerProductPage from "./Farmer/FarmerProductPage";
import FarmerProfilePage from "./Farmer/FarmerProfilePage";
import FarmerProductDetails from "./Farmer/FarmerProductDetails";
import FarmerProfilePageProductDetails from "./Farmer/FarmerProfilePageProductDetails";
// Admin Imports
import AdminProductPage from "./Admin/AdminProductPage";
import AdminProductDetails from "./Admin/AdminProductDetails";
// Admin Imports
import BuyerProductPage from "./Buyer/BuyerProductPage";
import BuyerProductDetailsPage from "./Buyer/BuyerProductDetailsPage";
import BuyerProfilePage from "./Buyer/BuyerProfilePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* -----------------FARMER---------------- */}       
        <Route path="/farmer" element={<FarmerProductPage />} />
        <Route path="/profile" element={<FarmerProfilePage/>} />
        <Route path="/farmer-product/:productId" element={<FarmerProductDetails/>} />  
        <Route path="/product-details/:productId" element={<FarmerProfilePageProductDetails/>} />                  
        {/* -----------------ADMIN---------------- */}    
        <Route path="/admin" element={<AdminProductPage />} /> 
        <Route path="/admin-product-details/:productId" element={<AdminProductDetails/>} />                  
         {/* -----------------Buyer---------------- */}    
         <Route path="/buyer" element={<BuyerProductPage />} /> 
         <Route path="/buyer-profile" element={<BuyerProfilePage/>} />
        <Route path="/buyer-product-details/:productId" element={< BuyerProductDetailsPage/>} />         
      </Routes>
    </>
  );
};

export default App;
