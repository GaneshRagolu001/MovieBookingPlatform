import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function MovieCard({ movie }) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm shadow hover:shadow-lg transition cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full aspect-3/4 overflow-hidden">
        <img
          src={movie.normalimgurl}
          alt={movie.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold">{movie.name}</h3>
        <p className="text-sm text-gray-400">{movie.genre}</p>
        <p className="text-xs text-gray-500 mb-4">{movie.language}</p>
        <Link
          to={`${movie.movieId}`}
          className="px-2 py-2 rounded-full bg-[#e50914] hover:bg-[#e50914]/90 text-white text-sm font-medium transition "
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
}
