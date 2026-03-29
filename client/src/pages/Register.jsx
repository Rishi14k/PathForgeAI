import { ArrowRight, CheckCircle2, Compass } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  googleLoginThunk,
  registerThunk,
  resendOtpThunk,
  verifyOtpThunk,
} from "../redux/features/auth/authSlice";
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
  const { isAuthenticated,otpSent, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        registerThunk({
          name,
          email,
          password,
        }),
      ).unwrap();

      toast.success("Account created! Please verify your email.");
    } catch (err) {
      const errorMessage =
        typeof err === "string" ? err : "Something went wrong";
      toast.error(errorMessage);
      console.error("Register error:", err);
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

    dispatch(
      verifyOtpThunk({
        email,
        otp,
      }),
    );
    navigate("/login");
  };

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/dashboard")
    }
  },[])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0b0f] p-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#4F7CFF]/15 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4F7CFF]">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-[#FAFAFA]">
            PathForge AI
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-xl border border-[#2A2E39]/60 bg-[#0f172a]/80 p-8 backdrop-blur-sm">
          {step === "form" ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-[#FAFAFA]">
                  Create your account
                </h1>
                <p className="mt-1 text-sm text-[#A1A1AA]">
                  Start your learning journey today
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#FAFAFA]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    className="h-11 w-full px-2 py-4 border-[#2A2E39]/60 bg-[#020617] text-[#FAFAFA] focus-visible:ring-[#4F7dFF] rounded-xl"
                    placeholder="Hi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5  block text-sm font-medium text-[#FAFAFA]">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full px-2 py-4 rounded-xl border-[#2A2E39]/60 bg-[#020617] text-[#FAFAFA] focus-visible:ring-[#4F7CFF]"
                    placeholder="abc@gmail.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#FAFAFA]">
                    Password
                  </label>

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full px-2 py-4 rounded-xl border-[#2A2E39]/60 bg-[#020617] text-[#FAFAFA] focus-visible:ring-[#4F7CFF]"
                    placeholder="* * * * * * * *"
                  />

                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Must be at least 8 characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="flex h-11 w-full rounded-2xl items-center justify-center gap-2 rounded-md bg-[#4F7CFF] text-white transition hover:bg-[#4F7CFF]/90"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2A2E39]/60" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className=" px-2 text-[#A1A1AA]">Or continue with</span>
                </div>
              </div>

              {/* Google */}

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
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4F7CFF]/10">
                  <CheckCircle2 className="h-6 w-6 text-[#4F7CFF]" />
                </div>

                <h1 className="text-2xl font-bold text-[#FAFAFA]">
                  Verify your email
                </h1>

                <p className="mt-1 text-sm text-[#A1A1AA]">
                  We sent a code to{" "}
                  <span className="font-medium text-[#FAFAFA]">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <input
                  type="text"
                  required
                  className="h-11 w-full px-2 py-4 rounded-xl border-[#2A2E39]/60 bg-[#020617] text-center text-lg tracking-widest text-[#FAFAFA] focus-visible:ring-[#4F7CFF]"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#4F7CFF] text-white transition hover:bg-[#4F7CFF]/90"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-[#A1A1AA]">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className={`font-medium ${isResending ? "text-gray-400" : "text-[#4F7CFF] hover:underline cursor-pointer"}`}
                >
                  {isResending ? "Sending..." : "Resend"}
                </button>
              </p>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-[#A1A1AA]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#4F7CFF] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
