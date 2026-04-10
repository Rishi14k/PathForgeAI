import { ArrowRight, CheckCircle2, Compass, Mail, Lock, User, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  googleLoginThunk,
  registerThunk,
  resendOtpThunk,
  verifyOtpThunk,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [step, setStep] = useState("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, otpSent, loading } = useSelector(
    (state) => state.auth,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        registerThunk({ name, email, password }),
      ).unwrap();
      toast.success("Account created! Please verify your email.");
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const [isResending, setIsResending] = useState(false);

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await dispatch(resendOtpThunk({ email })).unwrap();
      toast.success("New OTP sent!");
    } catch (err) {
      toast.error(err || "Failed to resend");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (otpSent) {
      setStep("otp");
    }
  }, [otpSent]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    dispatch(verifyOtpThunk({ email, otp }));
    navigate("/login");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#05060A] p-6 selection:bg-[#9F67FF]/30">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-full max-w-[800px] rounded-full bg-[#9F67FF]/10 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="mb-10 flex flex-col items-center gap-4 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9F67FF] to-[#7C3AED] shadow-lg shadow-[#9F67FF]/20"
          >
            <Compass className="h-8 w-8 text-white" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter text-white">
            SkillOrbit
          </span>
        </Link>

        {/* Auth Card */}
        <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-[#0E1117]/60 p-8 shadow-2xl backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div
                key="register-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-black text-white tracking-tight">Create Account</h1>
                  <p className="mt-2 text-sm text-gray-500 font-medium">
                    Your learning evolution starts here.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <input
                        type="text"
                        required
                        className="w-full rounded-2xl border border-white/5 bg-white/5 px-11 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-[#9F67FF]/50 focus:outline-none focus:ring-4 focus:ring-[#9F67FF]/10 transition-all"
                        placeholder="Your good name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <input
                        type="email"
                        required
                        className="w-full rounded-2xl border border-white/5 bg-white/5 px-11 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-[#9F67FF]/50 focus:outline-none focus:ring-4 focus:ring-[#9F67FF]/10 transition-all"
                        placeholder="voyager@orbit.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <input
                        type="password"
                        required
                        className="w-full rounded-2xl border border-white/5 bg-white/5 px-11 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-[#9F67FF]/50 focus:outline-none focus:ring-4 focus:ring-[#9F67FF]/10 transition-all"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#9F67FF] font-bold text-white shadow-lg shadow-[#9F67FF]/20 transition-all hover:bg-[#8B5CF6] disabled:opacity-50"
                  >
                    {loading ? "Initializing..." : "Begin Journey"}
                    {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  </motion.button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]"><span className="bg-[#0E1117] px-4 text-gray-600 font-bold">Or sync with</span></div>
                </div>

                <div className="flex justify-center">
                  <div className="scale-110">
                    <GoogleLogin
                      onSuccess={(res) => dispatch(googleLoginThunk(res.credential))}
                      onError={() => console.log("Google Login Failed")}
                      theme="filled_black"
                      shape="circle"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#9F67FF]/10 text-[#9F67FF]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h1 className="text-2xl font-black text-white tracking-tight">Verify Identity</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Code sent to <span className="text-[#9F67FF] font-bold">{email}</span>
                </p>

                <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 text-center text-2xl font-black tracking-[0.5em] text-white focus:border-[#9F67FF]/50 focus:outline-none transition-all"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#9F67FF] font-bold text-white shadow-lg shadow-[#9F67FF]/20 transition-all hover:bg-[#8B5CF6]"
                  >
                    {loading ? "Authenticating..." : "Verify & Launch"}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </form>

                <div className="mt-8">
                  <button
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#9F67FF] transition-colors"
                  >
                    <RefreshCcw className={`h-3 w-3 ${isResending ? 'animate-spin' : ''}`} />
                    {isResending ? "Resending..." : "Resend Code"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Already part of the orbit?{" "}
          <Link to="/login" className="text-[#9F67FF] hover:text-[#B488FF] font-bold transition-colors underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;