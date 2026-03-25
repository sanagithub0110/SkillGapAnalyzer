import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  FileSearch, 
  Target, 
  Briefcase, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  TrendingUp 
} from "lucide-react";

const FEATURES = [
  {
    title: "Resume Analysis",
    description: "Our AI extracts and analyzes your skills from any PDF or DOC file.",
    icon: FileSearch,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Skill Gap Detection",
    description: "Identify exactly what's missing between your profile and your dream job.",
    icon: Target,
    color: "text-neon-teal",
    bg: "bg-neon-teal/10"
  },
  {
    title: "Job Role Recommendation",
    description: "Get personalized career paths based on your existing strengths.",
    icon: Briefcase,
    color: "text-neon-amber",
    bg: "bg-neon-amber/10"
  },
  {
    title: "Learning Path Generator",
    description: "Curated resources and projects to help you master missing skills fast.",
    icon: Zap,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  }
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-teal/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-amber/10 rounded-full blur-[120px] -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Cpu className="w-4 h-4 text-neon-teal" />
            <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">AI-Powered Career Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
            Analyze Your Skills. <br />
            <span className="neon-text-teal">Bridge the Gap.</span> <br />
            Get Job Ready.
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
            SkillMap uses advanced AI to map your current expertise against industry standards, 
            providing a personalized roadmap to your next big career move.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/auth"
              className="group relative px-8 py-4 bg-neon-teal text-midnight font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <span>Upload Resume</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Skills Analyzed", value: "50k+", icon: Cpu },
            { label: "Users Placed", value: "12k+", icon: ShieldCheck },
            { label: "Job Roles", value: "200+", icon: Briefcase },
            { label: "Success Rate", value: "94%", icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-2">
                <stat.icon className="w-5 h-5 text-neon-teal/60" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How SkillMap Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our platform provides a comprehensive suite of tools to help you navigate your career path with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-8 hover:border-neon-teal/50 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Cpu className="w-6 h-6 text-neon-teal" />
          <span className="text-xl font-bold tracking-tighter text-white">
            Skill<span className="text-neon-teal">Map</span>
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          © 2024 SkillMap AI. Built for the future of work.
        </p>
      </footer>
    </div>
  );
}
