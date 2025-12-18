import { motion } from "framer-motion";

export default function SeatGrid({ seats, onSelect }) {
  // Safety check: If seats is not an array yet, don't crash the app
  if (!Array.isArray(seats) || seats.length === 0) {
    return (
      <div className="w-full py-10 text-center text-gray-500">
        Loading seating arrangement...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto py-4 border border-white/10 rounded-lg">
      <div className="inline-block min-w-full px-4">
        {seats.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <span className="w-6 text-center text-gray-400 text-xs">
              {String.fromCharCode(65 + rowIndex)}
            </span>

            <div className="flex gap-2">
              {row.map((seat) => (
                <motion.div
                  key={seat.id}
                  onClick={() => !seat.reserved && onSelect(seat.row, seat.col)}
                  whileTap={{ scale: 0.85 }}
                  className={`
                    w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold transition
                    ${
                      seat.reserved
                        ? "bg-gray-600 cursor-not-allowed"
                        : seat.selected
                        ? "bg-red-600 text-white"
                        : "bg-white/10 hover:bg-white/20 cursor-pointer"
                    }
                  `}
                >
                  {seat.col}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
