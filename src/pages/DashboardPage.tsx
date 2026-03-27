import { motion } from "motion/react";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Youtube, 
  Code, 
  History, 
  TrendingUp, 
  Target,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Pie, Bar, Radar } from "react-chartjs-2";
import { MOCK_ANALYSIS_RESULT } from "../utils/mockData";
import { PIE_OPTIONS, BAR_OPTIONS, RADAR_OPTIONS } from "../charts/chartConfig";
import { cn } from "../utils/utils";

export default function DashboardPage() {
  const data = MOCK_ANALYSIS_RESULT;

  const shareProfile = () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied!");
  };

  const pieData = {
    labels: ["Matched Skills", "Missing Skills"],
    datasets: [
      {
        data: [data.matchedSkills.length, data.missingSkills.length],
        backgroundColor: ["#2dd4bf", "#f43f5e"],
        borderColor: ["#2dd4bf", "#f43f5e"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Frontend", "Backend", "DevOps", "Soft Skills", "Testing"],
    datasets: [
      {
        label: "Skill Level",
        data: [85, 40, 30, 90, 20],
        backgroundColor: "rgba(45, 212, 191, 0.5)",
        borderColor: "#2dd4bf",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const radarData = {
    labels: ["React", "Node.js", "System Design", "Testing", "Deployment", "Security"],
    datasets: [
      {
        label: "Your Strength",
        data: [95, 45, 60, 30, 50, 40],
        backgroundColor: "rgba(45, 212, 191, 0.2)",
        borderColor: "#2dd4bf",
        borderWidth: 2,
        pointBackgroundColor: "#2dd4bf",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Section */}
      <header className="glass-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-teal/10 rounded-full blur-[80px] -z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-neon-teal/10 border border-neon-teal/30 rounded-full text-neon-teal text-xs font-bold uppercase tracking-widest">
              Target Role: {data.role}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Analysis Result</h1>
            <p className="text-slate-400 max-w-md">
              Great progress! You're closer to being job-ready than you think. Focus on the missing skills to reach 100%.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <button 
              onClick={shareProfile}
                className="px-6 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
              Share Profile
              </button>
            </div>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="relative w-48 h-48">
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
                  animate={{ pathLength: data.score / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                ></motion.circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold text-white">{data.score}%</span>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Readiness</span>
              </div>
            </div>
            <div className="mt-6 w-full max-w-xs bg-white/5 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${data.score}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-neon-teal to-neon-indigo"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Matched Skills */}
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-6 h-6 text-neon-teal" />
              <span>Matched Skills</span>
            </h2>
            <span className="px-3 py-1 bg-neon-teal/10 text-neon-teal text-xs font-bold rounded-lg">
              {data.matchedSkills.length} Found
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.matchedSkills.map((skill) => (
              <div key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-teal" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <span>Missing Skills</span>
            </h2>
            <span className="px-3 py-1 bg-red-400/10 text-red-400 text-xs font-bold rounded-lg">
              {data.missingSkills.length} Required
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.missingSkills.map((skill) => (
              <div key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-8 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Skill Distribution</h3>
          <div className="flex-1 relative">
            <Pie data={pieData} options={PIE_OPTIONS} />
          </div>
        </div>
        <div className="glass-card p-8 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Domain Breakdown</h3>
          <div className="flex-1 relative">
            <Bar data={barData} options={BAR_OPTIONS} />
          </div>
        </div>
        <div className="glass-card p-8 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Skill Strength Radar</h3>
          <div className="flex-1 relative">
            <Radar data={radarData} options={RADAR_OPTIONS} />
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Personalized Learning Path</h2>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.learningPath.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card p-6 border-l-4 border-l-neon-teal flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-neon-teal/10 text-neon-teal text-xs font-bold rounded-lg uppercase tracking-wider">
                  {item.skill}
                </span>
                <Target className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.course}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">
                <span className="font-bold text-slate-300">Project:</span> {item.project}
              </p>
              <div className="flex items-center space-x-4">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600/20 transition-colors text-sm font-bold"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                </a>
                <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <History className="w-6 h-6 text-neon-amber" />
            <span>Analysis History</span>
          </h2>
          </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Job Role</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Readiness Score</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.history.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5 font-medium text-white">{item.role}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden min-w-[100px]">
                        <div className="h-full bg-neon-teal" style={{ width: `${item.score}%` }} />
                      </div>
                      <span className="text-sm font-bold text-white">{item.score}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-400">{item.date}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-lg">Completed</span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="text-neon-teal hover:underline text-sm font-bold">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
