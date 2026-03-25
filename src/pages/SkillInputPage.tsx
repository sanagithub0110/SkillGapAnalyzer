import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Globe, 
  Code, 
  BarChart, 
  Server, 
  Plus, 
  X, 
  ArrowRight, 
  Sparkles,
  Search
} from "lucide-react";
import { ROLES, SKILL_SUGGESTIONS } from "../utils/mockData";
import { cn } from "../utils/utils";
import LoadingOverlay from "../components/LoadingOverlay";

const ICON_MAP: Record<string, any> = {
  Globe,
  Code,
  BarChart,
  Server
};

export default function SkillInputPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>(["React", "JavaScript", "Tailwind CSS"]);
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleRunAnalysis = () => {
    if (!selectedRole) return;
    setIsAnalyzing(true);
  };

  if (isAnalyzing) {
    return <LoadingOverlay onComplete={() => navigate("/dashboard")} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Refine Your Profile</h1>
        <p className="text-slate-400">Select your target role and confirm your current skills.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Role Selection */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-neon-amber" />
            <span>Target Role</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {ROLES.map((role) => {
              const Icon = ICON_MAP[role.icon];
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "flex items-center space-x-4 p-5 rounded-2xl border transition-all text-left group",
                    selectedRole === role.id 
                      ? "bg-neon-teal/10 border-neon-teal shadow-[0_0_20px_rgba(45,212,191,0.1)]" 
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    selectedRole === role.id ? "bg-neon-teal text-midnight" : "bg-white/5 text-slate-400 group-hover:text-white"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={cn(
                      "font-bold",
                      selectedRole === role.id ? "text-white" : "text-slate-300"
                    )}>{role.name}</p>
                    <p className="text-xs text-slate-500">Industry Standard</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Input */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Your Current Skills</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a skill (e.g. Python, Docker, UI Design)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-teal/50 transition-colors"
                />
                <button 
                  onClick={() => handleAddSkill(inputValue)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-neon-teal text-midnight rounded-lg hover:bg-neon-teal/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-neon-teal/10 border border-neon-teal/30 rounded-full text-neon-teal text-sm font-medium"
                  >
                    <span>{skill}</span>
                    <button onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Quick Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 10).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleAddSkill(suggestion)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-400 hover:border-neon-teal/50 hover:text-white transition-all"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={!selectedRole || skills.length === 0}
              onClick={handleRunAnalysis}
              className="px-10 py-5 bg-neon-teal text-midnight font-bold rounded-2xl hover:bg-neon-teal/90 transition-all flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(45,212,191,0.2)] group"
            >
              <span className="text-lg">Run AI Analysis</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
