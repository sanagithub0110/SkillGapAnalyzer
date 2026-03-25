import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, X, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "../utils/utils";

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type === "application/pdf" || selectedFile.type === "application/msword" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF or DOC file.");
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          navigate("/skills");
        }, 800);
      }
      setProgress(currentProgress);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Step 1: Upload Your Resume</h1>
        <p className="text-slate-400">Our AI will extract your skills and experience to build your profile.</p>
      </div>

      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!uploading ? (
            <motion.div
              key="upload-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300",
                  dragActive ? "border-neon-teal bg-neon-teal/5 scale-[1.02]" : "border-white/10 hover:border-white/20 bg-white/5",
                  file ? "border-neon-teal/50 bg-neon-teal/5" : ""
                )}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-500",
                    file ? "bg-neon-teal/20 scale-110" : "bg-white/5"
                  )}>
                    {file ? (
                      <CheckCircle2 className="w-10 h-10 text-neon-teal" />
                    ) : (
                      <Upload className="w-10 h-10 text-slate-500" />
                    )}
                  </div>
                  
                  {file ? (
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-white">{file.name}</p>
                      <p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="mt-4 text-sm text-red-400 hover:text-red-300 font-medium flex items-center justify-center space-x-1 mx-auto"
                      >
                        <X className="w-4 h-4" />
                        <span>Remove File</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-xl font-bold text-white mb-2">Drag & Drop Resume</p>
                      <p className="text-slate-400 mb-6">Support for PDF, DOC, DOCX (Max 5MB)</p>
                      <span className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors">
                        Browse Files
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-slate-500 text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-neon-teal" />
                    <span>Secure Encryption</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-neon-teal" />
                    <span>AI Privacy Guard</span>
                  </div>
                </div>
                
                <button
                  disabled={!file}
                  onClick={handleUpload}
                  className="px-8 py-4 bg-neon-teal text-midnight font-bold rounded-xl hover:bg-neon-teal/90 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span>Analyze Resume</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="uploading-ui"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-white/5 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <motion.circle
                    className="text-neon-teal stroke-current"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  ></motion.circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Processing Resume</h3>
              <p className="text-slate-400 mb-8">Extracting skills and building your profile...</p>
              
              <div className="max-w-xs mx-auto space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Parsing Text</span>
                  <CheckCircle2 className={cn("w-4 h-4", progress > 30 ? "text-neon-teal" : "text-slate-700")} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Identifying Skills</span>
                  <CheckCircle2 className={cn("w-4 h-4", progress > 60 ? "text-neon-teal" : "text-slate-700")} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Mapping Experience</span>
                  <CheckCircle2 className={cn("w-4 h-4", progress > 90 ? "text-neon-teal" : "text-slate-700")} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
