import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyerPayment = ({ productId, amount, token }) => {
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const response = await fetch("http://localhost:4000/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include Authorization header with token
        },
        body: JSON.stringify({
          productId,
          amount,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const options = {
          key: 'rzp_test_kylAakW38uREQf', // Replace with your actual Razorpay key
          amount: data.amount,
          currency: data.currency,
          name: 'Harvest Hub',
          description: 'Payment for Product',
          order_id: data.id,
          handler: async (response) => {
            try {
              const verifyResponse = await fetch("http://localhost:4000/payment/verify-payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Include Authorization header with token
                },
                body: JSON.stringify(response),
              });
              const verifyData = await verifyResponse.json();
              if (verifyResponse.ok) {
                toast.success(verifyData.message);
                // Handle success scenario (e.g., redirect to success page)
              } else {
                toast.error(verifyData.message);
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              toast.error("Error verifying payment");
            }
          },
          prefill: {
            name: 'Your Name',
            email: 'your@email.com',
          },
          theme: {
            color: '#22C55E',
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.error(data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        disabled={paymentLoading}
      >
        {paymentLoading ? "Processing Payment..." : "Pay Now"}
      </button>
    </div>
  );
};

export default BuyerPayment;
