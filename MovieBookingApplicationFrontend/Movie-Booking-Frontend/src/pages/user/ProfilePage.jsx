import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { AuthUser } from "../../context/AuthContext"; // Adjust path as needed
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = AuthUser();
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Reusing your GSAP logic for consistent branding
  useEffect(() => {
    if (!profileRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 2, repeat: -1, yoyo: true }
      );
    }, profileRef);

    return () => ctx.revert();
  }, []);

  function HandleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <section
      ref={profileRef}
      className="relative min-h-[90vh] px-4 sm:px-6 lg:px-12 py-14 md:py-20 overflow-hidden flex items-center justify-center"
    >
      {/* Background Glow - matches LandingPage */}
      <div className="absolute inset-0 -z-10 profile-glow bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.15),transparent_70%)]" />

      <motion.div
        className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Profile Avatar Mockup */}
          <motion.div
            className="w-24 h-24 rounded-full bg-linear-to-tr from-[#e50914] to-red-400 flex items-center justify-center text-3xl font-bold text-white uppercase shadow-lg shadow-[#e50914]/20"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {user?.username?.charAt(0) || "U"}
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Welcome back,{" "}
              <span className="text-[#e50914]">{user?.username || "User"}</span>
              !
            </h1>
            <p className="text-gray-400">
              {user?.email || "No email provided"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-6">
            <Link
              to="/my-bookings"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white"
            >
              🎟️ View Bookings
            </Link>
            <button
              onClick={HandleLogout}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[#e50914]/10 border border-[#e50914]/50 rounded-2xl hover:bg-[#e50914] transition-all text-white font-medium"
            >
              Logout Account
            </button>
          </div>

          <motion.div
            className="pt-8 border-t border-white/10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
}
