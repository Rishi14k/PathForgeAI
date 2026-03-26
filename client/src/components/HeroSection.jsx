import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const HeroSection = () => {
  return (
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0E0F14]">
      
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#4F7CFF]/20 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-[#4F7CFF]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2A2E39]/60 bg-[#1E2128]/50 px-4 py-1.5 text-sm text-[#A1A1AA] backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-[#4F7CFF]" />
            <span>AI-Powered Learning Paths</span>
          </div>

          {/* Heading */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-[#FAFAFA] md:text-6xl lg:text-7xl">
            Forge Your Learning Path with{" "}
            <span className="text-[#4F7CFF]">AI</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[#A1A1AA] md:text-xl">
            Generate personalized study roadmaps powered by AI. Track your progress,
            build streaks, and master any skill with structured learning plans.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/signup">
              <button className="flex items-center gap-2 rounded-md bg-[#4F7CFF] px-6 py-3 text-white hover:bg-[#4F7CFF]/90 transition">
                Generate Your Roadmap
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>

            <Link to="/features">
              <button className="rounded-md border border-[#2A2E39] bg-transparent px-6 py-3 text-[#FAFAFA] hover:bg-[#1E2128] transition">
                See How It Works
              </button>
            </Link>
          </div>
        </div>

        {/* Preview mockup */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-[#2A2E39]/60 bg-[#14161C]/50 p-2 shadow-2xl shadow-[#4F7CFF]/5 backdrop-blur-sm">
            <div className="rounded-lg bg-[#14161C] p-6">

              {/* Dashboard header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[#A1A1AA]">
                    Current Roadmap
                  </h3>
                  <p className="text-lg font-semibold text-[#FAFAFA]">
                    Backend Developer Path
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-[#4F7CFF]/10 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-[#4F7CFF]" />
                  <span className="text-sm font-medium text-[#4F7CFF]">
                    42% Complete
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {[
                  { week: "Week 1", title: "Programming Fundamentals", progress: 100 },
                  { week: "Week 2", title: "Database Design", progress: 80 },
                  { week: "Week 3", title: "API Development", progress: 20 },
                  { week: "Week 4", title: "Authentication & Security", progress: 0 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    
                    <div className="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-md bg-[#1E2128] text-xs font-medium text-[#A1A1AA]">
                      {item.week}
                    </div>

                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#FAFAFA]">
                          {item.title}
                        </span>
                        <span className="text-xs text-[#A1A1AA]">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-[#1E2128]">
                        <div
                          className="h-full rounded-full bg-[#4F7CFF] transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection