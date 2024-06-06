import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const Navigate = useNavigate();

    const handleLogin = () => {
      Navigate("/login");
    };
  

  return (
    <>
      {" "}
      {/* Footer Section  */}
      <footer className="w-full bg-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="py-8 text-center">
              <h3 className="font-manrope text-4xl text-green-600 font-bold mb-4">
                Empower your agricultural business today!
              </h3>
              <p className="text-gray-500">
                Join HarvestHub and connect directly with buyers or sellers.
                Maximize your profits and streamline your transactions with our
                digital platform.
              </p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <a
                onClick={() => Navigate("/login")}
                className="text-lg bg-green-500 rounded-full shadow-md py-2 px-6 flex items-center gap-2 transition-all duration-500 text-white hover:bg-green-600"
              >
                Get started
              </a>
            </div>
          </div>
          <div className="py-7 border-t border-gray-200">
            <div className="flex items-center justify-center flex-col gap-7 lg:justify-between lg:flex-row">
              <span className="text-sm text-gray-500">
                © HarvestHub 2024, All rights reserved.
              </span>
              <ul className="flex items-center text-sm text-gray-500 gap-9">
                <li>
                  <a
                     onClick={() => Navigate("/terms-conditions")}>Terms & Conditions</a>
                </li>
                <li>
                  <a  onClick={() => Navigate("/privacy-policy")}>Privacy Policy</a>
                </li>
                <li>
                  <a  onClick={() => Navigate("/contact-us")}>Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
