import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import SeatGrid from "../../components/booking/SeatGrid";
import { ShowAndTheater } from "../../context/ShowContext";
import { fetchShowBookings } from "../../api/bookingApi";

export default function BookingSeatSelectionPage() {
  const navigate = useNavigate();
  const { showId } = useParams();
  const contextData = ShowAndTheater();

  // Memoize show and theater to prevent re-renders if context changes slightly
  const { show, theater } = useMemo(() => {
    let s = contextData.show;
    let t = contextData.theater;
    if (!s || !t) {
      s = JSON.parse(localStorage.getItem("show"));
      t = JSON.parse(localStorage.getItem("theater"));
    }
    return { show: s, theater: t };
  }, [contextData.show, contextData.theater]);

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const price = show.price;
  console.log(show);

  useEffect(() => {
    const initializeGrid = async () => {
      if (!theater || !theater.theaterCapacity || !showId) return;

      try {
        setLoading(true);
        // 1. Fetch Bookings from Backend
        const response = await fetchShowBookings(showId);
        const bookedData = response.data; // List<Booking>

        // 2. Extract seat names from the list of bookings
        // Flatten the seatNumbers list from all booking objects
        const reservedSeatKeys = bookedData.flatMap((b) => b.seatNumbers || []);

        // 3. Generate Grid Logic
        const rows = 10;
        const cols = Math.ceil(theater.theaterCapacity / rows);
        const grid = [];

        for (let i = 0; i < rows; i++) {
          const rowArr = [];
          const rowLabel = String.fromCharCode(65 + i);

          for (let j = 1; j <= cols; j++) {
            const seatId = `${rowLabel}${j}`;
            rowArr.push({
              id: seatId,
              row: i,
              col: j,
              selected: false,
              reserved: reservedSeatKeys.includes(seatId),
            });
          }
          grid.push(rowArr);
        }
        setSeats(grid);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeGrid();
    // Dependency on theaterCapacity ensures it doesn't loop on theater object reference
  }, [showId, theater, theater?.theaterCapacity]);

  const toggleSeat = (row, col) => {
    const updatedSeats = seats.map((r) =>
      r.map((s) => {
        if (s.row === row && s.col === col && !s.reserved) {
          return { ...s, selected: !s.selected };
        }
        return s;
      })
    );

    const flattenedSelected = updatedSeats.flat().filter((s) => s.selected);
    setSeats(updatedSeats);
    setSelectedSeats(flattenedSelected);
  };

  const total = selectedSeats.length * price;

  if (loading)
    return (
      <div className="text-center py-20 text-gray-400">
        Loading Seating Chart...
      </div>
    );

  return (
    <div className="space-y-8 max-w-7xl">
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Select Your Seats{" "}
        {show?.showTime &&
          `for ${new Date(show.showTime).toLocaleTimeString()}`}
      </motion.h1>

      <div className="w-full">
        <div className="mx-auto w-full md:w-1/2 h-2 bg-white/20 rounded-full shadow-lg"></div>
        <p className="text-center text-gray-400 text-sm mt-1 uppercase tracking-widest">
          Screen
        </p>
      </div>

      <SeatGrid seats={seats} onSelect={toggleSeat} />

      <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4 shadow-2xl">
        <h2 className="text-xl font-semibold">Booking Summary</h2>
        <div className="flex justify-between items-center text-gray-300">
          <span>Selected Seats:</span>
          <span className="text-white font-medium">
            {selectedSeats.length === 0
              ? "None"
              : selectedSeats.map((s) => s.id).join(", ")}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total Amount:</span>
          <span className="text-red-500">₹{total}</span>
        </div>
        <button
          onClick={() => {
            if (selectedSeats.length === 0)
              return alert("Please select at least one seat");
            navigate(`/checkout/${showId}`, {
              state: { selectedSeats, total, pricePerSeat: price },
            });
          }}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
