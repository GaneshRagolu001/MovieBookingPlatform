import { motion } from "framer-motion";

export default function ShowTimeCard({ time, selected = false, onSelect }) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition
        border
        ${
          selected
            ? "bg-[#e50914] border-[#e50914] text-white"
            : "bg-white/10 border-white/10 text-white hover:bg-white/20"
        }
      `}
    >
      {time.substr(11, 5)}
    </motion.button>
  );
}
