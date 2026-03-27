import { motion } from "motion/react";
import { 
  Calendar, 
  Settings, 
  ChevronRight, 
  TrendingUp, 
  Award,
  Clock
} from "lucide-react";
import { MOCK_USER, MOCK_ANALYSIS_RESULT } from "../utils/mockData";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser
  ? JSON.parse(storedUser)
  : MOCK_USER;
  const history = MOCK_ANALYSIS_RESULT.history;
  const navigate = useNavigate();

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
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* User Card */}
          <div className="glass-card p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-neon-teal/20 to-neon-indigo/20 -z-10" />
            
            <div className="relative inline-block mb-6">
              <img 
                src={user.avatar || MOCK_USER.avatar} 
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
              <div>
                <div className="text-xl font-bold text-white">12</div>
                <div className="text-xs text-slate-500 uppercase">Analyses</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">84%</div>
                <div className="text-xs text-slate-500 uppercase">Avg Score</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="glass-card p-6 space-y-2">
            <button 
              onClick={() => navigate("/account-settings")}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-neon-teal/10 group-hover:text-neon-teal">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="text-sm text-slate-300">Account Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Chart */}
          <div className="glass-card p-8">
            <div className="flex justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Progress Over Time</h3>
                <p className="text-sm text-slate-500">Last 3 months</p>
              </div>
              <div className="flex items-center space-x-2 text-neon-teal">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-bold">+12.5%</span>
              </div>
            </div>

            <div className="h-[250px]">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Clock className="w-6 h-6 text-neon-amber" />
              <span>Recent Activity</span>
            </h3>

            <div className="space-y-4">
              {history.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex items-center justify-between hover:border-neon-teal/30 cursor-pointer"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Award className="w-7 h-7 text-slate-500" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white">{item.role}</h4>

                      <div className="flex space-x-4 text-sm text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </span>

                        <span className="flex items-center space-x-1 text-neon-teal font-bold">
                          <TrendingUp className="w-4 h-4" />
                          <span>{item.score}%</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}