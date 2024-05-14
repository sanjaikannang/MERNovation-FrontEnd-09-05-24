import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import Buyer from "./Buyer/Buyer";
import Farmer from "./Farmer/ProductPage";
import ProductDetails from "./Farmer/ProductDetails";
import AdminProductPage from "./Admin/AdminProductPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminProductPage />} /> 
        <Route path="/farmer" element={<Farmer />} /> 
        <Route path="/buyer" element={<Buyer />} /> 
        <Route path="/product/:productId" element={<ProductDetails/>} />         
      </Routes>
    </>
  );
};

export default App;
