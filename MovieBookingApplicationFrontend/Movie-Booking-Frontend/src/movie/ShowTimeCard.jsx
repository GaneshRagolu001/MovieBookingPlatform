import { motion } from "framer-motion";

export default function ShowTimeCard({ time, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(time)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-primary/80 hover:text-white border border-white/10 text-sm transition"
    >
      {time}
    </motion.button>
  );
}
