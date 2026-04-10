const razorpay = require('../config/razorpay')
const crypto = require('crypto');
const User = require('../models/User');

const createOrder = async (req, res) => {
  const options = {
    amount: 39900, // ₹399
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options)

  res.json(order)
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  // ✅ PAYMENT SUCCESS → Upgrade User
  await User.findByIdAndUpdate(req.user.userId, {
    planType: "paid",
  });

  res.json({ success: true });
};

module.exports = {createOrder,verifyPayment}
