import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight} from "lucide-react";
import { cn } from "../utils/utils";

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
      navigate("/upload");
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 relative">
      {/* Background Accents */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-teal/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-neon-amber/10 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-8 md:p-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-slate-400">
            {isLogin ? "Enter your credentials to continue" : "Join SkillMap and start your journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-teal/50 transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-teal/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              {isLogin && (
                <button type="button" className="text-xs text-neon-teal hover:underline">Forgot Password?</button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-teal/50 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-neon-teal text-midnight font-bold rounded-xl hover:bg-neon-teal/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-midnight border-t-transparent rounded-full"
              />
            ) : (
              <>
                <span>{isLogin ? "Sign In" : "Get Started"}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
          
        <p className="mt-10 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-neon-teal font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}