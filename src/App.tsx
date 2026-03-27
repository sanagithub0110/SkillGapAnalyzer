import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import SkillInputPage from "./pages/SkillInputPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AccountSettings from "./pages/AccountSettings";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Persist login on refresh
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-midnight text-slate-200">

        {/* ✅ Navbar with conditional UI */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <main className="pt-16">
          <Routes>

            {/* 🟢 Public Routes */}
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/auth"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <AuthPage
                    onLogin={() => {
                      setIsLoggedIn(true);
                      localStorage.setItem("isLoggedIn", "true");
                    }}
                  />
                )
              }
            />

            {/* 🔒 Protected Routes */}
            <Route
              path="/upload"
              element={isLoggedIn ? <ResumeUploadPage /> : <Navigate to="/auth" />}
            />

            <Route
              path="/skills"
              element={isLoggedIn ? <SkillInputPage /> : <Navigate to="/auth" />}
            />

            <Route
              path="/dashboard"
              element={isLoggedIn ? <DashboardPage /> : <Navigate to="/auth" />}
            />

            <Route
              path="/profile"
              element={isLoggedIn ? <ProfilePage /> : <Navigate to="/auth" />}
            />

            <Route path="/account-settings" element={<AccountSettings />} 
            />

            {/* 🔁 Fallback */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}