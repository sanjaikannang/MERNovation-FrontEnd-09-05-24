import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import Admin from "./Admin"
import Farmer from "./Farmer";
import Buyer from "./Buyer";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/farmer" element={<Farmer />} /> 
        <Route path="/buyer" element={<Buyer />} /> 
      </Routes>
    </>
  );
};

export default App;
