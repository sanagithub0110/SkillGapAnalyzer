import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  "Extracting resume data...",
  "Analyzing skills...",
  "Generating recommendations...",
];

export default function LoadingOverlay({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-midnight flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Loader2 className="w-16 h-16 text-neon-teal" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Analyzing Your Profile</h2>
          <p className="text-slate-400">Our AI is mapping your skills to industry standards.</p>
        </div>

        <div className="space-y-4">
          {STEPS.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.3,
                x: 0,
                scale: index === currentStep ? 1.05 : 1
              }}
              className={cn(
                "flex items-center space-x-4 p-4 rounded-xl border transition-all",
                index < currentStep ? "bg-neon-teal/10 border-neon-teal/30" : 
                index === currentStep ? "bg-white/5 border-white/20" : "bg-transparent border-transparent"
              )}
            >
              {index < currentStep ? (
                <CheckCircle2 className="w-6 h-6 text-neon-teal" />
              ) : index === currentStep ? (
                <Loader2 className="w-6 h-6 text-neon-teal animate-spin" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-slate-700" />
              )}
              <span className={cn(
                "font-medium",
                index <= currentStep ? "text-white" : "text-slate-600"
              )}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from "../utils/utils";
