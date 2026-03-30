import { Check } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "2 free Roadmap",
      "Basic AI Generation",
      "Progress Tracking",
      "Streak History"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For serious learners",
    features: [
      "10 Roadmaps",
      "Advanced AI Generation",
      "Detailed Analytics",
      "Unlimited Streak History",
      "Custom Resource Links",
      "Priority Support"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team Management",
      "Shared Roadmaps",
      "Team Analytics",
      "Admin Dashboard",
      "SSO Authentication"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 bg-[#0E0F14]">
  <div className="mx-auto max-w-7xl px-6">
    
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] md:text-4xl">
        Simple, transparent pricing
      </h2>

      <p className="mt-4 text-lg text-[#A1A1AA]">
        Choose the plan that fits your learning journey
      </p>
    </div>

    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative rounded-xl border p-6 ${
            plan.popular
              ? "border-[#4F7CFF] bg-[#14161C] shadow-lg shadow-[#4F7CFF]/10"
              : "border-[#2A2E39]/60 bg-[#14161C]/50"
          }`}
        >

          {plan.popular && (
            <div className="scale-125 absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#4F7CFF] px-3 py-1 text-xs font-medium text-white">
              Most Popular
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#FAFAFA]">
              {plan.name}
            </h3>
            <p className="text-sm text-[#A1A1AA]">
              {plan.description}
            </p>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-[#FAFAFA]">
              {plan.price}
            </span>

            {plan.period && (
              <span className="text-[#A1A1AA]">
                {plan.period}
              </span>
            )}
          </div>

          <ul className="mb-8 space-y-3">
            {plan.features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-center gap-3 text-sm text-[#A1A1AA]"
              >
                <Check className="h-4 w-4 flex-shrink-0 text-[#4F7CFF]" />
                {feature}
              </li>
            ))}
          </ul>

          <Link to="/signup">
            <button
              className={`w-full rounded-md px-4 py-2 font-medium transition ${
                plan.popular
                  ? "bg-[#4F7CFF] text-white hover:bg-[#4F7CFF]/90"
                  : "bg-[#1E2128] text-[#FAFAFA] hover:bg-[#1E2128]/80"
              }`}
            >
              {plan.cta}
            </button>
          </Link>

        </div>
      ))}
    </div>
  </div>
</section>
  )
}

export default PricingSection