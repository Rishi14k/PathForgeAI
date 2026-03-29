import { ArrowRight, Compass } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleLoginThunk, loginThunk } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setloading] = useState(false)
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await dispatch(loginThunk({ email, password })).unwrap();
      navigate("/dashboard");
      toast.success("Logged in successfully!");
    } catch (error) {
      console.log("Login error", error);
      toast.error(error || "Something went wrong!");
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/dashboard");
  // }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0b0f] p-4">
      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#4F7CFF]/15 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6366f1]">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-[#f8fafc]">
            PathForge AI
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-xl border border-[#334155] bg-[#0f172a]/80 p-8 backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#f8fafc]">Welcome back</h1>
            <p className="mt-1 text-sm text-[#94a3b8]">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#f8fafc]">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
              h-11
              w-full px-2 py-4 rounded-xl
              border-[#334155]
              bg-[#020617]
              text-[#f8fafc]
              focus-visible:ring-[#6366f1]
            "
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#f8fafc]">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
              h-11
              w-full px-2 py-4 rounded-xl
              border-[#334155]
              bg-[#020617]
              text-[#f8fafc]
              focus-visible:ring-[#6366f1]
            "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
            h-11 w-full gap-2
            bg-[#6366f1]
            text-white
            hover:bg-[#5458ee]
            flex justify-center items-center rounded-2xl
          "
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#334155]" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f172a] px-2 text-[#94a3b8]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <div>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const idToken = credentialResponse.credential;

                dispatch(googleLoginThunk(idToken));
              }}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>
        </div>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-[#94a3b8]">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#6366f1] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
