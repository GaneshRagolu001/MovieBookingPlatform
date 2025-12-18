import { motion } from "framer-motion";

export default function TheaterCard({ theater, selected, onSelect }) {
  return (
    <motion.div
      onClick={() => onSelect(theater)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`
        p-4 rounded-xl border cursor-pointer transition
        ${
          selected
            ? "border-[#e50914] bg-[#e50914]/10"
            : "border-white/10 bg-white/5 hover:bg-white/10"
        }
      `}
    >
      <h3 className="font-semibold text-white">{theater.theaterName}</h3>
      <p className="text-sm text-gray-400">
        Screen Type : {theater.theaterScreenType}
      </p>
      <p className="text-sm text-gray-400">{theater.location}</p>
      <p className="text-xs text-gray-500 mt-1">
        Capacity: {theater.theaterCapacity || "—"}
      </p>
    </motion.div>
  );
}
