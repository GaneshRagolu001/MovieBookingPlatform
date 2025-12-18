import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, User2Icon, X } from "lucide-react";
import { AuthUser } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const { logout } = AuthUser();

  const isAdmin = loggedInUser?.roles.find((item) => item == "ROLE_ADMIN");

  return (
    <motion.nav
      className="w-full sticky top-0 z-30 bg-linear-to-b from-black/90 to-black/40 backdrop-blur px-4 sm:px-6 lg:px-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between py-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
            MB
          </span>
          <span className="font-semibold tracking-wide text-lg">
            MovieBooking
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/movies"
            className="transition border-2 px-4 py-2 rounded-xl hover:text-[#e50914] hover:border-[#e50914]"
          >
            Movies
          </Link>

          <Link
            to="/my-bookings"
            className="transition border-2 px-4 py-2 rounded-xl hover:text-[#e50914] hover:border-[#e50914]"
          >
            My Bookings
          </Link>

          {loggedInUser ? (
            <div className="flex gap-4 justify-center items-center">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="transition border-2 px-4 py-2 rounded-xl hover:text-[#e50914] hover:border-[#e50914]"
                >
                  Admin
                </Link>
              )}
              <Link to="/profile" className="border-2 rounded-full">
                <User2Icon />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-[#e50914] hover:bg-[#e50914]/90 text-white text-sm font-medium transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden flex flex-col gap-4 pb-4 text-sm"
        >
          <Link
            to="/movies"
            className="border px-4 py-2 rounded-xl hover:text-[#e50914] hover:border-[#e50914] transition"
            onClick={() => setOpen(false)}
          >
            Movies
          </Link>

          <Link
            to="/my-bookings"
            className="border px-4 py-2 rounded-xl hover:text-primary hover:border-primary transition"
            onClick={() => setOpen(false)}
          >
            My Bookings
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition text-center"
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
