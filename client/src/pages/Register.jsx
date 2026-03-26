import { ArrowRight, CheckCircle2, Compass } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

   const [step, setStep] = useState("form")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setIsLoading(true)

    setTimeout(()=>{
      setIsLoading(false)
      setStep("otp")
    },1000)
  }

  const handleVerifyOtp = async(e)=>{
    e.preventDefault()
    setIsLoading(true)

    setTimeout(()=>{
      window.location.href = '/dashboard'
    },1000)
  }

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
                className="h-11 w-full px-2 py-4 border-[#2A2E39]/60 bg-[#020617] text-[#FAFAFA] focus-visible:ring-[#4F7dFF] rounded-xl" placeholder='Hi'
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5  block text-sm font-medium text-[#FAFAFA]">
                Email
              </label>

              <input
                className="h-11 w-full px-2 py-4 rounded-xl border-[#2A2E39]/60 bg-[#020617] text-[#FAFAFA] focus-visible:ring-[#4F7CFF]"
                placeholder='abc@gmail.com'
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#FAFAFA]">
                Password
              </label>

              <input
                className="h-11 w-full px-2 py-4 rounded-xl border-[#2A2E39]/60 bg-[#020617] text-[#FAFAFA] focus-visible:ring-[#4F7CFF]"
                placeholder='* * * * * * * *'
              />

              <p className="mt-1 text-xs text-[#A1A1AA]">
                Must be at least 8 characters
              </p>
            </div>

            <button
              type="submit"
              className="flex h-11 w-full rounded-2xl items-center justify-center gap-2 rounded-md bg-[#4F7CFF] text-white transition hover:bg-[#4F7CFF]/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2A2E39]/60" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className=" px-2 text-[#A1A1AA]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google */}
          <button
        variant="outline"
        className="
          h-11 w-full
          border
          border-[#2A2E39]/60
          bg-transparent
          text-[#f8fafc]
          hover:bg-[#1E2128]
          flex justify-center items-center rounded-2xl gap-2
        "
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>

        Continue with Google
      </button>
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
              <span className="font-medium text-[#FAFAFA]">
                {email}
              </span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              className="h-11 w-full px-2 py-4 rounded-xl border-[#2A2E39]/60 bg-[#020617] text-center text-lg tracking-widest text-[#FAFAFA] focus-visible:ring-[#4F7CFF]"
              placeholder='Enter OTP'
            />

            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#4F7CFF] text-white transition hover:bg-[#4F7CFF]/90"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#A1A1AA]">
            Didn't receive the code?{" "}
            <button className="font-medium text-[#4F7CFF] hover:underline">
              Resend
            </button>
          </p>
        </>
      )}
    </div>

    <p className="mt-6 text-center text-sm text-[#A1A1AA]">
      Already have an account?{" "}
      <Link to="/login" className="font-medium text-[#4F7CFF] hover:underline">
        Sign in
      </Link>
    </p>

  </div>
</div>
  )
}

export default Register