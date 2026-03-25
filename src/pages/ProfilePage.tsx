import { motion } from "motion/react";
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  ChevronRight, 
  TrendingUp, 
  Award,
  Clock
} from "lucide-react";
import { MOCK_USER, MOCK_ANALYSIS_RESULT } from "../utils/mockData";
import { Line } from "react-chartjs-2";
import { cn } from "../utils/utils";

export default function ProfilePage() {
  const user = MOCK_USER;
  const history = MOCK_ANALYSIS_RESULT.history;

  const lineData = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Readiness Score",
        data: [82, 65, 78],
        borderColor: "#2dd4bf",
        backgroundColor: "rgba(45, 212, 191, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#2dd4bf",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { color: "#64748b" } },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: User Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-neon-teal/20 to-neon-indigo/20 -z-10" />
            <div className="relative inline-block mb-6">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-32 h-32 rounded-3xl border-4 border-midnight bg-white/10"
              />
              <div className="absolute -bottom-2 -right-2 p-2 bg-neon-teal text-midnight rounded-xl shadow-lg">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-slate-400 text-sm mb-8">{user.email}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
              <div className="text-center">
                <div className="text-xl font-bold text-white">12</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Analyses</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">84%</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Avg Score</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-2">
            {[
              { label: "Account Settings", icon: Settings },
              { label: "Notifications", icon: Bell, badge: "3" },
              { label: "Privacy & Security", icon: Shield },
              { label: "Billing & Subscription", icon: Award },
            ].map((item, i) => (
              <button 
                key={i}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-neon-teal/10 group-hover:text-neon-teal transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-neon-teal text-midnight text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Stats & History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Chart */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Progress Over Time</h3>
                <p className="text-sm text-slate-500">Your skill readiness trend for the last 3 months</p>
              </div>
              <div className="flex items-center space-x-2 text-neon-teal">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-bold">+12.5%</span>
              </div>
            </div>
            <div className="h-[250px] relative">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Past Analyses */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Clock className="w-6 h-6 text-neon-amber" />
              <span>Recent Activity</span>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {history.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex items-center justify-between group hover:border-neon-teal/30 transition-all"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-neon-teal/10 transition-colors">
                      <Award className="w-7 h-7 text-slate-500 group-hover:text-neon-teal transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.role}</h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-neon-teal" />
                          <span className="text-neon-teal font-bold">{item.score}% Readiness</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
