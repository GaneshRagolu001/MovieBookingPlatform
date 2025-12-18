import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthUser } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = AuthUser();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", to: "/admin/dashboard", icon: "📊" },
    { label: "Movies", to: "/admin/movies", icon: "🎬" },
    { label: "Theaters", to: "/admin/theaters", icon: "🏢" },
    { label: "Shows", to: "/admin/shows", icon: "🕒" },
    { label: "Bookings", to: "/admin/bookings", icon: "🎟️" },
  ];

  function HandleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-black text-white font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-[#0A0A0F] border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="font-bold text-xl tracking-tight text-red-600">
              CINE<span className="text-white">ADMIN</span>
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
              Management Portal
            </p>
          </div>
          <button
            className="md:hidden text-gray-400"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "admin@cine.com"}
            </p>
          </div>
          <button
            onClick={HandleLogout}
            className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-red-600/10 hover:text-red-500 text-gray-400 font-semibold transition-all text-sm flex items-center justify-center gap-2"
          >
            🚪 Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-30">
          <button
            className="md:hidden text-gray-200"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Admin</span>
            <span className="text-gray-700">/</span>
            <span className="text-red-500 capitalize">
              {pathname.split("/").pop()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center text-xs font-bold">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
