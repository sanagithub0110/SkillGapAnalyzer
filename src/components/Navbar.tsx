import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, User, LogOut, Menu, X, Map } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils/utils";

export default function Navbar({ isLoggedIn, setIsLoggedIn }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const isAuthPage = location.pathname === "/auth";
  if (isAuthPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <div className="p-1.5 bg-neon-teal/10 rounded-lg group-hover:bg-neon-teal/20 transition-colors">
              <Map className="w-6 h-6 text-neon-teal" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              Skill<span className="text-neon-teal">Map</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-neon-teal",
                      location.pathname === link.path
                        ? "text-neon-teal"
                        : "text-slate-400"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("isLoggedIn");
                    navigate("/");
                  }}
                  className="px-4 py-2 bg-neon-teal text-midnight font-bold rounded-lg hover:bg-neon-teal/90 transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="px-4 py-2 bg-neon-teal text-midnight font-bold rounded-lg hover:bg-neon-teal/90 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">

              {isLoggedIn ? (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-colors",
                        location.pathname === link.path
                          ? "bg-neon-teal/10 text-neon-teal"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      localStorage.removeItem("isLoggedIn");
                      setIsOpen(false);
                      navigate("/");
                    }}
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 rounded-xl text-neon-teal font-medium"
                >
                  Sign In
                </button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}