import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser } from "../../context/AuthContext";

export default function LandingPage() {
  const heroRef = useRef(null);
  const { tokenExpired, loading } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenExpired) {
      console.log("expired");
      navigate("/login");
    }
  }, [tokenExpired, navigate]);

  // Don't flash the landing page if we are still checking the token

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 2, repeat: -1, yoyo: true }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <section
      ref={heroRef}
      className="relative px-4 sm:px-6 lg:px-12 py-14 md:py-20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 hero-glow bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.25),transparent_60%)]" />

      {/* Layout */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Book your <span className="text-[#e50914]">favourite movies</span>{" "}
            in seconds.
          </motion.h1>

          <motion.p
            className="text-gray-300 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover the latest releases, pick your perfect seats, and enjoy a
            smooth booking experience powered by Spring Boot & React.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex justify-center lg:justify-start gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/movies"
              className="px-6 py-3 rounded-full bg-[#e50914] hover:bg-[#e50914]/90 text-sm sm:text-base font-semibold"
            >
              Browse Movies
            </Link>

            <Link
              to="/my-bookings"
              className="px-6 py-3 rounded-full border border-gray-600 hover:border-gray-300 text-sm sm:text-base"
            >
              View My Bookings
            </Link>
          </motion.div>
        </div>

        {/* RIGHT MOCKUP AREA */}
        <motion.div
          className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:h-[70vh] aspect-[3/4] rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 backdrop-blur flex items-center justify-center text-gray-400 text-sm sm:text-base"
          initial={{ x: 80, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          Mockup - movie posters / seat layout preview
        </motion.div>
      </div>
    </section>
  );
}
