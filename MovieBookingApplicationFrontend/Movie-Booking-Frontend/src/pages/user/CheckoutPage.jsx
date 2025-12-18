import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShowAndTheater } from "../../context/ShowContext";
import { createBooking } from "../../api/bookingApi";
import { AuthUser } from "../../context/AuthContext";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showId } = useParams();
  const { show, theater } = ShowAndTheater();
  const { user } = AuthUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const state = location.state || {};
  const selectedSeats = state.selectedSeats || [];
  const pricePerSeat = state.pricePerSeat || 180;
  const subtotal = state.total || 0;

  const convenienceFee = 25;
  const finalTotal = subtotal + convenienceFee;

  // Use state fallbacks for display
  const displayShow = show || JSON.parse(localStorage.getItem("show") || "{}");
  const displayTheater =
    theater || JSON.parse(localStorage.getItem("theater") || "{}");

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0)
      return alert("Session expired. Please select seats again.");

    setIsProcessing(true);
    try {
      const bookingData = {
        numberOfSeats: selectedSeats.length,
        bookingTime: new Date().toISOString(),
        price: finalTotal,
        bookingStatus: "CONFIRMED",
        seatNumbers: selectedSeats.map((s) => s.id),
        userId: user.userId,
        showId: parseInt(showId),
      };

      const res = await createBooking(bookingData);
      if (res.status === 200 || res.status === 201) {
        alert("Booking Successful!");
        navigate("/my-bookings");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        Order Summary
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ticket Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-red-500">
                  {displayShow.movie?.name}
                </h2>
                <p className="text-gray-400">
                  {displayTheater.theaterName} |{" "}
                  {displayTheater.theaterLocation}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {new Date(displayShow.showTime).toDateString()}
                </p>
                <p className="text-gray-400">
                  {new Date(displayShow.showTime).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Selected Seats ({selectedSeats.length})</span>
              <span className="text-white font-mono">
                {selectedSeats.map((s) => s.id).join(", ")}
              </span>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm text-gray-400">
                <span>
                  Ticket Price ({selectedSeats.length} x ₹{pricePerSeat})
                </span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Convenience Fees</span>
                <span>₹{convenienceFee}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 text-white">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment and Action */}
        <div className="space-y-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer">
                <input type="radio" name="pay" defaultChecked />
                <span className="text-sm">UPI / Net Banking</span>
              </label>
            </div>

            <button
              disabled={isProcessing}
              onClick={handleConfirmBooking}
              className={`w-full mt-6 py-4 rounded-xl font-bold flex justify-center items-center transition ${
                isProcessing
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                `Pay ₹${finalTotal}`
              )}
            </button>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2 text-gray-400 hover:text-white text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
