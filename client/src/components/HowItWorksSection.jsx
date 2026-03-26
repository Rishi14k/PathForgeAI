import React from 'react'

const steps = [
  {
    step: "01",
    title: "Define Your Goal",
    description: "Tell us what skill you want to learn, your current level, and how much time you can dedicate daily."
  },
  {
    step: "02",
    title: "Get Your Roadmap",
    description: "Our AI generates a personalized, week-by-week learning plan with tasks, resources, and time estimates."
  },
  {
    step: "03",
    title: "Track & Progress",
    description: "Complete tasks daily, track your progress, build streaks, and watch yourself master new skills."
  }
]

const HowItWorksSection = () => {
  return (
    <section className="relative py-24 bg-[#0E0F14]">
  
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#4F7CFF]/10 blur-[100px]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6">
    
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] md:text-4xl">
        How PathForge AI Works
      </h2>

      <p className="mt-4 text-lg text-[#A1A1AA]">
        Three simple steps to transform your learning journey
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {steps.map((item, index) => (
        <div key={index} className="relative">
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="absolute right-0 top-8 hidden h-px w-[82%] translate-x-1/2 bg-gradient-to-r from-[#3956a8] to-transparent md:block" />
          )}

          <div className="flex flex-col items-center text-center">
            
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#4F7CFF]/40 bg-[#4F7CFF]/10 text-2xl font-bold text-[#4F7CFF]">
              {item.step}
            </div>

            <h3 className="mb-3 text-xl font-semibold text-[#FAFAFA]">
              {item.title}
            </h3>

            <p className="text-[#A1A1AA]">
              {item.description}
            </p>

          </div>
        </div>
      ))}
    </div>

  </div>
</section>
  )
}

export default HowItWorksSection