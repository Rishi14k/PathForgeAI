import {
  Flame,
  Zap,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  Brain,
  Rocket,
  Star,
  Trophy,
  Calendar,
  Activity,
  Medal,
} from "lucide-react";


export const achievementMeta = {
  // ⭐ Beginner
  a1: {
    description: "Started your learning journey",
    icon: Flame,
    color: "#F59E0B",
  },
  a2: {
    description: "Completed 5 tasks",
    icon: CheckCircle2,
    color: "#10B981",
  },
  a3: {
    description: "Completed 10 tasks",
    icon: Zap,
    color: "#06B6D4",
  },

  // 🚀 Productivity
  a4: {
    description: "Completed 25 tasks",
    icon: TrendingUp,
    color: "#22C55E",
  },
  a5: {
    description: "Completed 50 tasks",
    icon: Star,
    color: "#F97316",
  },
  a6: {
    description: "Completed 100 tasks",
    icon: Trophy,
    color: "#EAB308",
  },

  // 🧠 Learning Hours
  a7: {
    description: "Studied for 5 hours",
    icon: Clock,
    color: "#6366F1",
  },
  a8: {
    description: "Studied for 25 hours",
    icon: Brain,
    color: "#8B5CF6",
  },
  a9: {
    description: "Studied for 100 hours",
    icon: Award,
    color: "#A855F7",
  },

  // 📅 Streak Achievements
  a10: {
    description: "3-day learning streak",
    icon: Calendar,
    color: "#14B8A6",
  },
  a11: {
    description: "7-day streak achieved",
    icon: Activity,
    color: "#0EA5E9",
  },
  a12: {
    description: "30-day unstoppable streak",
    icon: Rocket,
    color: "#EF4444",
  },

  // 🗺️ Roadmap Achievements
  a13: {
    description: "Started your first roadmap",
    icon: BookOpen,
    color: "#9F67FF",
  },
  a14: {
    description: "Learning multiple roadmaps",
    icon: Medal,
    color: "#22C55E",
  },
  a15: {
    description: "Explorer of many skills",
    icon: Target,
    color: "#06B6D4",
  },
};