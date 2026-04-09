const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      select: false,
      // This function makes password required ONLY if NOT using Google
      required: function () {
        return this.authProvider !== "google";
      },
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    authProvider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    planType: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    roadmapGenerated: {
      type: Number,
      default: 0,
    },
    roadmapResetDate: {
      type: Date,
      default: Date.now,
    },
    discoveryGenerated:{
      type:Number,
      default:0
    },
    streak: {
      currentStreak: {
        type: Number,
        default: 0,
      },
      longestStreak: {
        type: Number,
        default: 0,
      },
      lastActivityDate: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
