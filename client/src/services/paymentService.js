import axios from "axios";
import { toast } from "react-toastify";

export const startPayment = async (token) => {
  try {
    // 1️⃣ Create order
    const { data: order } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2️⃣ Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "AI Roadmap",
      description: "Upgrade to Pro",

      handler: async function (response) {
        await verifyPayment(response, token);
      },

      theme: {
        color: "#7c3aed",
      },
    };

    // 3️⃣ Open checkout
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.error("Payment initialization failed");
  }
};

const verifyPayment = async (paymentData, token) => {
  try {
    await axios.post(
      "http://localhost:5000/api/payment/verify",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("🎉 Subscription Activated!");

    window.location.reload();
    window.location.href = "/dashboard";
  } catch (error) {
    toast.error("Payment verification failed");
  }
};