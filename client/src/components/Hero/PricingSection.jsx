import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Explorer",
    price: "₹0",
    description: "Perfect for testing the waters",
    features: ["1 AI Roadmaps", "Basic Progress Tracking", "Community Resources", "Standard Support"],
    cta: "Start Learning",
    popular: false,
    icon: Zap,
    action:""
  },
  {
    name: "Pro Learner",
    price: "₹399",
    period: "/ 3 months",
    description: "For dedicated skill masters",
    features: [
      "Unlimited AI Roadmaps",
      "Priority AI Generation",
      "Advanced Analytics",
      "Unlimited Streak History",
      "Custom Resource Integration",
      "Priority Discord Support"
    ],
    cta: "Upgrade to Pro",
    popular: true,
    icon: Crown
  },
  {
    name: "Team",
    price: "₹999",
    period: "/ month",
    description: "For cohorts and organizations",
    features: [
      "Everything in Pro",
      "Bulk Roadmap Assigning",
      "Shared Team Workspace",
      "Member Analytics",
      "Admin Control Panel",
      "Dedicated Success Manager"
    ],
    cta: "Contact Sales",
    popular: false,
    icon: Users
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-32 bg-[#05060A] overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#9F67FF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#9F67FF] font-bold text-xs uppercase tracking-[0.2em] mb-4"
          >
            Flexible Investment
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight text-white md:text-6xl"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F67FF] to-[#C4B5FD]">Velocity</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-gray-400"
          >
            Transparent pricing with no hidden fees. Focus on your growth, we'll handle the roadmap.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-500 ${
                plan.popular 
                  ? "bg-[#0E1016] border-2 border-[#9F67FF] scale-105 z-10 shadow-[0_0_40px_rgba(159,103,255,0.15)]" 
                  : "bg-white/[0.02] border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#9F67FF] to-[#8B5CF6] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#9F67FF]/30">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`inline-flex p-3 rounded-2xl mb-6 ${plan.popular ? 'bg-[#9F67FF]/20 text-[#9F67FF]' : 'bg-white/5 text-gray-400'}`}>
                  <plan.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
              </div>

              <ul className="mb-10 space-y-4 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-400 group">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? 'bg-[#9F67FF]/20' : 'bg-white/10'}`}>
                      <Check className={`h-3 w-3 ${plan.popular ? 'text-[#9F67FF]' : 'text-gray-500'}`} />
                    </div>
                    <span className="group-hover:text-gray-200 transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup" className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all ${
                    plan.popular
                      ? "bg-[#9F67FF] text-white shadow-xl shadow-[#9F67FF]/20 hover:bg-[#8B5CF6]"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Detail */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-gray-500" />
            No credit card required to start free
            <span className="h-1 w-1 rounded-full bg-gray-500" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;