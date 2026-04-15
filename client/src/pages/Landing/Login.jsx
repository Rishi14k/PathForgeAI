import { ArrowRight, Compass, Mail, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { googleLoginThunk, loginThunk } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      navigate("/dashboard");
      toast.success("Welcome back, Voyager!");
    } catch (error) {
      toast.error(error || "Invalid credentials");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#05060A] p-6 selection:bg-[#9F67FF]/30">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-full max-w-[800px] rounded-full bg-[#9F67FF]/10 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="mb-10 flex flex-col items-center gap-4 group">
         
          <span className="text-2xl font-black tracking-tighter text-white">
            SkillOrbit
          </span>
        </Link>

        {/* Login Card */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0E1117]/60 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Ready to resume your learning evolution?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 px-11 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-[#9F67FF]/50 focus:outline-none focus:ring-4 focus:ring-[#9F67FF]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Password
                </label>
                {/* <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-[#9F67FF] hover:underline uppercase tracking-tighter">
                  Forgot?
                </Link> */}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 px-11 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-[#9F67FF]/50 focus:outline-none focus:ring-4 focus:ring-[#9F67FF]/10 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#9F67FF] font-bold text-white shadow-lg shadow-[#9F67FF]/20 transition-all hover:bg-[#8B5CF6] disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Sign In"}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
              <span className="bg-[#0E1117] px-4 text-gray-600 font-bold">Or enter the orbit with</span>
            </div>
          </div>

          {/* Google Login */}
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
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          New to the system?{" "}
          <Link
            to="/signup"
            className="text-[#9F67FF] hover:text-[#B488FF] font-bold transition-colors underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;