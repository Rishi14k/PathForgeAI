import React from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap, ShieldCheck, Infinity as InfinityIcon, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { startPayment } from "../services/paymentService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PricingPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleProtectedAction = (actionCallback)=>{
     if(!token){
      navigate('/login')
      return
    }
    actionCallback()
  }

  const plans = [
    {
      name: "Explorer",
      price: "₹0",
      duration: "Forever",
      description: "Get a taste of AI-guided learning.",
      features: ["1 AI Roadmap", "2 Career Discoveries", "Standard Generation Speed", "Community Support"],
      button: "Get Started",
      highlight: false,
      color: "gray",
      action: () => handleProtectedAction(() => navigate("/dashboard")),
    },
    {
      name: "Pro Learner",
      price: "₹399",
      duration: "3 Months",
      description: "Our most popular path for serious students.",
      features: [
        "Unlimited AI Roadmaps",
        "Unlimited Career Discoveries",
        "Priority AI Engine (2x Faster)",
        "Advanced Progress Tracking",
        "Beta access to New Tools",
      ],
      button: "Upgrade to Pro",
      highlight: true,
      color: "violet",
      action: () => handleProtectedAction(() => startPayment(token)),
    },
    {
      name: "Lifetime",
      price: "₹999",
      duration: "One-time",
      description: "Own your future with a single investment.",
      features: [
        "Everything in Pro",
        "Lifetime Feature Updates",
        "Personalized AI Mentor",
        "Exclusive Discord Badge",
        "Early Access to Mobile App",
      ],
      button: "Go Lifetime",
      highlight: false,
      color: "gold",
      action: () => handleProtectedAction(() => startPayment(token)),
    },
  ];

  return (
    <div id="pricing" className="min-h-screen text-white selection:bg-violet-500/30 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-violet-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold mb-6 tracking-widest uppercase"
          >
            <Zap size={14} fill="currentColor" /> Simple Pricing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Invest in your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Evolution.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Whether you're just exploring or ready to master your craft, we have a plan that grows with you.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative group rounded-[2.5rem] p-1 border transition-all duration-500 ${
                plan.highlight 
                ? "bg-gradient-to-b from-violet-500 to-indigo-600 scale-105 z-20 shadow-2xl shadow-violet-500/20" 
                : "bg-white/10 border-white/5 hover:bg-white/15"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-white/20 shadow-lg">
                  <Sparkles size={14} /> RECOMMENDED
                </div>
              )}

              <div className="bg-[#0b0f1a] rounded-[2.3rem] p-8 h-full flex flex-col">
                <div className="mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.color === 'gold' ? 'text-amber-400' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-gray-500 font-medium">/ {plan.duration}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div className={`mt-1 p-0.5 rounded-full ${plan.highlight ? 'bg-violet-500/20' : 'bg-white/5'}`}>
                        <Check size={14} className={plan.highlight ? 'text-violet-400' : 'text-gray-500'} />
                      </div>
                      <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={plan.action}
                  className={`relative overflow-hidden w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group/btn ${
                    plan.highlight
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-violet-600/30"
                      : plan.color === 'gold'
                      ? "bg-amber-500 text-black hover:bg-amber-400"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {plan.name === "Lifetime" ? <InfinityIcon size={18} /> : plan.highlight ? <Crown size={18} /> : null}
                  {plan.button}
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ/Trust Footer */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16"
        >
          {[
            { icon: ShieldCheck, title: "Secure Payment", desc: "Encrypted transactions via Razorpay." },
            { icon: Sparkles, title: "Fresh Content", desc: "AI models updated weekly with new data." },
            { icon: InfinityIcon, title: "No Limits", desc: "Pro users get zero throttled generations." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-violet-400">
                <item.icon size={24} />
              </div>
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;