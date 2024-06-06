import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const TermsConditions = () => {

  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };

  const handleAbout = () => {
    Navigate("/about");
  };

  return (
<>
     {/* NavBar Section  */}
     <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
     <div className="text-2xl text-grey font-bold">
       <span className=" text-green-600 font-bold">Harvest</span>
       Hub
     </div>
     <div className="flex items-center space-x-3">
       <button
         onClick={handleAbout}
         className="text-white font-medium px-2 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
       >
         About
       </button>
       <button
         onClick={handleLogin}
         className="text-white font-medium px-2 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
       >
         Login
       </button>
       <button
         onClick={handleLogin}
         className="text-white font-medium px-2 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
       >
         Signup
       </button>
     </div>
   </nav>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
        Terms and Conditions
      </h1>
      <div className="p-6 text-gray-800">
        <p>
          Welcome to Harvest Hub! These terms and conditions outline the rules
          and regulations for the use of our website and services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">1. Introduction</h2>
        <p>
          By accessing this website, you accept these terms and conditions in
          full. If you disagree with any part of these terms and conditions, do
          not use our website or services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
          2. Intellectual Property Rights
        </h2>
        <p>
          Unless otherwise stated, Harvest Hub and/or its licensors own the
          intellectual property rights for all material on this website. All
          intellectual property rights are reserved.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
          3. User Responsibilities
        </h2>
        <p>
          As a user of Harvest Hub, you agree to use our services responsibly
          and for lawful purposes only. You must not:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>
            Republish material from our website without proper attribution.
          </li>
          <li>Sell or rent material from our website.</li>
          <li>
            Reproduce, duplicate, or copy material from our website for
            commercial purposes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">4. User Content</h2>
        <p>
          In these terms and conditions, “User Content” means any material
          (including without limitation text, images, audio material, video
          material, and audio-visual material) that you submit to our website
          for any purpose.
        </p>
        <p>
          You grant to Harvest Hub a worldwide, irrevocable, non-exclusive,
          royalty-free license to use, reproduce, adapt, publish, translate and
          distribute your user content in any existing or future media.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
          5. Product Listings and Transactions
        </h2>
        <p>
          Harvest Hub provides a platform for sellers (farmers) to list their
          products and for buyers to purchase these products. Harvest Hub is not
          directly involved in the transactions between buyers and sellers.
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>
            Sellers are responsible for ensuring that product listings are
            accurate and comply with all applicable laws and regulations.
          </li>
          <li>
            Buyers are responsible for reading product descriptions and
            understanding the terms of the sale before making a purchase.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
          6. Limitation of Liability
        </h2>
        <p>
          Harvest Hub will not be liable for any indirect, special or
          consequential loss or damage arising out of or in connection with the
          use of our website or services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">7. Indemnification</h2>
        <p>
          You agree to indemnify Harvest Hub and its affiliates, employees, and
          agents from and against any and all claims, liabilities, damages,
          losses, and expenses arising from your use of our website and services
          or your violation of these terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
          8. Changes to These Terms
        </h2>
        <p>
          Harvest Hub reserves the right to revise these terms and conditions at
          any time. By using this website, you are expected to review these
          terms regularly to ensure you understand all terms and conditions
          governing the use of this website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">9. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of India, Tamil Nadu, and you irrevocably submit to the
          exclusive jurisdiction of the courts in that State or location.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-500">
          10. Contact Information
        </h2>
        <p>
          If you have any questions about these terms and conditions, please
          contact us at{" "}
          <span className="text-blue-500 underline"> harvesthub@gmail.com</span>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TermsConditions;
