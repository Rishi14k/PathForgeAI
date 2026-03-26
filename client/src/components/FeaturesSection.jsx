import React from 'react'
import { Sparkles, Target, Flame, BarChart3 } from "lucide-react"


const features = [
  {
    icon: Sparkles,
    title: "AI-Generated Roadmaps",
    description: "Get personalized study plans tailored to your goals, skill level, and available time. Our AI creates the perfect learning path for you."
  },
  {
    icon: Target,
    title: "Task-Based Learning",
    description: "Break down complex topics into manageable daily tasks. Complete structured lessons with estimated times and resource links."
  },
  {
    icon: Flame,
    title: "Study Streaks",
    description: "Build momentum with daily streaks. Stay motivated by tracking your consistency and celebrating your learning milestones."
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Visualize your learning journey with detailed analytics. Track completion rates, study time, and overall progress."
  }
]

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 bg-[#0E0F14]">
  <div className="mx-auto max-w-7xl px-6">
    
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] md:text-4xl">
        Everything you need to master any skill
      </h2>

      <p className="mt-4 text-lg text-[#A1A1AA]">
        PathForge AI combines intelligent planning with gamification to make learning effective and enjoyable.
      </p>
    </div>

    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group rounded-xl border border-[#2A2E39]/60 bg-[#14161C]/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4F7CFF]/40 hover:bg-[#14161C]  hover:shadow-lg hover:shadow-[#4F7CFF]/10"
        >

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] transition-colors group-hover:bg-[#4F7CFF]/20">
            <feature.icon className="h-6 w-6" />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-[#FAFAFA]">
            {feature.title}
          </h3>

          <p className="text-sm leading-relaxed text-[#A1A1AA]">
            {feature.description}
          </p>

        </div>
      ))}
    </div>

  </div>
</section>
  )
}

export default FeaturesSection